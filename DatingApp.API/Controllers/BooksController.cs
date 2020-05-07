using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
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

        public IMapper _mapper { get; set; }

        public BooksController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET api/books
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books.Include("Tags").ToListAsync();

            var booksToReturn = _mapper.Map<IEnumerable<BookForListDTO>>(books);

            return Ok(booksToReturn);
        }

        // GET api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(v => v.Id == id);

            var bookToReturn = _mapper.Map<BookForDetailedDTO>(book);

            return Ok(bookToReturn);
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