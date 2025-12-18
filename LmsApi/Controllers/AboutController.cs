// Controllers/AboutController.cs
using Microsoft.AspNetCore.Mvc;

namespace LmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var about = new
            {
                name = "Lumina",
                tagline = "Your gateway to transformative learning.",
                stats = new
                {
                    activeLearners = 50000,
                    courses = 200,
                    satisfaction = 98
                }
            };

            return Ok(about);
        }
    }
}
