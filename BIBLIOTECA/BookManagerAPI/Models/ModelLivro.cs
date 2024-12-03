namespace BookManagerAPI.Models
{






    public class Livro
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public int Ano { get; set; }
        public int Quantidade { get; set; }
        public bool Emprestado { get; set; }
    }








    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }






}
