using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class GameStateQuest
    {
        [Column(Order = 1)]
        [Key]
        public int Id { get; set; }

        [Column(Order = 2)]
        [ForeignKey("Quest")]
        public int QuestId { get; set; }

        public virtual Quest Quest { get; set; }

        [Column(Order = 3)]
        [ForeignKey("GameState")]
        public int GameStateId { get; set; }

        public virtual GameState GameState { get; set; }

        public int Count { get; set; }
        public int Cost { get; set; }

        public GameStateQuest() { }

        public GameStateQuest(int questId, int gameStateId)
        {
            QuestId = questId;
            GameStateId = gameStateId;
            Count = 0;
            Cost = 10;

        }
    }
}
