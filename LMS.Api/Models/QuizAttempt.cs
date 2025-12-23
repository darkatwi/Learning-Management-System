using LMS.Api.Models;
using System;
using System.Collections.Generic;

namespace LearningManagementSystem.Models
{
    public class QuizAttempt
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int Score { get; set; }

        public DateTime StartedAt { get; set; } = DateTime.UtcNow; 
        public DateTime? CompletedAt { get; set; }
        public DateTime AttemptDate { get; set; } = DateTime.UtcNow; 

        public Quiz Quiz { get; set; }
        public ICollection<StudentAnswer> StudentAnswers { get; set; }
    }
}