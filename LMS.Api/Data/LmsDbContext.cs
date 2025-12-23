using LearningManagementSystem.Models;
using LMS.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LMS.Api.Data
{
    public class LmsDbContext : IdentityDbContext<ApplicationUser>
    {
        public LmsDbContext(DbContextOptions<LmsDbContext> options)
            : base(options)
        { }

        // Domain entities
        public DbSet<Course> Courses { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<QuizAttempt> QuizAttempts { get; set; }
        public DbSet<StudentAnswer> StudentAnswers { get; set; }
        public DbSet<LessonCompletion> LessonCompletions { get; set; }
        public DbSet<Certificate> Certificates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // StudentAnswer uniqueness
            modelBuilder.Entity<StudentAnswer>()
                .HasIndex(sa => new { sa.QuizAttemptId, sa.QuestionId, sa.AnswerId })
                .IsUnique();

            // Course → Lessons
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Lessons)
                .WithOne(l => l.Course)
                .HasForeignKey(l => l.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Course → Quizzes
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Quizzes)
                .WithOne(q => q.Course)
                .HasForeignKey(q => q.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Course → Certificates (restrict to avoid multiple cascade paths)
            modelBuilder.Entity<Certificate>()
                .HasOne(c => c.Course)
                .WithMany(c => c.Certificates)
                .HasForeignKey(c => c.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            // Certificate → User (restrict)
            modelBuilder.Entity<Certificate>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // QuizAttempt → Quiz (restrict)
            modelBuilder.Entity<QuizAttempt>()
                .HasOne(qa => qa.Quiz)
                .WithMany(q => q.QuizAttempts)
                .HasForeignKey(qa => qa.QuizId)
                .OnDelete(DeleteBehavior.Restrict);

            // QuizAttempt → User (restrict)
            modelBuilder.Entity<QuizAttempt>()
                .HasOne(qa => qa.User)
                .WithMany()
                .HasForeignKey(qa => qa.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // QuizAttempt → StudentAnswers (cascade)
            modelBuilder.Entity<QuizAttempt>()
                .HasMany(qa => qa.StudentAnswers)
                .WithOne(sa => sa.QuizAttempt)
                .HasForeignKey(sa => sa.QuizAttemptId)
                .OnDelete(DeleteBehavior.Cascade);

            // StudentAnswer → Question / Answer (restrict)
            modelBuilder.Entity<StudentAnswer>()
                .HasOne(sa => sa.Question)
                .WithMany()
                .HasForeignKey(sa => sa.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<StudentAnswer>()
                .HasOne(sa => sa.Answer)
                .WithMany()
                .HasForeignKey(sa => sa.AnswerId)
                .OnDelete(DeleteBehavior.Restrict);

            // LessonCompletion → User (restrict)
            modelBuilder.Entity<LessonCompletion>()
                .HasOne(lc => lc.User)
                .WithMany()
                .HasForeignKey(lc => lc.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // LessonCompletion → Lesson (cascade)
            modelBuilder.Entity<LessonCompletion>()
                .HasOne(lc => lc.Lesson)
                .WithMany()
                .HasForeignKey(lc => lc.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            // Question → Answers
            modelBuilder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Quiz → Questions
            modelBuilder.Entity<Quiz>()
                .HasMany(q => q.Questions)
                .WithOne(qs => qs.Quiz)
                .HasForeignKey(qs => qs.QuizId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
