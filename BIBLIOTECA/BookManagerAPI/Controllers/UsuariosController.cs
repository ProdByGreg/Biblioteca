using BookManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using static System.Reflection.Metadata.BlobBuilder;









namespace BookManagerAPI.Controllers
{









    [ApiController]
    [Route("api/[controller]")]

    public class UsuarioController : ControllerBase
    {

        private static List<Usuario> usuarios = new List<Usuario>() {
            new () { Id = 1, Nome = "Juninho Junior", Telefone = 41997418123, Idade = 20},
            new () { Id = 1, Nome = "Juninho Roberto", Telefone = 4199841622, Idade = 22},
            new () { Id = 2, Nome = "Juninho Carlos", Telefone = 41997411911, Idade = 25}
        };
















        [HttpGet]
        public ActionResult<List<Usuario>> VerUsuarios()
        {
            return Ok(usuarios);
        }



















        [HttpPost]
        public ActionResult AdicionarUsuario(Usuario novoUsuario)
        {
            if (string.IsNullOrEmpty(novoUsuario.Nome) ||
                novoUsuario.Telefone <= 0 ||
                novoUsuario.Idade <= 0)

            {
                return BadRequest("Dados inv�lidos. Por favor, preencha todos os campos corretamente.");
            }

            novoUsuario.Id = usuarios.Count > 0 ? usuarios[usuarios.Count - 1].Id + 1 : 1;
            usuarios.Add(novoUsuario);

            return Ok(novoUsuario);
        }



















        [HttpDelete("{id}")]
        public ActionResult DeletarUsuario(int id)
        {
            var usuario = usuarios.FirstOrDefault(u => u.Id == id);

            if (usuario == null)
            {
                return NotFound("Usu�rio n�o encontrado.");
            }

            usuarios.Remove(usuario);
            return NoContent();
        }













    }
}