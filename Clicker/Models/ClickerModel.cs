﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Clicker.Models
{
    public class Upgrade
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public int Value { get; set; }
        public int Level { get; set; }
        public string ImgUrl { get; set; }
        public int UpgradeType { get; set; }

    }

    public class ClickerDb : DbContext
    {
        public DbSet<Upgrade> Upgrades { get; set; }
    }
}