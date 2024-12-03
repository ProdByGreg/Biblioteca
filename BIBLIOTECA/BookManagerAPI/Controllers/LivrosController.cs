using BookManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BookManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private static List<Livro> books = new List<Livro>
        {
            new Livro { Id = 1, Titulo = "Dom Camusro", Autor = "Machado de Assis", Ano = 1899, Quantidade = 2, Emprestado = false },
            new Livro { Id = 2, Titulo = "Memórias Póstumas de Braz Cubas", Autor = "Machado de Assis", Ano = 1881, Quantidade = 3, Emprestado = false },
            new Livro { Id = 3, Titulo = "Grande Sertão Veredas", Autor = "João Guimarães Rosa", Ano = 1956, Quantidade = 4, Emprestado = false },
            new Livro { Id = 4, Titulo = "O Cortiço", Autor = "Aluísio Azevedo", Ano = 1890, Quantidade = 4, Emprestado = false },
            new Livro { Id = 5, Titulo = "Iracema", Autor = "José de Alencar", Ano = 1865, Quantidade = 1, Emprestado = false },
            new Livro { Id = 6, Titulo = "Macunaíma", Autor = "Mário de Andrade", Ano = 1928, Quantidade = 11, Emprestado = false },
            new Livro { Id = 7, Titulo = "Capitães de Areia", Autor = "Jorge Amado", Ano = 1937, Quantidade = 2, Emprestado = false },
            new Livro { Id = 8, Titulo = "Vidas Secas", Autor = "Graciliano Ramos", Ano = 1938, Quantidade = 9, Emprestado = false },
            new Livro { Id = 9, Titulo = "A Moreninha", Autor = "Joaquim Manuel de Macedo", Ano = 1844, Quantidade = 2, Emprestado = false },
            new Livro { Id = 10, Titulo = "O Tempo e o Vento", Autor = "Érico Veríssimo", Ano = 1949, Quantidade = 1, Emprestado = false },
            new Livro { Id = 11, Titulo = "A Hora da Estrela", Autor = "Clarice Lispector", Ano = 1977, Quantidade = 2, Emprestado = false },
            new Livro { Id = 12, Titulo = "O Quinze", Autor = "Rachel de Queiroz", Ano = 1930, Quantidade = 1, Emprestado = false },
            new Livro { Id = 13, Titulo = "Menino do Engenho", Autor = "José Lins do Rego", Ano = 1932, Quantidade = 5, Emprestado = false },
            new Livro { Id = 14, Titulo = "Sagarana", Autor = "João Guimarães Rosa", Ano = 1946, Quantidade = 3, Emprestado = false },
            new Livro { Id = 15, Titulo = "Fogo Morto", Autor = "José Lins do Rego", Ano = 1943, Quantidade = 1, Emprestado = false }
        };

        private static List<Usuario> usuarios = new List<Usuario>();





        [HttpGet]
        public ActionResult<List<Livro>> Retornar()
        {
            return Ok(books);
        }






        [HttpPost]
        public ActionResult Add(Livro newBook)
        {
            if (string.IsNullOrEmpty(newBook.Autor) || string.IsNullOrEmpty(newBook.Titulo) || newBook.Ano <= 0)
            {
                return BadRequest("Dados inválidos. Por favor, preencha todos os campos corretamente.");
            }

            newBook.Id = books.Count > 0 ? books[books.Count - 1].Id + 1 : 1;
            books.Add(newBook);

            return Ok(newBook);
        }







        [HttpPut("{id}/emprestar")]
        public ActionResult Emprestar(int id)
        {
            var livro = books.FirstOrDefault(l => l.Id == id);

            if (livro == null)
            {
                return NotFound("Livro não encontrado");
            }

            if (livro.Emprestado)
            {
                return BadRequest("Livro já está emprestado.");
            }

            livro.Emprestado = true;
            return NoContent();
        }






        [HttpPut("{id}/devolver")]
        public ActionResult Devolver(int id)
        {
            var livro = books.FirstOrDefault(l => l.Id == id);

            if (livro == null)
            {
                return NotFound("Livro não encontrado");
            }

            if (!livro.Emprestado)
            {
                return BadRequest("Livro não está emprestado.");
            }

            livro.Emprestado = false;
            return NoContent();
        }







        [HttpDelete("{id}")]
        public ActionResult Remover(int id)
        {
            var livro = books.FirstOrDefault(l => l.Id == id);

            if (livro == null)
            {
                return NotFound("Livro não encontrado");
            }

            books.Remove(livro);
            return NoContent();
        }













        [Route("api/Usuarios")]
        [HttpPost]
        public ActionResult NewUser([FromBody] Usuario newUser)
        {
            if (string.IsNullOrEmpty(newUser.Nome) || newUser.Idade <= 0)
            {
                return BadRequest("Dados inválidos.");
            }

            newUser.Id = usuarios.Count > 0 ? usuarios[usuarios.Count - 1].Id + 1 : 1;
            usuarios.Add(newUser);

            return Ok(newUser);
        }






        [HttpGet("Usuarios")]
        public ActionResult<List<Usuario>> RetornarUsuarios()
        {
            return Ok(usuarios);
        }
    }
}
