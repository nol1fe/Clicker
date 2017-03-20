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


        // GET: api/GameStates/GetGameStateByUserId/5
        [ResponseType(typeof(GameState))]
        public IHttpActionResult GetGameStateByUserId([FromUri] int userId)
        {
            var authUserIdentifier = User.Identity.GetUserId();
            var parsedId = 0;
            Int32.TryParse(authUserIdentifier, out parsedId);

            if (parsedId == userId)
            {
                var gameState = db.GameStates.AsQueryable().FirstOrDefault(x => x.UserId == userId);
                if (gameState == null)
                {
                    gameState = new GameState(userId);

                    db.GameStates.Add(gameState);
                    db.SaveChanges();
                }

                return Ok(new GameState() {
                        Id = gameState.Id,
                        UserId = gameState.UserId,
                        TotalAmmount = gameState.TotalAmmount,
                        CurrentAmmount = gameState.CurrentAmmount,
                        StarDate = gameState.StarDate,
                        LastChangedDate = gameState.LastChangedDate
                        
                });
            }
            else
            {
                return NotFound();
            }

        }

     
        // POST: api/GameStates
        [ResponseType(typeof(GameState))]
        public IHttpActionResult PostGameState([FromBody]GameState gameState, [FromUri]int userId)
        {
            var gameStateFromDb = db.GameStates.AsQueryable().FirstOrDefault(x => x.Id == gameState.Id);

            gameStateFromDb.CurrentAmmount = gameState.CurrentAmmount;
            gameStateFromDb.TotalAmmount = gameState.TotalAmmount;
            gameStateFromDb.LastChangedDate = DateTime.Now;

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