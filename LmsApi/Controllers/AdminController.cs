using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.Models;
using LmsApi.DTOs;

namespace LmsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly LmsDbContext _context;
    private readonly ILogger<AdminController> _logger;

    public AdminController(LmsDbContext context, ILogger<AdminController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // ==================== HEALTH CHECK ====================
    [HttpGet("health")]
    public IActionResult HealthCheck()
    {
        try
        {
            var dbConnected = _context.Database.CanConnect();
            return Ok(new { 
                status = "healthy", 
                timestamp = DateTime.UtcNow,
                database = dbConnected ? "connected" : "disconnected"
            });
        }
        catch (Exception ex)
        {
            return Ok(new { 
                status = "unhealthy", 
                timestamp = DateTime.UtcNow,
                error = ex.Message
            });
        }
    }

    // ==================== DASHBOARD STATS ====================
    [HttpGet("dashboard/stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        try
        {
            _logger.LogInformation("Fetching dashboard stats...");

            var totalUsers = await _context.Users.CountAsync();
            var totalCourses = await _context.Courses.CountAsync();
            var totalEnrollments = await _context.Enrollments.CountAsync();
            var totalRevenue = await _context.Payments
                .Where(p => p.Status == "PAID")
                .SumAsync(p => (decimal?)p.Amount) ?? 0;

            _logger.LogInformation($"Stats - Users: {totalUsers}, Courses: {totalCourses}, Enrollments: {totalEnrollments}, Revenue: {totalRevenue}");

            var recentEnrollments = await _context.Enrollments
                .OrderByDescending(e => e.EnrolledAt)
                .Take(5)
                .ToListAsync();

            var recentEnrollmentsWithDetails = recentEnrollments.Select(e => {
                var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == e.UserId);
                var course = _context.Courses.FirstOrDefault(c => c.Id == e.CourseId);
                
                return new
                {
                    e.Id,
                    e.UserId,
                    UserName = user?.FullName ?? "Unknown User",
                    e.CourseId,
                    CourseName = course?.Title ?? "Unknown Course",
                    e.EnrolledAt
                };
            }).ToList();

            var popularCourses = await _context.Enrollments
                .GroupBy(e => e.CourseId)
                .Select(g => new
                {
                    CourseId = g.Key,
                    EnrollmentCount = g.Count()
                })
                .OrderByDescending(x => x.EnrollmentCount)
                .Take(5)
                .ToListAsync();

            var popularCoursesWithDetails = popularCourses.Select(pc => {
                var course = _context.Courses.FirstOrDefault(c => c.Id == pc.CourseId);
                return new
                {
                    Id = pc.CourseId,
                    Title = course?.Title ?? "Unknown",
                    ImageUrl = course?.ImageUrl ?? "",
                    pc.EnrollmentCount
                };
            }).ToList();

            var result = new
            {
                totalUsers,
                totalCourses,
                totalEnrollments,
                totalRevenue,
                recentEnrollments = recentEnrollmentsWithDetails,
                popularCourses = popularCoursesWithDetails
            };

            _logger.LogInformation("Dashboard stats fetched successfully");
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching dashboard stats");
            return StatusCode(500, new { 
                message = "Error fetching stats", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }

    // ==================== USER MANAGEMENT ====================
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            _logger.LogInformation($"Fetching users - page: {page}, pageSize: {pageSize}");

            var totalUsers = await _context.Users.CountAsync();
            _logger.LogInformation($"Total users in database: {totalUsers}");

            var users = await _context.Users
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.Role,
                    u.ProfileImageUrl,
                    u.CreatedAt
                })
                .ToListAsync();

            _logger.LogInformation($"Found {users.Count} users on page {page}");

            return Ok(new
            {
                users,
                totalUsers,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalUsers / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching users");
            return StatusCode(500, new { 
                message = "Error fetching users", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }

    [HttpPut("users/{id}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateRoleDto dto)
    {
        try
        {
            _logger.LogInformation($"Updating role for user {id} to {dto.Role}");

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.Role = dto.Role;
            await _context.SaveChangesAsync();

            _logger.LogInformation($"User {id} role updated to {dto.Role}");
            return Ok(new { message = "User role updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user role");
            return StatusCode(500, new { message = "Error updating role", error = ex.Message });
        }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            _logger.LogInformation($"Deleting user {id}");

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"User {id} deleted successfully");
            return Ok(new { message = "User deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user");
            return StatusCode(500, new { message = "Error deleting user", error = ex.Message });
        }
    }

    // ==================== COURSE MANAGEMENT ====================
    [HttpGet("courses")]
    public async Task<IActionResult> GetAllCoursesAdmin([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            _logger.LogInformation($"Fetching courses - page: {page}, pageSize: {pageSize}");

            var totalCourses = await _context.Courses.CountAsync();
            _logger.LogInformation($"Total courses in database: {totalCourses}");

            var courses = await _context.Courses
                .Include(c => c.Instructor)
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new
                {
                    c.Id,
                    c.Title,
                    c.Category,
                    c.Price,
                    c.StudentCount,
                    c.Rating,
                    c.ImageUrl,
                    c.InstructorId,
                    InstructorName = c.Instructor != null ? c.Instructor.Name : "Unknown",
                    c.CreatedAt
                })
                .ToListAsync();

            _logger.LogInformation($"Found {courses.Count} courses on page {page}");

            return Ok(new
            {
                courses,
                totalCourses,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalCourses / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching courses");
            return StatusCode(500, new { 
                message = "Error fetching courses", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }

    [HttpGet("courses/{id}/detail")]
    public async Task<IActionResult> GetCourseDetail(int id)
    {
        try
        {
            _logger.LogInformation($"Fetching course detail for course {id}");

            var course = await _context.Courses
                .Include(c => c.Instructor)
                .Include(c => c.CourseSections)
                    .ThenInclude(s => s.Lectures)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound(new { message = "Course not found" });

            var result = new
            {
                course.Id,
                course.Title,
                course.Description,
                course.Category,
                course.Subcategory,
                course.Price,
                course.OriginalPrice,
                course.Discount,
                course.Badge,
                course.Rating,
                course.ReviewCount,
                course.StudentCount,
                course.InstructorId,
                Instructor = course.Instructor != null ? new
                {
                    course.Instructor.Id,
                    course.Instructor.Name,
                    course.Instructor.Title
                } : null,
                course.ImageUrl,
                course.WhatYouLearn,
                course.Includes,
                course.Companies,
                CourseSections = course.CourseSections.Select(s => new
                {
                    s.Id,
                    s.CourseId,
                    s.Day,
                    s.Title,
                    s.Duration,
                    Lectures = s.Lectures.Select(l => new
                    {
                        l.Id,
                        l.SectionId,
                        l.Title,
                        l.Duration,
                        l.VideoUrl
                    }).ToList()
                }).ToList(),
                course.CreatedAt
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching course detail");
            return StatusCode(500, new { 
                message = "Error fetching course detail", 
                error = ex.Message 
            });
        }
    }

    [HttpPost("courses")]
    public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDto dto)
    {
        try
        {
            var instructor = await _context.Instructors.FindAsync(dto.InstructorId);
            if (instructor == null)
                return BadRequest(new { message = "Invalid instructor" });

            var course = new Course
            {
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                Subcategory = dto.Subcategory,
                Price = dto.Price,
                OriginalPrice = dto.OriginalPrice,
                Discount = dto.OriginalPrice > 0
                    ? (int)((dto.OriginalPrice - dto.Price) / dto.OriginalPrice * 100)
                    : 0,
                Badge = dto.Badge,
                InstructorId = dto.InstructorId,
                ImageUrl = dto.ImageUrl,
                WhatYouLearn = dto.WhatYouLearn,
                Includes = dto.Includes,
                Companies = dto.Companies,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Course created successfully",
                courseId = course.Id
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating course");
            return StatusCode(500, new { message = "Error creating course", error = ex.Message });
        }
    }

    [HttpDelete("courses/{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        try
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound(new { message = "Course not found" });

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting course");
            return StatusCode(500, new { message = "Error deleting course", error = ex.Message });
        }
    }

    // ==================== SECTION MANAGEMENT ====================
    [HttpPost("courses/sections")]
    public async Task<IActionResult> CreateSection([FromBody] CreateSectionDto dto)
    {
        try
        {
            _logger.LogInformation($"Creating section for course {dto.CourseId}");

            var course = await _context.Courses.FindAsync(dto.CourseId);
            if (course == null)
                return NotFound(new { message = "Course not found" });

            var section = new CourseSection
            {
                CourseId = dto.CourseId,
                Day = dto.Day,
                Title = dto.Title,
                Duration = dto.Duration
            };

            _context.CourseSections.Add(section);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Section created with ID {section.Id}");
            return Ok(new 
            { 
                message = "Section created successfully",
                sectionId = section.Id
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating section");
            return StatusCode(500, new { message = "Error creating section", error = ex.Message });
        }
    }

    [HttpPut("courses/sections/{id}")]
    public async Task<IActionResult> UpdateSection(int id, [FromBody] UpdateSectionDto dto)
    {
        try
        {
            _logger.LogInformation($"Updating section {id}");

            var section = await _context.CourseSections.FindAsync(id);
            if (section == null)
                return NotFound(new { message = "Section not found" });

            section.Day = dto.Day;
            section.Title = dto.Title;
            section.Duration = dto.Duration;

            await _context.SaveChangesAsync();

            _logger.LogInformation($"Section {id} updated successfully");
            return Ok(new { message = "Section updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating section");
            return StatusCode(500, new { message = "Error updating section", error = ex.Message });
        }
    }

    [HttpDelete("courses/sections/{id}")]
    public async Task<IActionResult> DeleteSection(int id)
    {
        try
        {
            _logger.LogInformation($"Deleting section {id}");

            var section = await _context.CourseSections
                .Include(s => s.Lectures)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (section == null)
                return NotFound(new { message = "Section not found" });

            _context.CourseSections.Remove(section);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Section {id} and its lectures deleted successfully");
            return Ok(new { message = "Section deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting section");
            return StatusCode(500, new { message = "Error deleting section", error = ex.Message });
        }
    }

    // ==================== LECTURE MANAGEMENT ====================
    [HttpPost("courses/lectures")]
    public async Task<IActionResult> CreateLecture([FromBody] CreateLectureDto dto)
    {
        try
        {
            _logger.LogInformation($"Creating lecture for section {dto.SectionId}");

            var section = await _context.CourseSections.FindAsync(dto.SectionId);
            if (section == null)
                return NotFound(new { message = "Section not found" });

            var lecture = new CourseLecture
            {
                SectionId = dto.SectionId,
                Title = dto.Title,
                Duration = dto.Duration,
                VideoUrl = dto.VideoUrl
            };

            _context.CourseLectures.Add(lecture);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Lecture created with ID {lecture.Id}");
            return Ok(new 
            { 
                message = "Lecture created successfully",
                lectureId = lecture.Id
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating lecture");
            return StatusCode(500, new { message = "Error creating lecture", error = ex.Message });
        }
    }

    [HttpPut("courses/lectures/{id}")]
    public async Task<IActionResult> UpdateLecture(int id, [FromBody] UpdateLectureDto dto)
    {
        try
        {
            _logger.LogInformation($"Updating lecture {id}");

            var lecture = await _context.CourseLectures.FindAsync(id);
            if (lecture == null)
                return NotFound(new { message = "Lecture not found" });

            lecture.Title = dto.Title;
            lecture.Duration = dto.Duration;
            lecture.VideoUrl = dto.VideoUrl;

            await _context.SaveChangesAsync();

            _logger.LogInformation($"Lecture {id} updated successfully");
            return Ok(new { message = "Lecture updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating lecture");
            return StatusCode(500, new { message = "Error updating lecture", error = ex.Message });
        }
    }

    [HttpDelete("courses/lectures/{id}")]
    public async Task<IActionResult> DeleteLecture(int id)
    {
        try
        {
            _logger.LogInformation($"Deleting lecture {id}");

            var lecture = await _context.CourseLectures.FindAsync(id);
            if (lecture == null)
                return NotFound(new { message = "Lecture not found" });

            _context.CourseLectures.Remove(lecture);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Lecture {id} deleted successfully");
            return Ok(new { message = "Lecture deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting lecture");
            return StatusCode(500, new { message = "Error deleting lecture", error = ex.Message });
        }
    }

    // ==================== ENROLLMENT MANAGEMENT ====================
    [HttpGet("enrollments")]
    public async Task<IActionResult> GetAllEnrollments([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            _logger.LogInformation($"Fetching enrollments - page: {page}, pageSize: {pageSize}");

            var totalEnrollments = await _context.Enrollments.CountAsync();
            _logger.LogInformation($"Total enrollments in database: {totalEnrollments}");

            var enrollments = await _context.Enrollments
                .OrderByDescending(e => e.EnrolledAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var enrollmentsWithDetails = enrollments.Select(e => {
                var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == e.UserId);
                var course = _context.Courses.FirstOrDefault(c => c.Id == e.CourseId);
                
                return new
                {
                    e.Id,
                    e.UserId,
                    UserName = user?.FullName ?? "Unknown User",
                    e.CourseId,
                    CourseName = course?.Title ?? "Unknown Course",
                    e.EnrolledAt,
                    Progress = 0
                };
            }).ToList();

            _logger.LogInformation($"Found {enrollments.Count} enrollments on page {page}");

            return Ok(new
            {
                enrollments = enrollmentsWithDetails,
                totalEnrollments,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalEnrollments / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching enrollments");
            return StatusCode(500, new { 
                message = "Error fetching enrollments", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }

    // ==================== PAYMENT MANAGEMENT ====================
    [HttpGet("payments")]
    public async Task<IActionResult> GetAllPayments([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            _logger.LogInformation($"Fetching payments - page: {page}, pageSize: {pageSize}");

            var totalPayments = await _context.Payments.CountAsync();
            _logger.LogInformation($"Total payments in database: {totalPayments}");

            var payments = await _context.Payments
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var paymentsWithDetails = payments.Select(p => {
                var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == p.UserId);
                var course = _context.Courses.FirstOrDefault(c => c.Id == p.CourseId);
                
                return new
                {
                    p.Id,
                    p.UserId,
                    UserName = user?.FullName ?? "Unknown User",
                    p.CourseId,
                    CourseName = course?.Title ?? "Unknown Course",
                    p.Amount,
                    p.Status,
                    p.RazorpayOrderId,
                    p.RazorpayPaymentId,
                    p.CreatedAt,
                    p.PaidAt
                };
            }).ToList();

            _logger.LogInformation($"Found {payments.Count} payments on page {page}");

            return Ok(new
            {
                payments = paymentsWithDetails,
                totalPayments,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalPayments / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching payments");
            return StatusCode(500, new { 
                message = "Error fetching payments", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }

    // ==================== CONTACT MESSAGES ====================
    [HttpGet("contact-messages")]
    public async Task<IActionResult> GetContactMessages([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            _logger.LogInformation($"Fetching messages - page: {page}, pageSize: {pageSize}");

            var totalMessages = await _context.ContactMessages.CountAsync();
            _logger.LogInformation($"Total messages in database: {totalMessages}");

            var messages = await _context.ContactMessages
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            _logger.LogInformation($"Found {messages.Count} messages on page {page}");

            return Ok(new
            {
                messages,
                totalMessages,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(totalMessages / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching messages");
            return StatusCode(500, new { 
                message = "Error fetching messages", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }

    [HttpDelete("contact-messages/{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        try
        {
            var message = await _context.ContactMessages.FindAsync(id);
            if (message == null)
                return NotFound(new { message = "Message not found" });

            _context.ContactMessages.Remove(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting message");
            return StatusCode(500, new { message = "Error deleting message", error = ex.Message });
        }
    }

    // ==================== INSTRUCTOR MANAGEMENT ====================
    [HttpGet("instructors")]
    public async Task<IActionResult> GetAllInstructors()
    {
        try
        {
            _logger.LogInformation("Fetching all instructors");

            var instructors = await _context.Instructors
                .Select(i => new
                {
                    i.Id,
                    i.Name,
                    i.Title,
                    i.Rating,
                    i.Students,
                    i.Courses,
                    i.ImageUrl,
                    i.CreatedAt
                })
                .ToListAsync();

            _logger.LogInformation($"Found {instructors.Count} instructors");

            return Ok(instructors);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching instructors");
            return StatusCode(500, new { 
                message = "Error fetching instructors", 
                error = ex.Message,
                stackTrace = ex.StackTrace 
            });
        }
    }
}
