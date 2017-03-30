namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameStateAchievement : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameStateAchievements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AchievementId = c.Int(nullable: false),
                        GameStateId = c.Int(nullable: false),
                        AchievementSuccess = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Achievements", t => t.AchievementId, cascadeDelete: true)
                .ForeignKey("dbo.GameStates", t => t.GameStateId, cascadeDelete: true)
                .Index(t => t.AchievementId)
                .Index(t => t.GameStateId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GameStateAchievements", "GameStateId", "dbo.GameStates");
            DropForeignKey("dbo.GameStateAchievements", "AchievementId", "dbo.Achievements");
            DropIndex("dbo.GameStateAchievements", new[] { "GameStateId" });
            DropIndex("dbo.GameStateAchievements", new[] { "AchievementId" });
            DropTable("dbo.GameStateAchievements");
        }
    }
}
