using Entities;
using System.Data.Entity;
using System.Runtime.Remoting.Contexts;

namespace DataAccess
{
    public class ClickerDb : Context
    {
        public DbSet<Upgrade> Upgrades { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
    }
}