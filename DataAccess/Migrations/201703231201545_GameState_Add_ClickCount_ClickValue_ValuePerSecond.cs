namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameState_Add_ClickCount_ClickValue_ValuePerSecond : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GameStates", "ClickCount", c => c.Int(nullable: false));
            AddColumn("dbo.GameStates", "ClickValue", c => c.Int(nullable: false));
            AddColumn("dbo.GameStates", "ValuePerSecond", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.GameStates", "ValuePerSecond");
            DropColumn("dbo.GameStates", "ClickValue");
            DropColumn("dbo.GameStates", "ClickCount");
        }
    }
}
