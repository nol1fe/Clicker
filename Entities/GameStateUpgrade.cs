using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class GameStateUpgrade
    {
        [Column(Order = 1)]
        [Key]
        public int Id { get; set; }

        [Column(Order = 2)]
        [ForeignKey("Upgrade")]
        public int UpgradeId { get; set; }

        public virtual Upgrade Upgrade { get; set; }

        [Column(Order = 3)]
        [ForeignKey("GameState")]
        public int GameStateId { get; set; }

        public virtual GameState GameState { get; set; }

        public int Level { get; set; }

        public GameStateUpgrade() { }

        public GameStateUpgrade(int upgradeId, int gameStateId) {
            UpgradeId = upgradeId;
            GameStateId = gameStateId;
            Level = 0;
        }

    }
}
