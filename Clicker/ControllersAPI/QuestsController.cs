using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clicker.ControllersAPI
{
    public class QuestsController : ApiController
    {
        private ClickerDb db = new ClickerDb();

        [Route("api/Quests")]

        public HttpResponseMessage GetAllQuests()
        {
            return Request.CreateResponse(HttpStatusCode.OK, db.Quests.ToList());
        }

        [Route("api/Quests/GetQuest")]
        public HttpResponseMessage GetQuest([FromUri]int id)
        {
            var quest = db.Quests.Where(q => q.Id == id).FirstOrDefault();
            if (quest != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, quest);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, " Quest Not Found");
            }

        }
    }
}
