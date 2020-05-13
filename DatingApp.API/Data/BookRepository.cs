using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _context;
        public BookRepository(DataContext context)
        {
            this._context = context;
        }
        
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Task<bool> Exists<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public async Task<Book> GetBook(int id)
        {
            var book = await _context.Books.Include("Tags").FirstOrDefaultAsync(p => p.Id == id);
            return book;
        }

        public async Task<PagedList<Book>> GetBooks(BookParams bookParams)
        {
            var books = _context.Books.OrderByDescending(book => book.PublishedDate).AsQueryable();

            if (!string.IsNullOrEmpty(bookParams.Topic) && 
                bookParams.Topic.ToLower() != "any" &&
                bookParams.Topic.ToLower() != "null")
            {
                books = books.Where(b => b.Topic.ToLower() == bookParams.Topic.ToLower() || b.Topic.ToLower().Contains(bookParams.Topic.ToLower()));
            }

            if (bookParams.MinPrice != 1 ||
                bookParams.MaxPrice != 999)
                {
                    books = books.Where(b => b.Price >= bookParams.MinPrice && b.Price <= bookParams.MaxPrice);
                }

            if (!string.IsNullOrEmpty(bookParams.OrderBy))
            {
                switch (bookParams.OrderBy.ToLower())
                {
                    case "publisheddate":
                        books = books.OrderByDescending(b => b.PublishedDate);
                        break;
                    case "starrating":
                        books = books.OrderByDescending(b => b.StarRating);
                        break;
                }
            }

            return await PagedList<Book>.CreateAsync(books,
                                                     bookParams.PageNumber,
                                                     bookParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}