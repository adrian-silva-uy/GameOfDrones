using GameOfDrones.Server.Application.Interfaces;
using GameOfDrones.Server.Domain.Entities;
using GameOfDrones.Server.Domain.Enums;
using GameOfDrones.Server.Domain.Interfaces;
using GameOfDrones.Server.Presentation.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace GameOfDrones.Server.Api.Controllers
{
    [ApiController]
    [Route("api/game")]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;
        private readonly IPlayerRepository _playerRepository;

        public GameController(IGameService gameService, IPlayerRepository playerRepository)
        {
            _gameService = gameService;
            _playerRepository = playerRepository;
        }

        [HttpPost("play-round")]
        public async Task<IActionResult> PlayRound([FromBody] PlayDto playDto)
        {
            try
            {
                if (playDto == null)
                {
                    return BadRequest("PlayDto is null.");
                }

                var player1 = await _playerRepository.GetPlayerByIdAsync(playDto.Player1Id);
                var player2 = await _playerRepository.GetPlayerByIdAsync(playDto.Player2Id);

                if (player1 == null || player2 == null) return BadRequest("Players not found.");

                var roundResult = await _gameService.PlayGameAsync(playDto.Player1Id, playDto.Player2Id, playDto.Player1Move, playDto.Player2Move);
                return Ok(roundResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message);
            }
        }

        [HttpPost("start-game")]
        public async Task<IActionResult> StartGame([FromBody] StartGameDto startGameDto)
        {
            var player1 = new Player { Name = startGameDto.Player1Name };
            var player2 = new Player { Name = startGameDto.Player2Name };

            await _playerRepository.AddPlayerAsync(player1);
            await _playerRepository.AddPlayerAsync(player2);

            return Ok(new { player1, player2 });
        }

        [HttpGet("players")]
        public async Task<IActionResult> GetPlayers()
        {
            try
            {
                var players = await _playerRepository.GetAllPlayersAsync();

                if (players == null || !players.Any())
                {
                    return NotFound("No players found.");
                }

                return Ok(players);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching players: " + ex.Message);
            }
        }

        [HttpGet("results")]
        public async Task<IActionResult> GetResults()
        {
            try
            {
                var results = await _gameService.GetGameResultsAsync();

                if (results == null || !results.Any())
                {
                    return NotFound("No results found.");
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching results: " + ex.Message);
            }
        }

        [HttpPost("determine-winner")]
        public async Task<IActionResult> DetermineWinner([FromBody] DetermineWinnerDto dto)
        {
            if (!Enum.TryParse(dto.Player1Move, out MoveEnum player1Move) || !Enum.TryParse(dto.Player2Move, out MoveEnum player2Move))
            {
                return BadRequest("Invalid moves provided.");
            }

            var result = await _gameService.DetermineWinnerAsync(player1Move, player2Move);
            return Ok(result);
        }

        [HttpGet("top-players")]
        public async Task<IActionResult> GetTopPlayers()
        {
            try
            {
                var topPlayers = await _playerRepository.GetTopPlayersAsync(10);
                return Ok(topPlayers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching top players: " + ex.Message);
            }
        }

    }
}
