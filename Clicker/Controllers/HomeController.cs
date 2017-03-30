using Clicker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entities;
using Microsoft.AspNet.Identity;

namespace Clicker.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            var userId = User.Identity.GetUserId();
            ViewBag.UserId = userId;

            return View();
        }
        public ActionResult Test()
        {
            return View();
        }

    }

}