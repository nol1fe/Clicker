namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameState_Time : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GameStates", "seconds", c => c.Int(nullable: false));
            AddColumn("dbo.GameStates", "minutes", c => c.Int(nullable: false));
            AddColumn("dbo.GameStates", "hours", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.GameStates", "hours");
            DropColumn("dbo.GameStates", "minutes");
            DropColumn("dbo.GameStates", "seconds");
        }
    }
}
