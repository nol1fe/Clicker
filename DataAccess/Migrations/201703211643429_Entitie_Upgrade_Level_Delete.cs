namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Entitie_Upgrade_Level_Delete : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Upgrades", "Level");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Upgrades", "Level", c => c.Int(nullable: false));
        }
    }
}
