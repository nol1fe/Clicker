using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities
{
    public class Upgrade
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public int Value { get; set; }
        public string ImgUrl { get; set; }
        public int UpgradeType { get; set; }

        public virtual ICollection<GameStateUpgrade> GameStateUpgrades { get; set; }

    }
}