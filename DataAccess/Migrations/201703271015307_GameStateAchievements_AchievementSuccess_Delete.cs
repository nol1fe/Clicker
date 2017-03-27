namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameStateAchievements_AchievementSuccess_Delete : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.GameStateAchievements", "AchievementSuccess");
        }
        
        public override void Down()
        {
            AddColumn("dbo.GameStateAchievements", "AchievementSuccess", c => c.Boolean(nullable: false));
        }
    }
}
