namespace LmsApi.DTOs
{
    public class CourseMiniDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string InstructorName { get; set; } = string.Empty;
    }
}
