namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameState_Date : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GameStates", "StarDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.GameStates", "LastChangedDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.GameStates", "LastChangedDate");
            DropColumn("dbo.GameStates", "StarDate");
        }
    }
}
