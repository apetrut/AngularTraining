using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
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
    }
}