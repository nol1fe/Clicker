namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameStateQuests : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameStateQuests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuestId = c.Int(nullable: false),
                        GameStateId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GameStates", t => t.GameStateId, cascadeDelete: true)
                .ForeignKey("dbo.Quests", t => t.QuestId, cascadeDelete: true)
                .Index(t => t.QuestId)
                .Index(t => t.GameStateId);
            
            CreateTable(
                "dbo.Quests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Count = c.Int(nullable: false),
                        Cost = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.GameStateUpgrades", "Quest_Id", c => c.Int());
            CreateIndex("dbo.GameStateUpgrades", "Quest_Id");
            AddForeignKey("dbo.GameStateUpgrades", "Quest_Id", "dbo.Quests", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GameStateQuests", "QuestId", "dbo.Quests");
            DropForeignKey("dbo.GameStateUpgrades", "Quest_Id", "dbo.Quests");
            DropForeignKey("dbo.GameStateQuests", "GameStateId", "dbo.GameStates");
            DropIndex("dbo.GameStateQuests", new[] { "GameStateId" });
            DropIndex("dbo.GameStateQuests", new[] { "QuestId" });
            DropIndex("dbo.GameStateUpgrades", new[] { "Quest_Id" });
            DropColumn("dbo.GameStateUpgrades", "Quest_Id");
            DropTable("dbo.Quests");
            DropTable("dbo.GameStateQuests");
        }
    }
}
