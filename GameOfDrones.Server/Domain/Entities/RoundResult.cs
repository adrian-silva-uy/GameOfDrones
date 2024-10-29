namespace GameOfDrones.Server.Domain.Entities
{
    public class RoundResult
    {
        public int Id { get; set; }
        public int? Player1Id { get; set; }
        public Player? Player1 { get; set; }
        public int? Player2Id { get; set; }
        public Player? Player2 { get; set; }
        public string Winner { get; set; }
        public DateTime DatePlayed { get; set; }
    }
}
