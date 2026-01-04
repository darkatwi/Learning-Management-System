using LearningManagementSystem.Models;
using LMS.Api.Models;
using System;
using System.Collections.Generic;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public string Thumbnail { get; set; } = string.Empty;
    public string CreatedById { get; set; } = string.Empty;
    public ApplicationUser? CreatedBy { get; set; }  

    public decimal Price { get; set; } = 0;
    public double Rating { get; set; } = 0;
    public string? InstructorName { get; set; }      

    public string Duration { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public bool IsPublished { get; set; } = false;

    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    public ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

}
