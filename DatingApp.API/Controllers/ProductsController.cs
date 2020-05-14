using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;

        private readonly ITagRepository _tagRepo;

        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, ITagRepository tagRepository, IMapper mapper)
        {
            this._repo = repository;
            this._mapper = mapper;
            this._tagRepo = tagRepository;
        }

        // GET api/Products
        [HttpGet] 
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repo.GetProducts();

            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDTO>>(products);

            return Ok(productsToReturn);
        }

        // GET api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repo.GetProduct(id);

            var productToReturn = _mapper.Map<ProductForDetailDTO>(product);
            return Ok(productToReturn);
        }

        // POST api/Products
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public void Post(Product product)
        {
            // return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT api/Products/5
        [HttpPut("{id}")]
        // [ProducesResponseType(StatusCodes.Status304NotModified)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesErrorResponseType(typeof(Exception))]
        public async Task<IActionResult> Put(int id, ProductForUpdateDTO productForUpdateDTO)
        {
            // find missing tags and remove them.
            Product productFromRepo = await FindMissingTags(id, productForUpdateDTO);

            // add new tags, if needed.
            AddNewTags(productForUpdateDTO, productFromRepo);

            // update the rest of the properties.
            _mapper.Map(productForUpdateDTO, productFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating product with id: {id} failed on save.");
        }

        // Add new tags.
        private void AddNewTags(ProductForUpdateDTO productForUpdateDTO, Product productFromRepo)
        {
            productForUpdateDTO.Tags.ToList().ForEach(tag =>
            {
                // Add the new tags to the product. 
                // Behind the scenes EF will create new Tags in the DB table and associate their new IDs with the Product.

                // don't add a new tag if it already exists in the current list.
                if (!productFromRepo.ProductTags.Any(p => p.Tag.Name == tag.Name))
                {
                    Tag tagFromDb = _tagRepo.GetTag(tag.Name).Result;
                    ProductTag newProductTag = new ProductTag();

                    if (tagFromDb == null)
                    {
                        newProductTag.Tag = _mapper.Map<Tag>(tag);
                    }
                    else
                    {
                        newProductTag.Tag = tagFromDb;
                    }

                    newProductTag.Product = productFromRepo;
                    newProductTag.ProductId = productFromRepo.Id;

                    productFromRepo.ProductTags.Add(newProductTag);
                }
            });
        }

        // Find the missing tags and remove them from the tag collection.
        private async Task<Product> FindMissingTags(int id, ProductForUpdateDTO productForUpdateDTO)
        {
            var productFromRepo = await _repo.GetProduct(id);

            // find missing rows.
            List<ProductTag> missingRows = new List<ProductTag>();
            foreach (var dbTag in productFromRepo.ProductTags)
            {
                if (!productForUpdateDTO.Tags.Any(t => t.Id == dbTag.TagId))
                {
                    missingRows.Add(dbTag);
                }
            }

            foreach (var missingRow in missingRows)
            {
                productFromRepo.ProductTags.Remove(missingRow);
            }

            return productFromRepo;
        }

        // DELETE api/Products/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}