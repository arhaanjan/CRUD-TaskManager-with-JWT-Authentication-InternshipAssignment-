using System.ComponentModel.DataAnnotations;

namespace InternshipAssignment.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public bool Completed { get; set; } = false;
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
