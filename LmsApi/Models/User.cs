using System.ComponentModel.DataAnnotations;

namespace LmsApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty; // store hashed later

        public string FullName { get; set; } = string.Empty;

        public string Role { get; set; } = "Student"; // optional: Admin, Instructor, Student
    }
}
