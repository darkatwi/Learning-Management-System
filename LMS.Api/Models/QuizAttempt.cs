using LMS.Api.Models;
using System;
using System.Collections.Generic;

namespace LearningManagementSystem.Models
{
    public class QuizAttempt
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public int UserId { get; set; }

        public int Score { get; set; }

        // Track attempt times
        public DateTime StartedAt { get; set; } = DateTime.UtcNow; // when the attempt starts
        public DateTime? CompletedAt { get; set; } // optional, when the attempt ends
        public DateTime AttemptDate { get; set; } = DateTime.UtcNow; // can keep for historical logging

        // Navigation properties
        public Quiz Quiz { get; set; }
        public User User { get; set; }
        public ICollection<StudentAnswer> StudentAnswers { get; set; }
    }
}
