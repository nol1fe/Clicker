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

        public DateTime StarDate { get; set; }
        public DateTime LastChangedDate { get; set; }

        [NotMapped]
        public string GameTime
        {
            get
            {
                var gameTime = LastChangedDate - StarDate;

                return string.Format("{0}:{1}:{2}:{3}", gameTime.Hours, gameTime.Minutes, gameTime.Seconds, gameTime.Milliseconds);
            }
        }
        


        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public GameState(){}

        public GameState(int userId)
        {
            UserId = userId;
            StarDate = DateTime.Now;
            LastChangedDate = DateTime.Now;
        }
    }
}
