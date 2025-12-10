namespace LmsApi.DTOs;

// Course DTOs
public class CreateCourseDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Subcategory { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public string Badge { get; set; } = string.Empty;
    public int InstructorId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> WhatYouLearn { get; set; } = new();
    public List<string> Includes { get; set; } = new();
    public List<string> Companies { get; set; } = new();
}

public class UpdateCourseDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public string? Subcategory { get; set; }
    public decimal? Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public string? Badge { get; set; }
    public string? ImageUrl { get; set; }
    public List<string>? WhatYouLearn { get; set; }
    public List<string>? Includes { get; set; }
    public List<string>? Companies { get; set; }
}

public class CourseDto
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
    public InstructorDto? Instructor { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> WhatYouLearn { get; set; } = new();
    public List<string> Includes { get; set; } = new();
    public List<string> Companies { get; set; } = new();
    public List<CourseSectionDto> CourseSections { get; set; } = new();
    public List<CourseReviewDto> Reviews { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

// Instructor DTOs
public class CreateInstructorDto
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int Students { get; set; }
    public int Courses { get; set; }
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}

public class InstructorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int Students { get; set; }
    public int Courses { get; set; }
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}

// CourseSection DTOs
public class CreateCourseSectionDto
{
    public int CourseId { get; set; }
    public string Day { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
}

public class CourseSectionDto
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public string Day { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public List<CourseLectureDto> Lectures { get; set; } = new();
}

// CourseLecture DTOs
public class CreateCourseLectureDto
{
    public int SectionId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string? VideoUrl { get; set; }
}

public class CourseLectureDto
{
    public int Id { get; set; }
    public int SectionId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string? VideoUrl { get; set; }
}

// CourseReview DTOs
public class CreateCourseReviewDto
{
    public int CourseId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Time { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}

public class CourseReviewDto
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Time { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}
