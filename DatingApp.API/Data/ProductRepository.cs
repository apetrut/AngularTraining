using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            this._context = context;
        }
        
        public void Add(Product entity)
        {
             _context.Add(entity);
        }

        public void Delete(Product entity)
        {
             _context.Remove(entity);
        }

        public Task<bool> Exists(Product entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> ExistsAsync(Product entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> FindId(string name)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.Include("Photos").Include("ProductTags.Tag").FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _context.Products.Include("Photos")
                                                  .Include("ProductTags")
                                                  .ToListAsync();
            return products;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}