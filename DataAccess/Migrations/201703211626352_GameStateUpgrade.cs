namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameStateUpgrade : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameStateUpgrades",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UpgradeId = c.Int(nullable: false),
                        GameStateId = c.Int(nullable: false),
                        Level = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GameStates", t => t.GameStateId, cascadeDelete: true)
                .ForeignKey("dbo.Upgrades", t => t.UpgradeId, cascadeDelete: true)
                .Index(t => t.UpgradeId)
                .Index(t => t.GameStateId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GameStateUpgrades", "UpgradeId", "dbo.Upgrades");
            DropForeignKey("dbo.GameStateUpgrades", "GameStateId", "dbo.GameStates");
            DropIndex("dbo.GameStateUpgrades", new[] { "GameStateId" });
            DropIndex("dbo.GameStateUpgrades", new[] { "UpgradeId" });
            DropTable("dbo.GameStateUpgrades");
        }
    }
}
