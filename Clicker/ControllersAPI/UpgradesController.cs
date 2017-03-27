using Clicker.Models;
using DataAccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.Entity;

namespace Clicker.Controllers
{
    public class UpgradesController : ApiController
    {
        private ClickerDb db = new ClickerDb();

        [Route("api/Upgrades")]

        public HttpResponseMessage GetAllUpgrades()
        {
            return Request.CreateResponse(HttpStatusCode.OK, db.Upgrades.ToList());
        }

        [Route("api/Upgrades/GetUpgrade")]
        public HttpResponseMessage GetUpgrade([FromUri]int id)
        {
            var upgrade = db.Upgrades.Where(u => u.Id == id).FirstOrDefault();
            if (upgrade != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, upgrade);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, " Upgrade Not Found");
            }

        }

    }
}
