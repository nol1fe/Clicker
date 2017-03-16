namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class User_Lockout : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "LockoutEnabled", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "LockoutEnabled");
        }
    }
}
