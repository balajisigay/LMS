using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.Models;

namespace LmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly LmsDbContext _context;

        public ContactController(LmsDbContext context)
        {
            _context = context;
        }

        // POST: api/contact
        [HttpPost]
        public async Task<IActionResult> SubmitContact([FromBody] ContactMessage model)
        {
            if (string.IsNullOrWhiteSpace(model.Name) ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Message))
            {
                return BadRequest(new { message = "All required fields must be filled." });
            }

            _context.ContactMessages.Add(model);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Your message has been sent successfully"
            });
        }

        // (Optional – Admin)
        // GET: api/contact
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var messages = await _context.ContactMessages
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();

            return Ok(messages);
        }
    }
}
