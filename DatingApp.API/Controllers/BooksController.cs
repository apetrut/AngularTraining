using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        // Default constructor.
        private readonly DataContext _context;
        
        public BooksController(DataContext context) => _context = context;

        // GET api/books
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books.Include("Tags").ToListAsync();

            return Ok(books);
        }

        // GET api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(v => v.Id == id);

            return Ok(book);
        }

        // POST api/books
        [HttpPost]
        public void Post([FromBody]string Book)
        {
        }

        // PUT api/books/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string Book)
        {
        }

        // DELETE api/books/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}