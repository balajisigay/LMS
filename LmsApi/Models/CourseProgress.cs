namespace LmsApi.Models
{
    public class CourseProgress
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }

        public int CompletedLectures { get; set; }
        public int TotalLectures { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
