using GameOfDrones.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GameOfDrones.Server.Infrastructure.Persistence
{
    public class GameDbContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<GameMove> Moves { get; set; }
        public DbSet<RoundResult> RoundResults { get; set; }

        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>().HasKey(p => p.Id);
            modelBuilder.Entity<RoundResult>().HasKey(r => r.Id);

            modelBuilder.Entity<RoundResult>()
                .HasOne(r => r.Player1)
                .WithMany()
                .HasForeignKey(r => r.Player1Id);

            modelBuilder.Entity<RoundResult>()
                .HasOne(r => r.Player2)
                .WithMany()
                .HasForeignKey(r => r.Player2Id);
        }
    }
}
