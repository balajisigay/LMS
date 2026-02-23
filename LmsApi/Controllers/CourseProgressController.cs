using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using LmsApi.DTOs;
using LmsApi.Models;
using System.Text.RegularExpressions;

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

    // GET user progress
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserProgress(string userId)
    {
        try
        {
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
                        WatchedDurationSeconds = p.CompletedLectures,
                        TotalDurationSeconds = p.TotalLectures,
                        Progress = CalculateProgressPercentage(p.CompletedLectures, p.TotalLectures)
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

    // UPDATE progress using watched time
    [HttpPost("update")]
    public async Task<IActionResult> UpdateProgress([FromQuery] string userId, [FromQuery] int courseId, [FromQuery] int? watchedSeconds = null)
    {
        try
        {
            var lectureDurations = await _context.CourseSections
                .Where(s => s.CourseId == courseId)
                .SelectMany(s => s.Lectures)
                .Select(l => l.Duration)
                .ToListAsync();

            var totalDurationSeconds = lectureDurations.Sum(ParseDurationToSeconds);
            if (totalDurationSeconds <= 0)
            {
                return BadRequest(new { message = "Course has no valid lecture durations" });
            }

            var incrementSeconds = watchedSeconds.GetValueOrDefault();
            if (incrementSeconds <= 0)
            {
                var avgLectureSeconds = lectureDurations.Count == 0
                    ? 300
                    : Math.Max((int)Math.Round((double)totalDurationSeconds / lectureDurations.Count), 60);
                incrementSeconds = avgLectureSeconds;
            }

            var progress = await _context.CourseProgresses
                .FirstOrDefaultAsync(p => p.UserId == userId && p.CourseId == courseId);

            if (progress == null)
            {
                progress = new CourseProgress
                {
                    UserId = userId,
                    CourseId = courseId,
                    TotalLectures = totalDurationSeconds,
                    CompletedLectures = Math.Min(incrementSeconds, totalDurationSeconds),
                    UpdatedAt = DateTime.UtcNow
                };

                _context.CourseProgresses.Add(progress);
            }
            else
            {
                progress.TotalLectures = totalDurationSeconds;
                progress.CompletedLectures = Math.Min(progress.CompletedLectures + incrementSeconds, totalDurationSeconds);
                progress.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                userId = progress.UserId,
                courseId = progress.CourseId,
                watchedDurationSeconds = progress.CompletedLectures,
                totalDurationSeconds = progress.TotalLectures,
                progress = CalculateProgressPercentage(progress.CompletedLectures, progress.TotalLectures),
                updatedAt = progress.UpdatedAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to update progress", error = ex.Message });
        }
    }

    // RESET progress
    [HttpDelete("{userId}/{courseId}")]
    public async Task<IActionResult> ResetProgress(string userId, int courseId)
    {
        try
        {
            var progress = await _context.CourseProgresses
                .FirstOrDefaultAsync(p => p.UserId == userId && p.CourseId == courseId);

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

    // GET detailed progress for a specific course
    [HttpGet("{userId}/course/{courseId}")]
    public async Task<IActionResult> GetCourseProgress(string userId, int courseId)
    {
        try
        {
            var progress = await _context.CourseProgresses
                .FirstOrDefaultAsync(p => p.UserId == userId && p.CourseId == courseId);

            if (progress == null)
            {
                return Ok(new
                {
                    userId,
                    courseId,
                    watchedDurationSeconds = 0,
                    totalDurationSeconds = 0,
                    progress = 0
                });
            }

            return Ok(new
            {
                userId = progress.UserId,
                courseId = progress.CourseId,
                watchedDurationSeconds = progress.CompletedLectures,
                totalDurationSeconds = progress.TotalLectures,
                progress = CalculateProgressPercentage(progress.CompletedLectures, progress.TotalLectures),
                updatedAt = progress.UpdatedAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to load course progress", error = ex.Message });
        }
    }

    private static int CalculateProgressPercentage(int watchedSeconds, int totalDurationSeconds)
    {
        if (totalDurationSeconds <= 0)
        {
            return 0;
        }

        return (int)Math.Round((double)watchedSeconds / totalDurationSeconds * 100);
    }

    private static int ParseDurationToSeconds(string? duration)
    {
        if (string.IsNullOrWhiteSpace(duration))
        {
            return 0;
        }

        var value = duration.Trim().ToLowerInvariant();

        // Format: hh:mm:ss or mm:ss
        if (value.Contains(':'))
        {
            var parts = value.Split(':', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 2 && int.TryParse(parts[0], out var mm) && int.TryParse(parts[1], out var ss))
            {
                return mm * 60 + ss;
            }

            if (parts.Length == 3 && int.TryParse(parts[0], out var hh) && int.TryParse(parts[1], out var m) && int.TryParse(parts[2], out var s))
            {
                return hh * 3600 + m * 60 + s;
            }
        }

        var hourMatch = Regex.Match(value, @"(\d+)\s*h");
        var minuteMatch = Regex.Match(value, @"(\d+)\s*m");
        var secondMatch = Regex.Match(value, @"(\d+)\s*s");

        var hours = hourMatch.Success ? int.Parse(hourMatch.Groups[1].Value) : 0;
        var minutes = minuteMatch.Success ? int.Parse(minuteMatch.Groups[1].Value) : 0;
        var seconds = secondMatch.Success ? int.Parse(secondMatch.Groups[1].Value) : 0;

        var total = hours * 3600 + minutes * 60 + seconds;
        if (total > 0)
        {
            return total;
        }

        // Plain number fallback assumes minutes
        if (int.TryParse(value, out var plainMinutes))
        {
            return plainMinutes * 60;
        }

        return 0;
    }
}
