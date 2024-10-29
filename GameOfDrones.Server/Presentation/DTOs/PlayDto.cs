using GameOfDrones.Server.Domain.Enums;

namespace GameOfDrones.Server.Presentation.DTOs
{
    public class PlayDto
    {
        public int Player1Id { get; set; }
        public int Player2Id { get; set; }
        public MoveEnum Player1Move { get; set; }
        public MoveEnum Player2Move { get; set; }
    }
}
