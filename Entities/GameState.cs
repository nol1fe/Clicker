using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class GameState
    {
        [Key]
        public int Id { get; set; }
        public int CurrentAmmount { get; set; }
        public int TotalAmmount { get; set; }

        public int ClickCount { get; set; }
        public int ClickValue { get; set; }

        public int ValuePerSecond { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime LastChangedDate { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<GameStateUpgrade> GameStateUpgrades { get; set; }
        public virtual ICollection<GameStateAchievement> GameStateAchievements { get; set; }




        [NotMapped]
        public string GameTime
        {
            get
            {
                var gameTime = LastChangedDate - StartDate;

                return string.Format("{0}:{1}:{2}:{3}", gameTime.Hours, gameTime.Minutes, gameTime.Seconds, gameTime.Milliseconds);
            }
        }


        public GameState() { }

        public GameState(int userId)
        {
            UserId = userId;
            StartDate = DateTime.Now;
            LastChangedDate = DateTime.Now;
            ClickValue = 1;
        }


    }
}
