namespace Clicker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Achievements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Level = c.Int(nullable: false),
                        Value = c.Int(nullable: false),
                        Cost = c.Int(nullable: false),
                        ImgUrl = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Upgrades",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Cost = c.Int(nullable: false),
                        Value = c.Int(nullable: false),
                        Level = c.Int(nullable: false),
                        ImgUrl = c.String(),
                        UpgradeType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Upgrades");
            DropTable("dbo.Achievements");
        }
    }
}
