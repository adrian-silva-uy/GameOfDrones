using GameOfDrones.Server.Domain.Entities;
using GameOfDrones.Server.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameOfDrones.Server.Infrastructure.Persistence.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly GameDbContext _context;

        public PlayerRepository(GameDbContext context)
        {
            _context = context;
        }

        public async Task<Player> GetPlayerByIdAsync(int id)
        {
            return await _context.Players.FindAsync(id);
        }

        public async Task<IEnumerable<Player>> GetAllPlayersAsync()
        {
            var players = await _context.Players.ToListAsync();
            return players;
        } 

        public async Task AddPlayerAsync(Player player)
        {
            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePlayerAsync(Player player)
        {
            _context.Players.Update(player);
        }

        public async Task<IEnumerable<Player>> GetTopPlayersAsync(int count)
        {
            return await _context.Players
                .OrderByDescending(p => p.Wins)
                .Take(count)
                .ToListAsync();
        }

        public async Task SaveAsync() => await _context.SaveChangesAsync();

    }
}
