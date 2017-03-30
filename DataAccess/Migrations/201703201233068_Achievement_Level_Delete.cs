namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Achievement_Level_Delete : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Achievements", "Level");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Achievements", "Level", c => c.Int(nullable: false));
        }
    }
}
