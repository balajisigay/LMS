using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.DTOs;
using LmsApi.Models;

namespace LmsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseProgressController : ControllerBase
{
    private readonly LmsDbContext _context;

    public CourseProgressController(LmsDbContext context)
    {
        _context = context;
    }

    // 🔹 GET user progress (used by LearningPaths)
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserProgress(string userId)
    {
        try
        {
            // First, get all course progresses for this user
            var userProgresses = await _context.CourseProgresses
                .Where(p => p.UserId == userId)
                .ToListAsync();

            // Then join with courses to get titles
            var progress = await _context.CourseProgresses
                .Where(p => p.UserId == userId)
                .Join(
                    _context.Courses,
                    p => p.CourseId,
                    c => c.Id,
                    (p, c) => new CourseProgressDto
                    {
                        CourseId = c.Id,
                        Title = c.Title,
                        Progress = p.TotalLectures == 0
                            ? 0
                            : (int)Math.Round(
                                (double)p.CompletedLectures / p.TotalLectures * 100
                            )
                    }
                )
                .ToListAsync();

            return Ok(progress);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to load progress", error = ex.Message });
        }
    }

    // 🔹 UPDATE progress when lecture completed
    [HttpPost("update")]
    public async Task<IActionResult> UpdateProgress(string userId, int courseId)
    {
        try
        {
            // Get total lectures for this course
            var totalLectures = await _context.CourseSections
                .Where(s => s.CourseId == courseId)
                .SelectMany(s => s.Lectures)
                .CountAsync();

            if (totalLectures == 0)
            {
                return BadRequest(new { message = "Course has no lectures" });
            }

            // Find existing progress record
            var progress = await _context.CourseProgresses
                .FirstOrDefaultAsync(p =>
                    p.UserId == userId && p.CourseId == courseId
                );

            if (progress == null)
            {
                // Create new progress record
                progress = new CourseProgress
                {
                    UserId = userId,
                    CourseId = courseId,
                    TotalLectures = totalLectures,
                    CompletedLectures = 1,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.CourseProgresses.Add(progress);
            }
            else
            {
                // Update existing progress
                progress.CompletedLectures = Math.Min(
                    progress.CompletedLectures + 1,
                    totalLectures
                );

                progress.TotalLectures = totalLectures;
                progress.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            // Calculate percentage
            var percentage = (int)Math.Round(
                (double)progress.CompletedLectures / progress.TotalLectures * 100
            );

            return Ok(new
            {
                userId = progress.UserId,
                courseId = progress.CourseId,
                completedLectures = progress.CompletedLectures,
                totalLectures = progress.TotalLectures,
                progress = percentage,
                updatedAt = progress.UpdatedAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to update progress", error = ex.Message });
        }
    }

    // 🔹 RESET progress for a course (useful for testing)
    [HttpDelete("{userId}/{courseId}")]
    public async Task<IActionResult> ResetProgress(string userId, int courseId)
    {
        try
        {
            var progress = await _context.CourseProgresses
                .FirstOrDefaultAsync(p =>
                    p.UserId == userId && p.CourseId == courseId
                );

            if (progress == null)
            {
                return NotFound(new { message = "Progress record not found" });
            }

            _context.CourseProgresses.Remove(progress);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Progress reset successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to reset progress", error = ex.Message });
        }
    }

    // 🔹 GET detailed progress for a specific course
    [HttpGet("{userId}/course/{courseId}")]
    public async Task<IActionResult> GetCourseProgress(string userId, int courseId)
    {
        try
        {
            var progress = await _context.CourseProgresses
                .FirstOrDefaultAsync(p =>
                    p.UserId == userId && p.CourseId == courseId
                );

            if (progress == null)
            {
                // Return 0 progress if no record exists
                return Ok(new
                {
                    userId,
                    courseId,
                    completedLectures = 0,
                    totalLectures = 0,
                    progress = 0
                });
            }

            var percentage = progress.TotalLectures == 0
                ? 0
                : (int)Math.Round(
                    (double)progress.CompletedLectures / progress.TotalLectures * 100
                );

            return Ok(new
            {
                userId = progress.UserId,
                courseId = progress.CourseId,
                completedLectures = progress.CompletedLectures,
                totalLectures = progress.TotalLectures,
                progress = percentage,
                updatedAt = progress.UpdatedAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to load course progress", error = ex.Message });
        }
    }
}