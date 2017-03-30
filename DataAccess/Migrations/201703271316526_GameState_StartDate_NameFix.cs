namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameState_StartDate_NameFix : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GameStates", "StartDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.GameStates", "StarDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.GameStates", "StarDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.GameStates", "StartDate");
        }
    }
}
