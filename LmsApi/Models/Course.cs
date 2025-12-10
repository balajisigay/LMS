namespace LmsApi.Models;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Subcategory { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public int Discount { get; set; }
    public string Badge { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public int StudentCount { get; set; }
    public int InstructorId { get; set; }
    public Instructor? Instructor { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> WhatYouLearn { get; set; } = new();
    public List<string> Includes { get; set; } = new();
    public List<string> Companies { get; set; } = new();
    public List<CourseSection> CourseSections { get; set; } = new();
    public List<CourseReview> Reviews { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Instructor
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int Students { get; set; }
    public int Courses { get; set; }
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<Course> CreatedCourses { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CourseSection
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public Course? Course { get; set; }
    public string Day { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public List<CourseLecture> Lectures { get; set; } = new();
}

public class CourseLecture
{
    public int Id { get; set; }
    public int SectionId { get; set; }
    public CourseSection? Section { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string? VideoUrl { get; set; }
}

public class CourseReview
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public Course? Course { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Time { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}
