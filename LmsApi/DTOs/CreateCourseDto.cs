namespace LmsApi.DTOs
{
    public class UpdateRoleDto
    {
        public string Role { get; set; } = string.Empty;
    }

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

    public class CreateSectionDto
    {
        public int CourseId { get; set; }
        public string Day { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
    }

    public class UpdateSectionDto
    {
        public string Day { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
    }

    public class CreateLectureDto
    {
        public int SectionId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string? VideoUrl { get; set; }
    }

    public class UpdateLectureDto
    {
        public string Title { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string? VideoUrl { get; set; }
    }
}