using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        // Seed method.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().HasData(
                new Book() {
                    Id = 1,
                    Author = "Author Test 1",
                    BookTitle = "Book Title test 1",
                    Description = "Description 1",
                    BookImageUrl = "",
                    ISBN = "111111111111111111111",
                    PublishedDate = new System.DateTime(2019, 8, 21),
                    Price = 49.99f,
                    StarRating = 4.7f,
                    Topic = "Science"
                },
                new Book() {
                    Id = 2,
                    Author = "Author Test 2",
                    BookTitle = "Book Title test 2",
                    Description = "Description 2",
                    BookImageUrl = "",
                    ISBN = "2222222222222222222222",
                    PublishedDate = new System.DateTime(1956, 8, 21),
                    Price = 17.99f,
                    StarRating = 4.7f,
                    Topic = "Science"
                });

            modelBuilder.Entity<Product>().HasData(new Product(){
                Id = 1,
                Price = 29.79f,
                ProductCode = "LFG TYP",
                ProductName = "Product 1",
                ReleaseDate = new System.DateTime(2020, 3, 21),
                ImageUrl = "",
                StarRating = "4"
            });
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }
    }
}