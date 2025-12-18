using System.Collections.Generic;

namespace LearningManagementSystem.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }

        // Navigation properties
        public Quiz Quiz { get; set; }
        public ICollection<Answer> Answers { get; set; }
        public ICollection<StudentAnswer> StudentAnswers { get; set; }
    }
}
