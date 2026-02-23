namespace LmsApi.DTOs
{
    public class CourseProgressDto
    {
        public int CourseId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int WatchedDurationSeconds { get; set; }
        public int TotalDurationSeconds { get; set; }
        public int Progress { get; set; }
    }
}
