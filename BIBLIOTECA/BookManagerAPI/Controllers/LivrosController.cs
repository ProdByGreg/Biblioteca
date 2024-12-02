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
        private static List<Livro> books = new List<Livro>();

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














        [HttpPost]
        [Route("api/Usuarios")]
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
