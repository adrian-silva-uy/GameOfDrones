using GameOfDrones.Server.Application.DTOs;
using GameOfDrones.Server.Domain.Entities;
using GameOfDrones.Server.Domain.Enums;

namespace GameOfDrones.Server.Application.Interfaces
{
    public interface IGameService
    {
        Task<string> DetermineWinnerAsync(MoveEnum player1Move, MoveEnum player2Move);
        Task<IEnumerable<GameResultDto>> GetGameResultsAsync();
        //Task<RoundResult> PlayGameAsync(int player1Id, int player2Id, MoveEnum player1Move, MoveEnum player2Move);
        Task<RoundResult> PlayGameAsync(int player1Id, int player2Id, string player1Move, string player2Move);
    }
}
