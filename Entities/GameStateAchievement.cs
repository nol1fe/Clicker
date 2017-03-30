using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class GameStateAchievement
    {
        [Column(Order = 1)]
        [Key]
        public int Id { get; set; }

        [Column(Order = 2)]

        [ForeignKey("Achievement")]
        public int AchievementId { get; set; }
        public virtual Achievement Achievement { get; set; }

        [Column(Order = 3)]
        [ForeignKey("GameState")]
        public int GameStateId { get; set; }

        public virtual GameState GameState { get; set; }


        public GameStateAchievement()
        {

        }

        public GameStateAchievement(int achievementId, int gameStateId)
        {
            AchievementId = achievementId;
            GameStateId = gameStateId;

        }

    }
}
