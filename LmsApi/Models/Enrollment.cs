// LmsApi/Models/Enrollment.cs
using System.Text.Json.Serialization;

namespace LmsApi.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
        
        [JsonIgnore]
        public Course? Course { get; set; }
        
        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    }
}