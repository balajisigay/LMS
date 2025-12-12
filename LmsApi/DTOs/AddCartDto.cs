namespace LmsApi.DTOs
{
    public class AddCartDto
    {
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
    }
}
