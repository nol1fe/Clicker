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
using Clicker.Models;
using DataAccess;
using Entities;

namespace Clicker.ControllersAPI
{
    public class AchievementsController : ApiController
    {
        private ClickerDb db = new ClickerDb();

        // GET: api/Achievements
        public IQueryable<Achievement> GetAchievements()
        {
            return db.Achievements;
        }

        // GET: api/Achievements/5
        [ResponseType(typeof(Achievement))]
        public IHttpActionResult GetAchievement(int id)
        {
            Achievement achievement = db.Achievements.Find(id);
            if (achievement == null)
            {
                return NotFound();
            }

            return Ok(achievement);
        }

        private bool AchievementExists(int id)
        {
            return db.Achievements.Count(e => e.Id == id) > 0;
        }
    }
}