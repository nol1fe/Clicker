namespace Clicker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AchievementUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Achievements", "Done", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Achievements", "Done");
        }
    }
}
