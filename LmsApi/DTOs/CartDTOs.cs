// LmsApi/DTOs/CartDTOs.cs
namespace LmsApi.DTOs
{
    public class AddCartDto
    {
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
    }

    public class CartItemDto
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public CourseMiniDto Course { get; set; } = new();
    }

    public class CourseMiniDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string InstructorName { get; set; } = string.Empty;
    }
}