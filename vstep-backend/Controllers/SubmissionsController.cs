using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using VstepBackend.Data;
using VstepBackend.DTOs;
using VstepBackend.Models;
using VstepBackend.Services;

namespace VstepBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubmissionsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IAiService _aiService;

        public SubmissionsController(AppDbContext db, IAiService aiService)
        {
            _db = db;
            _aiService = aiService;
        }

        [HttpPost]
        public IActionResult SubmitExam([FromBody] SubmissionRequest req)
        {
            var exam = _db.Exams.Find(req.ExamId) ?? _db.Exams.FirstOrDefault();
            if (exam == null) return BadRequest(new { message = "Đề thi không tồn tại." });

            // Resolve User gracefully
            var cleanReqUser = (req.UserId ?? string.Empty).Trim().ToLower();
            var user = _db.Users.FirstOrDefault(u => u.UserId.ToLower() == cleanReqUser || u.Username.ToLower() == cleanReqUser || u.Email.ToLower() == cleanReqUser);
            var userId = user != null ? user.UserId : (!string.IsNullOrWhiteSpace(req.UserId) ? req.UserId : "user-student-01");

            var submission = new Submission
            {
                SubmissionId = Guid.NewGuid().ToString(),
                UserId = userId,
                ExamId = exam.ExamId,
                StartTime = DateTime.UtcNow.AddHours(-3),
                SubmitTime = DateTime.UtcNow,
                Status = "COMPLETED"
            };

            // Calculate objective score (Listening & Reading)
            int correctCount = 0;
            int totalQ = 0;
            if (req.Answers != null)
            {
                foreach (var ans in req.Answers)
                {
                    totalQ++;
                    var q = _db.Questions.Find(ans.Key);
                    bool isCorrect = q != null && q.CorrectAnswer.Equals(ans.Value, StringComparison.OrdinalIgnoreCase);
                    if (isCorrect) correctCount++;

                    if (q != null)
                    {
                        submission.Answers.Add(new SubmissionAnswer
                        {
                            SubmissionId = submission.SubmissionId,
                            QuestionId = q.QuestionId,
                            SelectedOption = ans.Value,
                            IsCorrect = isCorrect
                        });
                    }
                }
            }

            double objScore = totalQ > 0 ? Math.Round((double)correctCount / totalQ * 10.0, 1) : 7.0;
            submission.ObjectiveScore = objScore;

            // AI Writing / Speaking evaluation
            double aiScore = 6.5;
            if (!string.IsNullOrWhiteSpace(req.WritingTask2))
            {
                var eval = _aiService.EvaluateEssay(new EssayEvaluationRequest { Essay = req.WritingTask2 });
                aiScore = eval.OverallScore;
            }
            submission.AiScore = aiScore;

            // Overall Score
            double finalScore = Math.Round((objScore + aiScore) / 2.0, 1);
            submission.FinalScore = finalScore;
            submission.CefrBand = finalScore >= 8.5 ? "C1" : finalScore >= 6.0 ? "B2" : "B1";

            _db.Submissions.Add(submission);
            _db.SaveChanges();

            return Ok(new SubmissionResponse
            {
                SubmissionId = submission.SubmissionId,
                ObjectiveScore = submission.ObjectiveScore,
                AiScore = submission.AiScore,
                FinalScore = submission.FinalScore,
                CefrBand = submission.CefrBand,
                Feedback = $"Hoàn thành kỳ thi thử VSTEP với điểm tổng kết {finalScore}/10 ({submission.CefrBand})."
            });
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserSubmissions(string userId)
        {
            var cleanId = (userId ?? string.Empty).Trim().ToLower();
            var user = _db.Users.FirstOrDefault(u => u.UserId.ToLower() == cleanId || u.Username.ToLower() == cleanId);
            var targetUserId = user != null ? user.UserId.ToLower() : cleanId;

            var list = _db.Submissions
                .Where(s => s.UserId.ToLower() == targetUserId || s.UserId.ToLower() == cleanId)
                .OrderByDescending(s => s.SubmitTime)
                .Select(s => new
                {
                    s.SubmissionId,
                    s.ExamId,
                    s.FinalScore,
                    s.ObjectiveScore,
                    s.AiScore,
                    s.CefrBand,
                    s.SubmitTime,
                    s.Status
                })
                .ToList();

            return Ok(list);
        }
    }
}
