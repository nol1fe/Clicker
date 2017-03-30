namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GameState : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameStates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CurrentAmmount = c.Int(nullable: false),
                        TotalAmmount = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GameStates", "UserId", "dbo.Users");
            DropIndex("dbo.GameStates", new[] { "UserId" });
            DropTable("dbo.GameStates");
        }
    }
}
