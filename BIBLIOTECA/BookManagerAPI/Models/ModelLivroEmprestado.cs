namespace BookManagerAPI.Models
{


     






    public class ModelLivroEmprestado
    {
        public string Titulo { get; set; } = string.Empty;
        public List<int> UsuariosEmprestados { get; set; } = new List<int>();
    }
}