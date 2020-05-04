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
    public class ProductsController : ControllerBase
    {
        // Default constructor.
        private readonly DataContext _context;
        public ProductsController(DataContext context)
        {
            _context = context;
        }

        // GET api/Products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        // GET api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var Product = await _context.Products.FirstOrDefaultAsync(v => v.Id == id);

            return Ok(Product);
        }

        // POST api/Products
        [HttpPost]
        public void Post([FromBody]string Product)
        {
        }

        // PUT api/Products/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string Product)
        {
        }

        // DELETE api/Products/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}