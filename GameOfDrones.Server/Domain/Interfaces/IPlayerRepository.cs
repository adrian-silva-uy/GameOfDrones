using GameOfDrones.Server.Domain.Entities;

namespace GameOfDrones.Server.Domain.Interfaces
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerByIdAsync(int id);
        Task<IEnumerable<Player>> GetAllPlayersAsync();
        Task AddPlayerAsync(Player player);
        Task UpdatePlayerAsync(Player player);
        Task SaveAsync();
        Task<IEnumerable<Player>> GetTopPlayersAsync(int count);
    }
}
