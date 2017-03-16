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
        }
        public DbSet<Upgrade> Upgrades { get; set; }
        public DbSet<Achievement> Achievements { get; set; }

        public DbSet<User> Users { get; set; }
    }
}   