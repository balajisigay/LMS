using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;

namespace LmsApi.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly LmsDbContext _db;
        private readonly IWebHostEnvironment _env;

        public UsersController(LmsDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        // GET: api/users/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var user = await _db.Users
                .Where(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.Role,
                    u.ProfileImageUrl,
                    u.Bio,
                    u.Phone,
                    u.Location,
                    u.Website,
                    u.LinkedIn,
                    u.Twitter,
                    u.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        // ✅ UPDATE PROFILE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileRequest request)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            // Update fields if provided
            if (!string.IsNullOrEmpty(request.FullName))
                user.FullName = request.FullName;

            if (!string.IsNullOrEmpty(request.Bio))
                user.Bio = request.Bio;

            if (!string.IsNullOrEmpty(request.Phone))
                user.Phone = request.Phone;

            if (!string.IsNullOrEmpty(request.Location))
                user.Location = request.Location;

            if (!string.IsNullOrEmpty(request.Website))
                user.Website = request.Website;

            if (!string.IsNullOrEmpty(request.LinkedIn))
                user.LinkedIn = request.LinkedIn;

            if (!string.IsNullOrEmpty(request.Twitter))
                user.Twitter = request.Twitter;

            await _db.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully" });
        }

        // ✅ UPLOAD PROFILE PHOTO
        [HttpPost("{id}/upload-photo")]
        [Consumes("multipart/form-data")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadPhoto(
            int id,
            [FromForm] IFormFile profileImage
        )
        {
            if (profileImage == null || profileImage.Length == 0)
                return BadRequest(new { message = "No file uploaded" });

            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            var uploadsDir = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsDir))
                Directory.CreateDirectory(uploadsDir);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(profileImage.FileName)}";
            var filePath = Path.Combine(uploadsDir, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await profileImage.CopyToAsync(stream);
            }

            user.ProfileImageUrl = $"/uploads/{fileName}";
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Profile photo uploaded successfully",
                imageUrl = user.ProfileImageUrl
            });
        }

        // ✅ DELETE PROFILE PHOTO
        [HttpDelete("{id}/delete-photo")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            if (!string.IsNullOrEmpty(user.ProfileImageUrl))
            {
                var filePath = Path.Combine(
                    _env.WebRootPath,
                    user.ProfileImageUrl.TrimStart('/')
                );

                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                user.ProfileImageUrl = null;
                await _db.SaveChangesAsync();
            }

            return Ok(new { message = "Profile photo deleted" });
        }
    }
}

// Update Profile Request DTO
public class UpdateProfileRequest
{
    public string? FullName { get; set; }
    public string? Bio { get; set; }
    public string? Phone { get; set; }
    public string? Location { get; set; }
    public string? Website { get; set; }
    public string? LinkedIn { get; set; }
    public string? Twitter { get; set; }
}
