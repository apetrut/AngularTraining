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
            // ---- many-to-many for Books and Tags.
            modelBuilder.Entity<BookTag>()
                .HasKey(t => new { t.BookId, t.TagId });

            modelBuilder.Entity<BookTag>()
                .HasOne(b => b.Book)
                .WithMany(bt => bt.BookTags)
                .HasForeignKey(b => b.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<BookTag>()
                .HasOne(t => t.Tag)
                .WithMany(tt => tt.BookTags)
                .HasForeignKey(t => t.TagId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // ---- many-to-many for Prodcts and Tags.
            modelBuilder.Entity<ProductTag>()
                .HasKey(t => new { t.ProductId, t.TagId });

            modelBuilder.Entity<ProductTag>()
                .HasOne(b => b.Product)
                .WithMany(bt => bt.ProductTags)
                .HasForeignKey(b => b.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<ProductTag>()
                .HasOne(t => t.Tag)
                .WithMany(tt => tt.ProductTags)
                .HasForeignKey(t => t.TagId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Tag> Tags { get; set; }
    }
}