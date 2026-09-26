using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VstepBackend.Data;

namespace VstepBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ExamsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetExams([FromQuery] string? q, [FromQuery] string? level)
        {
            var query = _db.Exams.AsQueryable();

            if (!string.IsNullOrWhiteSpace(q))
            {
                var term = q.ToLower().Trim();
                query = query.Where(e => e.Title.ToLower().Contains(term) || e.Code.ToLower().Contains(term) || e.Source.ToLower().Contains(term));
            }

            if (!string.IsNullOrWhiteSpace(level) && level != "all")
            {
                query = query.Where(e => e.Level == level || e.Level.Contains(level));
            }

            var list = query.OrderByDescending(e => e.Rating).ToList();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public IActionResult GetExamById(string id)
        {
            var exam = _db.Exams
                .Include(e => e.Sections)
                    .ThenInclude(s => s.Questions)
                        .ThenInclude(q => q.Options)
                .FirstOrDefault(e => e.ExamId == id || e.Code == id);

            if (exam == null) return NotFound(new { message = "Không tìm thấy bộ đề thi." });
            return Ok(exam);
        }
    }
}
