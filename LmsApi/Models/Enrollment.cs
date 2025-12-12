public class Enrollment
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int CourseId { get; set; }
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
}
