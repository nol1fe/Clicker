using Clicker.Models;
using DataAccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clicker.Controllers
{
    public class UpgradesController : ApiController
    {
        private ClickerDb db = new ClickerDb();
        public IEnumerable<Upgrade> GetAllUpgrades()
        {
            var upgradeList = db.Upgrades.ToList();
            return upgradeList;
        }

        public IHttpActionResult GetUpgrade(int id)
        {
            var upgradeList = db.Upgrades.ToList();
            var upgrade = upgradeList.FirstOrDefault((u) => u.Id == id);
            if (upgrade == null)
            {
                return NotFound();
            }
            return Ok(upgrade);
        }

    }
}
