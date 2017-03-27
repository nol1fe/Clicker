using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class Achievement
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public int Cost { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }

        public virtual ICollection<GameStateAchievement> GameStateAchievements { get; set; }

    }
}