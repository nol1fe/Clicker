using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DataAccess;
using Entities;
using Microsoft.AspNet.Identity;

namespace Clicker.ControllersAPI
{
    public class GameStatesController : ApiController
    {
        private ClickerDb db = new ClickerDb();

        [Route("api/gamestates/GetGameStateByUserId")]
        public HttpResponseMessage GetGameStateByUserId([FromUri] int userId)
        {
            var authUserIdentifier = User.Identity.GetUserId();
            var parsedId = 0;
            Int32.TryParse(authUserIdentifier, out parsedId);

            if (parsedId == userId)
            {
                var gameState = db.GameStates.Include(x => x.GameStateUpgrades).Include(x=>x.GameStateAchievements).FirstOrDefault(x => x.UserId == userId);
                //var gameState = db.GameStates.AsQueryable().FirstOrDefault(x => x.UserId == userId);

                if (gameState == null)
                {
                    gameState = new GameState(userId);

                    db.GameStates.Add(gameState);
                    db.SaveChanges();

                    var upgrades = db.Upgrades.ToList();
                    foreach (var item in upgrades)
                    {
                        var playerUpgrade = new GameStateUpgrade(item.Id, gameState.Id);
                        db.GameStateUpgrades.Add(playerUpgrade);
                    }

                    db.SaveChanges();

                    gameState.GameStateAchievements = new List<GameStateAchievement>();

                }
                return Request.CreateResponse(HttpStatusCode.OK, gameState);

            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, false);
            }

        }

        [Route("api/gamestates/ResetGameStateByUserId")]
        [HttpDelete]
        public HttpResponseMessage DeleteGameStateByUserId([FromUri] int userId)
        {
            var authUserIdentifier = User.Identity.GetUserId();
            var parsedId = 0;
            Int32.TryParse(authUserIdentifier, out parsedId);

            if (parsedId == userId)
            {
                var gameState = db.GameStates.FirstOrDefault(x => x.UserId == userId);
                if (gameState != null)
                {
                    db.GameStates.Remove(gameState);
                }
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, false);
            }
        }

        //save game
        // POST: api/GameStates
        [ResponseType(typeof(GameState))]
        public IHttpActionResult PostGameState([FromBody]GameState gameState, [FromUri]int userId)
        {
            var gameStateFromDb = db.GameStates.AsQueryable().FirstOrDefault(x => x.Id == gameState.Id);

            gameStateFromDb.CurrentAmmount = gameState.CurrentAmmount;
            gameStateFromDb.TotalAmmount = gameState.TotalAmmount;
            gameStateFromDb.LastChangedDate = DateTime.Now;
            gameStateFromDb.ClickCount = gameState.ClickCount;
            gameStateFromDb.ClickValue = gameState.ClickValue;
            gameStateFromDb.ValuePerSecond = gameState.ValuePerSecond;

            db.SaveChanges();

            var gameStateUpgradesFromDb = db.GameStateUpgrades.Where(x => x.GameStateId == gameState.Id).ToList();
            
            foreach (var upgrade in gameStateUpgradesFromDb)
            {
                var gmsUpgrade = gameState.GameStateUpgrades.FirstOrDefault(x => x.UpgradeId == upgrade.UpgradeId);
                if (gmsUpgrade != null)
                {
                    upgrade.Level = gmsUpgrade.Level;
                }
            }

            //var gameStateAchievementsFromDb = db.GameStateAchievements.Where(x => x.GameStateId == gameState.Id).ToList();

            foreach (var achievement in gameState.GameStateAchievements)
            {
                var gameStateADb = db.GameStateAchievements.FirstOrDefault(x => x.AchievementId == achievement.AchievementId);
                if (gameStateADb == null)
                {
                    db.GameStateAchievements.Add(new GameStateAchievement { AchievementId = achievement.AchievementId, GameStateId = gameState.Id });

                }


            }

            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gameState.Id }, gameState);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GameStateExists(int id)
        {
            return db.GameStates.Count(e => e.Id == id) > 0;
        }
    }
}