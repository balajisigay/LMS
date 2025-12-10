using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.Models;
using LmsApi.DTOs;

namespace LmsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly LmsDbContext _context;
    private readonly ILogger<CoursesController> _logger;

    public CoursesController(LmsDbContext context, ILogger<CoursesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/courses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
    {
        try
        {
            var courses = await _context.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Reviews)
                .Include(c => c.CourseSections)
                .ThenInclude(cs => cs.Lectures)
                .ToListAsync();

            var courseDtos = courses.Select(MapToCourseDto).ToList();
            return Ok(courseDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching courses");
            return StatusCode(500, new { message = "Error fetching courses", error = ex.Message });
        }
    }

    // GET: api/courses/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<CourseDto>> GetCourse(int id)
    {
        try
        {
            var course = await _context.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Reviews)
                .Include(c => c.CourseSections)
                .ThenInclude(cs => cs.Lectures)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            return Ok(MapToCourseDto(course));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching course {id}", id);
            return StatusCode(500, new { message = "Error fetching course", error = ex.Message });
        }
    }

    // GET: api/courses/category/{category}
    [HttpGet("category/{category}")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetCoursesByCategory(string category)
    {
        try
        {
            var courses = await _context.Courses
                .Where(c => c.Category == category)
                .Include(c => c.Instructor)
                .Include(c => c.Reviews)
                .ToListAsync();

            var courseDtos = courses.Select(MapToCourseDto).ToList();
            return Ok(courseDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching courses by category {category}", category);
            return StatusCode(500, new { message = "Error fetching courses", error = ex.Message });
        }
    }

    // POST: api/courses
    [HttpPost]
    public async Task<ActionResult<CourseDto>> CreateCourse(CreateCourseDto dto)
    {
        try
        {
            var course = new Course
            {
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                Subcategory = dto.Subcategory,
                Price = dto.Price,
                OriginalPrice = dto.OriginalPrice,
                Discount = (int)((1 - (dto.Price / dto.OriginalPrice)) * 100),
                Badge = dto.Badge,
                InstructorId = dto.InstructorId,
                ImageUrl = dto.ImageUrl,
                WhatYouLearn = dto.WhatYouLearn,
                Includes = dto.Includes,
                Companies = dto.Companies,
                Rating = 4.5,
                ReviewCount = 0,
                StudentCount = 0,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, MapToCourseDto(course));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating course");
            return StatusCode(500, new { message = "Error creating course", error = ex.Message });
        }
    }

    // PUT: api/courses/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, UpdateCourseDto dto)
    {
        try
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            if (!string.IsNullOrEmpty(dto.Title)) course.Title = dto.Title;
            if (!string.IsNullOrEmpty(dto.Description)) course.Description = dto.Description;
            if (!string.IsNullOrEmpty(dto.Category)) course.Category = dto.Category;
            if (!string.IsNullOrEmpty(dto.Subcategory)) course.Subcategory = dto.Subcategory;
            if (dto.Price.HasValue) course.Price = dto.Price.Value;
            if (dto.OriginalPrice.HasValue) course.OriginalPrice = dto.OriginalPrice.Value;
            if (!string.IsNullOrEmpty(dto.Badge)) course.Badge = dto.Badge;
            if (!string.IsNullOrEmpty(dto.ImageUrl)) course.ImageUrl = dto.ImageUrl;
            if (dto.WhatYouLearn != null) course.WhatYouLearn = dto.WhatYouLearn;
            if (dto.Includes != null) course.Includes = dto.Includes;
            if (dto.Companies != null) course.Companies = dto.Companies;

            course.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Course updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating course {id}", id);
            return StatusCode(500, new { message = "Error updating course", error = ex.Message });
        }
    }

    // DELETE: api/courses/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        try
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting course {id}", id);
            return StatusCode(500, new { message = "Error deleting course", error = ex.Message });
        }
    }

    // Helper method to map Course to CourseDto
    private CourseDto MapToCourseDto(Course course)
    {
        return new CourseDto
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Category = course.Category,
            Subcategory = course.Subcategory,
            Price = course.Price,
            OriginalPrice = course.OriginalPrice,
            Discount = course.Discount,
            Badge = course.Badge,
            Rating = course.Rating,
            ReviewCount = course.ReviewCount,
            StudentCount = course.StudentCount,
            InstructorId = course.InstructorId,
            Instructor = course.Instructor != null ? new InstructorDto
            {
                Id = course.Instructor.Id,
                Name = course.Instructor.Name,
                Title = course.Instructor.Title,
                Rating = course.Instructor.Rating,
                Students = course.Instructor.Students,
                Courses = course.Instructor.Courses,
                Bio = course.Instructor.Bio,
                ImageUrl = course.Instructor.ImageUrl
            } : null,
            ImageUrl = course.ImageUrl,
            WhatYouLearn = course.WhatYouLearn,
            Includes = course.Includes,
            Companies = course.Companies,
            CourseSections = course.CourseSections?.Select(cs => new CourseSectionDto
            {
                Id = cs.Id,
                CourseId = cs.CourseId,
                Day = cs.Day,
                Title = cs.Title,
                Duration = cs.Duration,
                Lectures = cs.Lectures?.Select(l => new CourseLectureDto
                {
                    Id = l.Id,
                    SectionId = l.SectionId,
                    Title = l.Title,
                    Duration = l.Duration,
                    VideoUrl = l.VideoUrl
                }).ToList() ?? new()
            }).ToList() ?? new(),
            Reviews = course.Reviews?.Select(r => new CourseReviewDto
            {
                Id = r.Id,
                CourseId = r.CourseId,
                Name = r.Name,
                Rating = r.Rating,
                Time = r.Time,
                Text = r.Text
            }).ToList() ?? new(),
            CreatedAt = course.CreatedAt,
            UpdatedAt = course.UpdatedAt
        };
    }
}
