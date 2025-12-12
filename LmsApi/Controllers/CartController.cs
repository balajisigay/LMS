using LmsApi.Data;
using LmsApi.Models;
using LmsApi.DTOs;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly LmsDbContext _context;

        public CartController(LmsDbContext context)
        {
            _context = context;
        }

        // 🔹 GET: api/cart/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(string userId)
        {
            var items = await _context.Carts
                .Include(c => c.Course)
                    .ThenInclude(c => c.Instructor)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            var dto = items.Select(i => new CartItemDto
            {
                Id = i.Id,
                Course = new CourseMiniDto
                {
                    Id = i.Course.Id,
                    Title = i.Course.Title ?? "",
                    ImageUrl = i.Course.ImageUrl ?? "",
                    Price = i.Course.Price,
                    InstructorName = i.Course.Instructor?.Name ?? ""
                }
            });

            return Ok(dto);
        }

        // 🔹 POST api/cart/add
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddCartDto dto)
        {
            if (!await _context.Courses.AnyAsync(c => c.Id == dto.CourseId))
                return BadRequest("Course not found.");

            // Prevent duplicates
            var exists = await _context.Carts
                .AnyAsync(c => c.UserId == dto.UserId && c.CourseId == dto.CourseId);

            if (exists)
                return BadRequest("Course already in cart.");

            var cart = new Cart
            {
                UserId = dto.UserId,
                CourseId = dto.CourseId
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Added to cart", cart.Id });
        }

        // 🔹 DELETE api/cart/remove/{id}
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveItem(int id)
        {
            var item = await _context.Carts.FindAsync(id);
            if (item == null) return NotFound("Cart item not found");

            _context.Carts.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Removed" });
        }
    }
}
