using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DatingApp.API.Data
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context)
        {
        }

        // public async Task<ICollection<Product>> GetAllAsync()
        // {
        //     var products = await _context.Products.Include("Photos")
        //                                           .Include("ProductTags")
        //                                           .ToListAsync();
        //     return products;
        // }

        // public async Task<Product> GetByIdAsync(int id)
        // {
        //      var product = await _context.Products.Include("Photos").Include("ProductTags.Tag").FirstOrDefaultAsync(p => p.Id == id);
        //     return product;
        // }
    }
}