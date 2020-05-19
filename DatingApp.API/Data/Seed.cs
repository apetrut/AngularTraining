using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/Seed/UsersSeedData.json");

                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create new roles.
                var roles = new List<Role>
                {
                    new Role { Name = "Member" },
                    new Role { Name = "Admin" },
                    new Role { Name = "Moderator" }
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                // create admin user.
                var adminUser = new User 
                {
                    UserName = "Admin"
                };

                var result = userManager.CreateAsync(adminUser, "password").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
                }
            }
        }

        // Seeds the products in the DB.
        public static void SeedProducts(DataContext dataContext)
        {
            if (!dataContext.Products.Any())
            {
                var productData = System.IO.File.ReadAllText("Data/Seed/ProductsSeedData.json");

                var products = JsonConvert.DeserializeObject<List<Product>>(productData);

                foreach (var product in products)
                {
                    dataContext.Products.Add(product);
                }

                dataContext.SaveChanges();
            }
        }

        public static void SeedBooks(DataContext dataContext)
        {
            if (!dataContext.Books.Any())
            {
                var bookData = System.IO.File.ReadAllText("Data/Seed/BooksSeedData.json");

                var books = JsonConvert.DeserializeObject<List<Book>>(bookData);

                foreach (var book in books)
                {
                    dataContext.Books.Add(book);
                }

                dataContext.SaveChanges();
            }
        }
    }
}