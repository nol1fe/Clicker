using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clicker.Models
{
    public class GameSettings
    {
        public int CurrentAmmount { get; set; }
        public double GameSpeed { get; set; }   // value of all toasts growth. per second, per click, per upgrade. standard game = 1;

    }
}