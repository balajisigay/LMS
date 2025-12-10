namespace LmsApi.DTOs;

public class HeroDto
{
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;

    public string CtaPrimary { get; set; } = "Explore Courses";
    public string CtaSecondary { get; set; } = "Watch Demo";

    public string HeroImageUrl { get; set; } = string.Empty;

    // Social proof
    public string StudentsEnrolledText { get; set; } = "10k+ Students enrolled today";
    public List<string> Avatars { get; set; } = new();

    // Featured Course for floating card
    public int? FeaturedCourseId { get; set; }
    public string? FeaturedCourseTitle { get; set; }
    public int FeaturedCourseProgress { get; set; } = 75;
}
