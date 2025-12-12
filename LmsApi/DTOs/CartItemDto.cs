namespace LmsApi.DTOs
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public CourseMiniDto Course { get; set; } = new();
    }
}
