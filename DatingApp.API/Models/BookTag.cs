namespace DatingApp.API.Models
{
    // Class used to enforce many-to-many relationship.
    public class BookTag
    {
        public int BookId { get; set; }

        public Book Book { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }
    }
}