using System.Text.Json.Serialization;
using LmsApi.Models;   // <-- REQUIRED for Course model

namespace LmsApi.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public int CourseId { get; set; }

        [JsonIgnore]
        public Course? Course { get; set; }
    }
}
