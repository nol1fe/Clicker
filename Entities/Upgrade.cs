using System.ComponentModel.DataAnnotations;

namespace Entities
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
}