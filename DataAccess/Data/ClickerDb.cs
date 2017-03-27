using Entities;
using System.Data.Entity;
using System.Runtime.Remoting.Contexts;

namespace DataAccess
{
    public class ClickerDb : DbContext
    {
        public ClickerDb()
        : base("ClickerDb")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<Upgrade> Upgrades { get; set; }
        public DbSet<Achievement> Achievements { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<GameState> GameStates { get; set; }

        public DbSet<GameStateUpgrade> GameStateUpgrades { get; set; }

        public DbSet<GameStateAchievement> GameStateAchievements { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<GameState>()
        //    .HasMany<Upgrade>(u => u.Upgrades)
        //    .WithMany(g => g.GameStates)
        //    .Map(cs =>
        //    {
        //        cs.MapLeftKey("GameStateId");
        //        cs.MapRightKey("UpgradeId");
        //        cs.ToTable("GameStateUpgrades");
        //    });
        //}
    }
}   