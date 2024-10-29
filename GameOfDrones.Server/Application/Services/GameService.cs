using GameOfDrones.Server.Application.DTOs;
using GameOfDrones.Server.Application.Interfaces;
using GameOfDrones.Server.Domain.Entities;
using GameOfDrones.Server.Domain.Enums;
using GameOfDrones.Server.Domain.Interfaces;
using GameOfDrones.Server.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public class GameService : IGameService
{
    private readonly IPlayerRepository _playerRepository;
    private readonly GameDbContext _context;

    public GameService(IPlayerRepository playerRepository, GameDbContext context)
    {
        _playerRepository = playerRepository;
        _context = context;
    }

    public Task<string> DetermineWinnerAsync(MoveEnum player1Move, MoveEnum player2Move)
    {
        if (player1Move == player2Move) return Task.FromResult("Draw");

        if ((player1Move == MoveEnum.ROCK && player2Move == MoveEnum.SCISSORS) ||
            (player1Move == MoveEnum.SCISSORS && player2Move == MoveEnum.PAPER) ||
            (player1Move == MoveEnum.PAPER && player2Move == MoveEnum.ROCK))
        {
            return Task.FromResult("Player 1 Wins");
        }

        return Task.FromResult("Player 2 Wins");
    }

    public async Task<RoundResult> PlayGameAsync(int player1Id, int player2Id, MoveEnum player1Move, MoveEnum player2Move)
    {
        var player1 = await _playerRepository.GetPlayerByIdAsync(player1Id);
        var player2 = await _playerRepository.GetPlayerByIdAsync(player2Id);

        if (player1 == null || player2 == null)
            throw new ArgumentException("Invalid player IDs provided");

        var result = await DetermineWinnerAsync(player1Move, player2Move);

        if (result == "Player 1 Wins")
        {
            player1.Wins++;
            await _playerRepository.UpdatePlayerAsync(player1);
        }
        else if (result == "Player 2 Wins")
        {
            player2.Wins++;
            await _playerRepository.UpdatePlayerAsync(player2);
        }

        var roundResult = new RoundResult
        {
            Player1Id = player1Id,
            Player2Id = player2Id,
            Winner = result,
            DatePlayed = DateTime.UtcNow
        };

        await _context.RoundResults.AddAsync(roundResult);
        await _context.SaveChangesAsync();

        return roundResult;
    }

    public async Task<IEnumerable<GameResultDto>> GetGameResultsAsync()
    {
        var roundResults = await _context.RoundResults.ToListAsync();
        var gameResultDtos = new List<GameResultDto>();

        foreach (var round in roundResults)
        {
            var player1 = await _playerRepository.GetPlayerByIdAsync(round.Player1Id.Value);
            var player2 = await _playerRepository.GetPlayerByIdAsync(round.Player2Id.Value);

            gameResultDtos.Add(new GameResultDto
            {
                Player1 = player1.Name,
                Player2 = player2.Name,
                Winner = round.Winner,
                DatePlayed = round.DatePlayed
            });
        }

        return gameResultDtos;
    }
}
