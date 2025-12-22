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

            // Recent enrollments - UserId is string, so convert to int for User lookup
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

            // Popular courses
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
    // ==================== CREATE COURSE ====================
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
        return StatusCode(500, new { message = "Error creating course" });
    }
}
[HttpDelete("courses/{id}")]
public async Task<IActionResult> DeleteCourse(int id)
{
    var course = await _context.Courses.FindAsync(id);
    if (course == null)
        return NotFound(new { message = "Course not found" });

    _context.Courses.Remove(course);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Course deleted successfully" });
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
                // UserId is string, convert to int for User lookup
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
                    Progress = 0 // You don't have Progress in Enrollment model
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
                // UserId is string, convert to int for User lookup
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

// ==================== DTOs ====================
public class UpdateRoleDto
{
    public string Role { get; set; } = string.Empty;
}