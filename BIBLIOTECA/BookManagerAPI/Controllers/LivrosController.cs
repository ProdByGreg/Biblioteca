using BookManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;









namespace BookManagerAPI.Controllers
{









    [ApiController]
    [Route("api/[controller]")]

    public class LivrosController : ControllerBase
    {
        private static List<Livro> books = new()
        {
            new () { Id = 1, Titulo = "Dom Camusro", Autor = "Machado de Assis", Ano = 1899, Quantidade = 2},
            new () { Id = 15, Titulo = "Fogo Morto", Autor = "José Lins do Rego", Ano = 1943, Quantidade = 1}
        };



















        [HttpGet]
        public ActionResult<List<Livro>> 
        VerLivros()
        {
            return Ok(books);
        }

















        [HttpPost]
        public ActionResult 
        AdicionarLivro(Livro newBook)
        {
            if (string.IsNullOrEmpty(newBook.Autor) || 
                string.IsNullOrEmpty(newBook.Titulo) || 
                newBook.Ano <= 0 || 
                newBook.Quantidade <= 0)

            {
                return BadRequest("Dados inválidos. Por favor, preencha todos os campos corretamente.");
            }

            newBook.Id = books.Count > 0 ? books[books.Count - 1].Id + 1 : 1;
            books.Add(newBook);

            return Ok(newBook);
        }























        [HttpPut("{livroId}/emprestar/{usuarioId}")]
        public ActionResult EmprestarLivro(int livroId, int usuarioId)
        {
            var livro = books.FirstOrDefault(livro => livro.Id == livroId);

            if (livro == null)
            {
                return NotFound("Livro não encontrado.");
            }   

            if (livro.QuantidadeEmprestada > livro.Quantidade)
            {
                return BadRequest("Todas as unidades do livro já foram emprestadas.");
            }

            livro.Quantidade--;
            livro.UsuariosEmprestados.Add(usuarioId);
            livro.QuantidadeEmprestada++;
            

            return Ok($"Livro {livro.Titulo} emprestado para o usuário de ID:{string.Join(", ", usuarioId)}. Quantidade emprestada: {livro.QuantidadeEmprestada}/{livro.Quantidade}");
        }






















        [HttpPut("{livroId}/devolver/{usuarioId}")]
        public ActionResult DevolverLivro(int livroId, int usuarioId)
        {
            var livro = books.FirstOrDefault(livro => livro.Id == livroId);

            if (livro == null)
            {
                return NotFound("Livro não encontrado.");
            }

            if (livro.QuantidadeEmprestada < livro.Quantidade)
            {
                return BadRequest("Não há unidades emprestadas");
            }

            livro.Quantidade++;
            livro.UsuariosEmprestados.Remove(usuarioId);
            livro.QuantidadeEmprestada--;


            return Ok($"Livro {livro.Titulo} emprestado para o usuário de ID:{string.Join(", ", usuarioId)}. Quantidade emprestada: {livro.QuantidadeEmprestada}/{livro.Quantidade}");
        }























            [HttpGet("emprestados")]
        public ActionResult<List<Livro>> ObterLivrosEmprestados()
        {

            var livrosEmprestados = books
                .Where(livro => livro.QuantidadeEmprestada > 0)
                .Select(livro => new
                {
                    livro.Titulo,
                    livro.Autor,
                    livro.QuantidadeEmprestada,
                    UsuariosEmprestados = livro.UsuariosEmprestados
                })
                .ToList();


            if (!livrosEmprestados.Any())
            {
                return NoContent();
            }

            return Ok(livrosEmprestados);
        }












       /* [HttpGet("{id}/emprestados")]
        public ActionResult ObterLivrosEmprestadosPorId(int id)
        {
            var livro = books.FirstOrDefault(l => l.Id == id);

            if (livro == null)
            {
                return NotFound("Livro não encontrado.");
            }

            var livroEmprestadoInfo = new
            {
                livro.Titulo,
                livro.Autor,
                QuantidadeDisponivel = livro.Quantidade - livro.QuantidadeEmprestada,
                QuantidadeEmprestada = livro.QuantidadeEmprestada,
                UsuariosEmprestados = livro.UsuariosEmprestados
            };

            return Ok(livroEmprestadoInfo);
        }*/


















        [HttpDelete("{id}")]
        public ActionResult 
        RemoverLivro(int id)
        {
            var livro = books.FirstOrDefault(livro => livro.Id == id);

            if (livro == null)
            {   
                return NotFound("Livro não encontrado.");
            }

            if (livro.Quantidade <= 0)
            {
                return BadRequest("Não há unidades disponíveis para remover.");
            }

            livro.Quantidade--;

            if (livro.Quantidade == 0)
            {
                books.Remove(livro);
            }

            return Ok(books);
        }





















    }
}
