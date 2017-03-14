namespace Clicker.Migrations
{
    using Data;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ClickerDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ClickerDb context)
        {

            context.Upgrades.AddOrUpdate(u => u.Name,
            new Upgrade { Id = 1, Name = "Cook", Cost = 10, Value = 1, Level = 0, ImgUrl = "/Content/Images/cook.png", UpgradeType = 0 },
            new Upgrade { Id = 2, Name = "Extra Cheese", Cost = 50, Value = 3, Level = 0, ImgUrl = "/Content/Images/cheese.png", UpgradeType = 0 },
            new Upgrade { Id = 3, Name = "Extra Tomato", Cost = 75, Value = 5, Level = 0, ImgUrl = "/Content/Images/tomato.png", UpgradeType = 0 },
            new Upgrade { Id = 4, Name = "Cursor", Cost = 100, Value = 1, Level = 0, ImgUrl = "/Content/Images/cursor.png", UpgradeType = 1 });

            context.Achievements.AddOrUpdate(a => a.Name,

                new Achievement { Id = 1, Name = "Toster", Cost = 100, Value = 1, Level = 0, ImgUrl = "/Content/Images/toster1.png", Description = "Bonus! +1 To all upgrades", Done = false },
                new Achievement { Id = 2, Name = "Magic Toster", Cost = 500, Value = 2, Level = 0, ImgUrl = "/Content/Images/toster2.png", Description = "Super bonus! +2 To all upgrades", Done = false },
                new Achievement { Id = 3, Name = "Epic Toster", Cost = 1000, Value = 5, Level = 0, ImgUrl = "/Content/Images/toster3.png", Description = "Epic bonus! +5 To all upgrades", Done = false }


                );

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
