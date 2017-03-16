namespace Entities
{
    public class Achievement
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public int Value { get; set; }
        public int Cost { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }

        public bool Done { get; set; }

    }
}