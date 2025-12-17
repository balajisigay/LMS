using System.ComponentModel.DataAnnotations;

namespace LmsApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string Role { get; set; } = "Student";

        // ⭐ NEW Profile Fields
        public string? ProfileImageUrl { get; set; }
        public string? Bio { get; set; }
        public string? Phone { get; set; }
        public string? Location { get; set; }
        public string? Website { get; set; }
        public string? LinkedIn { get; set; }
        public string? Twitter { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}