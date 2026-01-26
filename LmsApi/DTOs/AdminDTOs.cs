namespace LmsApi.DTOs;

// User Management DTOs
public class UpdateRoleDto
{
    public string Role { get; set; } = string.Empty;
}

// Section Management DTOs
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

// Lecture Management DTOs
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