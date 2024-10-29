namespace GameOfDrones.Server.Application.DTOs
{
    public class GameResultDto
    {
        public string Player1 { get; set; }
        public string Player2 { get; set; }
        public string Winner { get; set; }
        public DateTime DatePlayed { get; set; }
    }
}
