using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.Models;

namespace LmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly LmsDbContext _context;

        public EnrollmentController(LmsDbContext context)
        {
            _context = context;
        }

        // GET: api/enrollment/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserEnrollments(string userId)
        {
            try
            {
                Console.WriteLine($"📥 Getting enrollments for userId: {userId}");

                var enrollments = await _context.Enrollments
                    .Include(e => e.Course)
                        .ThenInclude(c => c.Instructor)
                    .Where(e => e.UserId == userId)
                    .OrderByDescending(e => e.EnrolledAt)
                    .Select(e => new
                    {
                        id = e.Id,
                        userId = e.UserId,
                        courseId = e.CourseId,
                        enrolledAt = e.EnrolledAt,
                        course = new
                        {
                            id = e.Course.Id,
                            title = e.Course.Title,
                            description = e.Course.Description,
                            imageUrl = e.Course.ImageUrl,
                            price = e.Course.Price,
                            instructor = new
                            {
                                name = e.Course.Instructor.Name
                            }
                        }
                    })
                    .ToListAsync();

                Console.WriteLine($"✅ Found {enrollments.Count} enrollments");
                
                if (enrollments.Any())
                {
                    Console.WriteLine($"✅ Sample enrollment: {enrollments[0].course.title}");
                }

                return Ok(enrollments);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error fetching enrollments: {ex.Message}");
                Console.WriteLine($"❌ Stack trace: {ex.StackTrace}");
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to fetch enrollments",
                    error = ex.Message
                });
            }
        }

        // GET: api/enrollment/check/{userId}/{courseId}
        [HttpGet("check/{userId}/{courseId}")]
        public async Task<IActionResult> CheckEnrollment(string userId, int courseId)
        {
            try
            {
                Console.WriteLine($"🔍 Checking enrollment for userId: {userId}, courseId: {courseId}");
                
                var isEnrolled = await _context.Enrollments
                    .AnyAsync(e => e.UserId == userId && e.CourseId == courseId);

                Console.WriteLine($"✅ Enrollment check result: {isEnrolled}");

                return Ok(new
                {
                    isEnrolled = isEnrolled
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error checking enrollment: {ex.Message}");
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to check enrollment",
                    error = ex.Message
                });
            }
        }

        // POST: api/enrollment
        [HttpPost]
        public async Task<IActionResult> CreateEnrollment([FromBody] CreateEnrollmentDto dto)
        {
            try
            {
                Console.WriteLine($"➕ Creating enrollment - UserId: {dto.UserId}, CourseId: {dto.CourseId}");

                // Check if already enrolled
                var exists = await _context.Enrollments
                    .AnyAsync(e => e.UserId == dto.UserId && e.CourseId == dto.CourseId);

                if (exists)
                {
                    Console.WriteLine($"⚠️ User already enrolled in course {dto.CourseId}");
                    return BadRequest(new
                    {
                        success = false,
                        message = "Already enrolled in this course"
                    });
                }

                // Check if course exists
                var courseExists = await _context.Courses.AnyAsync(c => c.Id == dto.CourseId);
                if (!courseExists)
                {
                    Console.WriteLine($"❌ Course {dto.CourseId} not found");
                    return NotFound(new
                    {
                        success = false,
                        message = "Course not found"
                    });
                }

                var enrollment = new Enrollment
                {
                    UserId = dto.UserId,
                    CourseId = dto.CourseId,
                    EnrolledAt = DateTime.UtcNow
                };

                _context.Enrollments.Add(enrollment);
                await _context.SaveChangesAsync();

                Console.WriteLine($"✅ Enrollment created successfully - ID: {enrollment.Id}");

                return Ok(new
                {
                    success = true,
                    message = "Enrollment successful",
                    enrollmentId = enrollment.Id
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error creating enrollment: {ex.Message}");
                Console.WriteLine($"❌ Stack trace: {ex.StackTrace}");
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to create enrollment",
                    error = ex.Message
                });
            }
        }
    }

    public class CreateEnrollmentDto
    {
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
    }
}