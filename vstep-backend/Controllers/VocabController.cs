using System.Linq;
using Microsoft.AspNetCore.Mvc;
using VstepBackend.Data;

namespace VstepBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VocabController : ControllerBase
    {
        private readonly AppDbContext _db;

        public VocabController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetVocab([FromQuery] string? level, [FromQuery] string? topic)
        {
            var q = _db.Vocabularies.AsQueryable();
            if (!string.IsNullOrWhiteSpace(level) && level != "all")
                q = q.Where(v => v.CefrLevel == level);
            if (!string.IsNullOrWhiteSpace(topic) && topic != "all")
                q = q.Where(v => v.Topic == topic);

            return Ok(q.ToList());
        }

        [HttpGet("search")]
        [HttpGet("search/{*word}")]
        public async Task<IActionResult> SearchWord([FromRoute] string? word, [FromQuery] string? q)
        {
            var target = !string.IsNullOrWhiteSpace(word) ? word : q;
            if (string.IsNullOrWhiteSpace(target)) return BadRequest("Word is required");
            var clean = target.Trim().ToLower();
            var item = await Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(
                _db.Vocabularies, v => v.Word.ToLower() == clean);
            if (item == null) return NotFound(new { message = "Word not found in database" });
            return Ok(item);
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveVocab([FromBody] VstepBackend.DTOs.SaveVocabRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Word)) return BadRequest("Word is required");
            var clean = req.Word.Trim().ToLower();
            var existing = await Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(
                _db.Vocabularies, v => v.Word.ToLower() == clean);
            if (existing != null)
            {
                if (!string.IsNullOrWhiteSpace(req.DefinitionVi)) existing.DefinitionVi = req.DefinitionVi;
                if (!string.IsNullOrWhiteSpace(req.Phonetic)) existing.Phonetic = req.Phonetic;
                if (!string.IsNullOrWhiteSpace(req.ExampleEn)) existing.ExampleEn = req.ExampleEn;
                if (!string.IsNullOrWhiteSpace(req.CefrLevel)) existing.CefrLevel = req.CefrLevel;
                if (!string.IsNullOrWhiteSpace(req.Topic)) existing.Topic = req.Topic;
                await _db.SaveChangesAsync();
                return Ok(new { success = true, saved = existing, message = "Cập nhật từ vựng thành công" });
            }

            var newVocab = new VstepBackend.Models.Vocabulary
            {
                VocabId = System.Guid.NewGuid().ToString(),
                Word = clean,
                Phonetic = req.Phonetic ?? string.Empty,
                CefrLevel = req.CefrLevel ?? "B2",
                DefinitionVi = req.DefinitionVi ?? string.Empty,
                ExampleEn = req.ExampleEn ?? string.Empty,
                Topic = req.Topic ?? "Academic VSTEP"
            };
            _db.Vocabularies.Add(newVocab);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, saved = newVocab, message = "Đã lưu từ vựng vào CSDL hệ thống" });
        }
    }
}
