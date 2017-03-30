namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameStateQuests_Cost_Count_Delete : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GameStateQuests", "Count", c => c.Int(nullable: false));
            AddColumn("dbo.GameStateQuests", "Cost", c => c.Int(nullable: false));
            DropColumn("dbo.Quests", "Count");
            DropColumn("dbo.Quests", "Cost");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Quests", "Cost", c => c.Int(nullable: false));
            AddColumn("dbo.Quests", "Count", c => c.Int(nullable: false));
            DropColumn("dbo.GameStateQuests", "Cost");
            DropColumn("dbo.GameStateQuests", "Count");
        }
    }
}
