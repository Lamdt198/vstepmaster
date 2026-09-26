using Microsoft.EntityFrameworkCore;
using VstepBackend.Models;

namespace VstepBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Role> Roles => Set<Role>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Exam> Exams => Set<Exam>();
        public DbSet<Section> Sections => Set<Section>();
        public DbSet<Question> Questions => Set<Question>();
        public DbSet<QuestionOption> QuestionOptions => Set<QuestionOption>();
        public DbSet<Submission> Submissions => Set<Submission>();
        public DbSet<SubmissionAnswer> SubmissionAnswers => Set<SubmissionAnswer>();
        public DbSet<AiEvaluationResult> AiEvaluationResults => Set<AiEvaluationResult>();
        public DbSet<Vocabulary> Vocabularies => Set<Vocabulary>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Indexes
            modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Exam>().HasIndex(e => e.Code).IsUnique();
        }
    }
}
