using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VstepBackend.Models
{
    [Table("roles")]
    public class Role
    {
        [Key]
        [Column("role_id")]
        [StringLength(20)]
        public string RoleId { get; set; } = string.Empty;

        [Column("role_name")]
        [StringLength(50)]
        public string RoleName { get; set; } = string.Empty;

        [Column("description")]
        [StringLength(255)]
        public string? Description { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }

    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        [StringLength(36)]
        public string UserId { get; set; } = Guid.NewGuid().ToString();

        [Column("username")]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Column("password_hash")]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Column("full_name")]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Column("email")]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Column("role_id")]
        [StringLength(20)]
        public string RoleId { get; set; } = "ROLE_STUDENT";

        [ForeignKey("RoleId")]
        public Role? Role { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    }

    [Table("exams")]
    public class Exam
    {
        [Key]
        [Column("exam_id")]
        [StringLength(36)]
        public string ExamId { get; set; } = Guid.NewGuid().ToString();

        [Column("code")]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;

        [Column("title")]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Column("level")]
        [StringLength(20)]
        public string Level { get; set; } = "B2";

        [Column("target_band")]
        [StringLength(50)]
        public string TargetBand { get; set; } = "B2 Target";

        [Column("source")]
        [StringLength(100)]
        public string Source { get; set; } = "Hội đồng khảo thí VSTEP";

        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Column("duration_minutes")]
        public int DurationMinutes { get; set; } = 180;

        [Column("rating")]
        public double Rating { get; set; } = 4.8;

        [Column("participants_count")]
        public int ParticipantsCount { get; set; } = 1200;

        [Column("tags")]
        public string Tags { get; set; } = "VSTEP,Full 4 kỹ năng";

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Section> Sections { get; set; } = new List<Section>();
        public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    }

    [Table("sections")]
    public class Section
    {
        [Key]
        [Column("section_id")]
        [StringLength(36)]
        public string SectionId { get; set; } = Guid.NewGuid().ToString();

        [Column("exam_id")]
        [StringLength(36)]
        public string ExamId { get; set; } = string.Empty;

        [ForeignKey("ExamId")]
        public Exam? Exam { get; set; }

        [Column("skill_type")]
        [StringLength(20)]
        public string SkillType { get; set; } = "LISTENING"; // LISTENING, READING, WRITING, SPEAKING

        [Column("part_number")]
        public int PartNumber { get; set; } = 1;

        [Column("title")]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [Column("passage_content")]
        public string? PassageContent { get; set; }

        [Column("audio_url")]
        public string? AudioUrl { get; set; }

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }

    [Table("questions")]
    public class Question
    {
        [Key]
        [Column("question_id")]
        [StringLength(36)]
        public string QuestionId { get; set; } = Guid.NewGuid().ToString();

        [Column("section_id")]
        [StringLength(36)]
        public string SectionId { get; set; } = string.Empty;

        [ForeignKey("SectionId")]
        public Section? Section { get; set; }

        [Column("question_number")]
        public int QuestionNumber { get; set; } = 1;

        [Column("content")]
        public string Content { get; set; } = string.Empty;

        [Column("correct_answer")]
        [StringLength(10)]
        public string CorrectAnswer { get; set; } = "A";

        [Column("explanation")]
        public string? Explanation { get; set; }

        public ICollection<QuestionOption> Options { get; set; } = new List<QuestionOption>();
    }

    [Table("question_options")]
    public class QuestionOption
    {
        [Key]
        [Column("option_id")]
        [StringLength(36)]
        public string OptionId { get; set; } = Guid.NewGuid().ToString();

        [Column("question_id")]
        [StringLength(36)]
        public string QuestionId { get; set; } = string.Empty;

        [ForeignKey("QuestionId")]
        public Question? Question { get; set; }

        [Column("option_label")]
        [StringLength(5)]
        public string OptionLabel { get; set; } = "A";

        [Column("option_text")]
        public string OptionText { get; set; } = string.Empty;
    }

    [Table("submissions")]
    public class Submission
    {
        [Key]
        [Column("submission_id")]
        [StringLength(36)]
        public string SubmissionId { get; set; } = Guid.NewGuid().ToString();

        [Column("user_id")]
        [StringLength(36)]
        public string UserId { get; set; } = string.Empty;

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Column("exam_id")]
        [StringLength(36)]
        public string ExamId { get; set; } = string.Empty;

        [ForeignKey("ExamId")]
        public Exam? Exam { get; set; }

        [Column("start_time")]
        public DateTime StartTime { get; set; } = DateTime.UtcNow;

        [Column("submit_time")]
        public DateTime? SubmitTime { get; set; }

        [Column("objective_score")]
        public double ObjectiveScore { get; set; } = 0.0;

        [Column("ai_score")]
        public double AiScore { get; set; } = 0.0;

        [Column("final_score")]
        public double FinalScore { get; set; } = 0.0;

        [Column("cefr_band")]
        [StringLength(10)]
        public string CefrBand { get; set; } = "B2";

        [Column("status")]
        [StringLength(20)]
        public string Status { get; set; } = "COMPLETED";

        public ICollection<SubmissionAnswer> Answers { get; set; } = new List<SubmissionAnswer>();
        public AiEvaluationResult? AiEvaluation { get; set; }
    }

    [Table("submission_answers")]
    public class SubmissionAnswer
    {
        [Key]
        [Column("answer_id")]
        [StringLength(36)]
        public string AnswerId { get; set; } = Guid.NewGuid().ToString();

        [Column("submission_id")]
        [StringLength(36)]
        public string SubmissionId { get; set; } = string.Empty;

        [ForeignKey("SubmissionId")]
        public Submission? Submission { get; set; }

        [Column("question_id")]
        [StringLength(36)]
        public string QuestionId { get; set; } = string.Empty;

        [Column("selected_option")]
        [StringLength(10)]
        public string SelectedOption { get; set; } = string.Empty;

        [Column("is_correct")]
        public bool IsCorrect { get; set; } = false;
    }

    [Table("ai_evaluation_results")]
    public class AiEvaluationResult
    {
        [Key]
        [Column("eval_id")]
        [StringLength(36)]
        public string EvalId { get; set; } = Guid.NewGuid().ToString();

        [Column("submission_id")]
        [StringLength(36)]
        public string SubmissionId { get; set; } = string.Empty;

        [ForeignKey("SubmissionId")]
        public Submission? Submission { get; set; }

        [Column("overall_score")]
        public double OverallScore { get; set; }

        [Column("cefr_band")]
        [StringLength(10)]
        public string CefrBand { get; set; } = "B2";

        [Column("task_score")]
        public double TaskScore { get; set; }

        [Column("coherence_score")]
        public double CoherenceScore { get; set; }

        [Column("lexical_score")]
        public double LexicalScore { get; set; }

        [Column("grammar_score")]
        public double GrammarScore { get; set; }

        [Column("pronunciation_score")]
        public double PronunciationScore { get; set; }

        [Column("feedback")]
        public string Feedback { get; set; } = string.Empty;

        [Column("grammar_errors_json")]
        public string GrammarErrorsJson { get; set; } = "[]";

        [Column("improved_sample")]
        public string ImprovedSample { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    [Table("vocabulary")]
    public class Vocabulary
    {
        [Key]
        [Column("vocab_id")]
        [StringLength(36)]
        public string VocabId { get; set; } = Guid.NewGuid().ToString();

        [Column("word")]
        [StringLength(100)]
        public string Word { get; set; } = string.Empty;

        [Column("phonetic")]
        [StringLength(100)]
        public string Phonetic { get; set; } = string.Empty;

        [Column("cefr_level")]
        [StringLength(10)]
        public string CefrLevel { get; set; } = "B2";

        [Column("definition_vi")]
        public string DefinitionVi { get; set; } = string.Empty;

        [Column("example_en")]
        public string ExampleEn { get; set; } = string.Empty;

        [Column("topic")]
        [StringLength(50)]
        public string Topic { get; set; } = "Education";
    }
}
