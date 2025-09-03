using InternshipAssignment.Data;
using InternshipAssignment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace InternshipAssignment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TasksController(AppDbContext context) => _context = context;

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);


        [HttpGet]
        public IActionResult GetTasks() =>
            Ok(_context.Tasks.Where(t => t.UserId == UserId).ToList());

        [HttpPost]
        public IActionResult AddTask(TaskItem t)
        {
            t.UserId = UserId;
            _context.Tasks.Add(t);
            _context.SaveChanges();
            return Ok(t);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskItem t)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId == UserId);
            if (task == null) return NotFound();
            task.Title = t.Title;
            task.Description = t.Description;
            task.Completed = t.Completed;
            _context.SaveChanges();
            return Ok(task);
        }

        [HttpPatch("{id}/toggle")]
        public IActionResult ToggleTask(int id)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId == UserId);
            if (task == null) return NotFound();
            task.Completed = !task.Completed;
            _context.SaveChanges();
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id && x.UserId == UserId);
            if (task == null) return NotFound();
            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return Ok(new { message = "Deleted" });
        }
    }
}
