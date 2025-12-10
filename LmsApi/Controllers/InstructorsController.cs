using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.Models;
using LmsApi.DTOs;

namespace LmsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InstructorsController : ControllerBase
{
    private readonly LmsDbContext _context;
    private readonly ILogger<InstructorsController> _logger;

    public InstructorsController(LmsDbContext context, ILogger<InstructorsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/instructors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstructorDto>>> GetInstructors()
    {
        try
        {
            var instructors = await _context.Instructors.ToListAsync();
            var instructorDtos = instructors.Select(MapToInstructorDto).ToList();
            return Ok(instructorDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching instructors");
            return StatusCode(500, new { message = "Error fetching instructors", error = ex.Message });
        }
    }

    // GET: api/instructors/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<InstructorDto>> GetInstructor(int id)
    {
        try
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound(new { message = "Instructor not found" });
            }

            return Ok(MapToInstructorDto(instructor));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching instructor {id}", id);
            return StatusCode(500, new { message = "Error fetching instructor", error = ex.Message });
        }
    }

    // POST: api/instructors
    [HttpPost]
    public async Task<ActionResult<InstructorDto>> CreateInstructor(CreateInstructorDto dto)
    {
        try
        {
            var instructor = new Instructor
            {
                Name = dto.Name,
                Title = dto.Title,
                Rating = dto.Rating,
                Students = dto.Students,
                Courses = dto.Courses,
                Bio = dto.Bio,
                ImageUrl = dto.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };

            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInstructor), new { id = instructor.Id }, MapToInstructorDto(instructor));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating instructor");
            return StatusCode(500, new { message = "Error creating instructor", error = ex.Message });
        }
    }

    // PUT: api/instructors/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInstructor(int id, CreateInstructorDto dto)
    {
        try
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound(new { message = "Instructor not found" });
            }

            instructor.Name = dto.Name;
            instructor.Title = dto.Title;
            instructor.Rating = dto.Rating;
            instructor.Students = dto.Students;
            instructor.Courses = dto.Courses;
            instructor.Bio = dto.Bio;
            instructor.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Instructor updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating instructor {id}", id);
            return StatusCode(500, new { message = "Error updating instructor", error = ex.Message });
        }
    }

    // DELETE: api/instructors/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInstructor(int id)
    {
        try
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound(new { message = "Instructor not found" });
            }

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Instructor deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting instructor {id}", id);
            return StatusCode(500, new { message = "Error deleting instructor", error = ex.Message });
        }
    }

    private InstructorDto MapToInstructorDto(Instructor instructor)
    {
        return new InstructorDto
        {
            Id = instructor.Id,
            Name = instructor.Name,
            Title = instructor.Title,
            Rating = instructor.Rating,
            Students = instructor.Students,
            Courses = instructor.Courses,
            Bio = instructor.Bio,
            ImageUrl = instructor.ImageUrl
        };
    }
}
