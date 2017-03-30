namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Achievement_Delete_Done : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Achievements", "Done");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Achievements", "Done", c => c.Boolean(nullable: false));
        }
    }
}
