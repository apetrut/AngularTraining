using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
                                                 IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // Seed method.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>(userRole => {
                userRole.HasKey(ur => new{ ur.UserId, ur.RoleId});
                
                userRole.HasOne(ur => ur.Role)
                        .WithMany(userRole => userRole.UserRoles)
                        .HasForeignKey(userRole => userRole.RoleId)
                        .IsRequired();
                userRole.HasOne(ur => ur.User)
                        .WithMany(userRole => userRole.UserRoles)
                        .HasForeignKey(userRole => userRole.UserId)
                        .IsRequired();
            });

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
            modelBuilder.Entity<ProductTag>(productTag => {

                productTag.HasKey(t => new { t.ProductId, t.TagId });

                productTag.HasOne(b => b.Product)
                          .WithMany(bt => bt.ProductTags)
                          .HasForeignKey(b => b.ProductId)
                          .OnDelete(DeleteBehavior.ClientSetNull);

                productTag.HasOne(t => t.Tag)
                          .WithMany(tt => tt.ProductTags)
                          .HasForeignKey(t => t.TagId)
                          .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Tag> Tags { get; set; }
    }
}