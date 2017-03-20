using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    class GameStateAchievement
    {
        [Column(Order = 1)]
        [Key]
        public int Id { get; set; }

        [Column(Order = 2)]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Column(Order = 3)]
        [ForeignKey("GameState")]
        public int GameStateId { get; set; }


    }
}
