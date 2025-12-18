-- Users table
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    HashedPassword NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- Courses table
CREATE TABLE Courses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    ShortDescription NVARCHAR(500),
    LongDescription NVARCHAR(MAX),
    Category NVARCHAR(100),
    Difficulty NVARCHAR(50),
    Thumbnail NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    IsPublished BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Courses_Users FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

-- Lessons table
CREATE TABLE Lessons (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CourseId INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX),
    VideoUrl NVARCHAR(500),
    [Order] INT,
    EstimatedDuration INT,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Lessons_Courses FOREIGN KEY (CourseId) REFERENCES Courses(Id)
);

-- Quizzes table
CREATE TABLE Quizzes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CourseId INT NOT NULL,
    LessonId INT NULL,
    Title NVARCHAR(255) NOT NULL,
    PassingScore INT,
    TimeLimit INT,
    CONSTRAINT FK_Quizzes_Courses FOREIGN KEY (CourseId) REFERENCES Courses(Id),
    CONSTRAINT FK_Quizzes_Lessons FOREIGN KEY (LessonId) REFERENCES Lessons(Id)
);

-- Questions table
CREATE TABLE Questions (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QuizId INT NOT NULL,
    QuestionText NVARCHAR(MAX) NOT NULL,
    QuestionType NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_Questions_Quizzes FOREIGN KEY (QuizId) REFERENCES Quizzes(Id)
);

-- Answers table
CREATE TABLE Answers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QuestionId INT NOT NULL,
    AnswerText NVARCHAR(MAX) NOT NULL,
    IsCorrect BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Answers_Questions FOREIGN KEY (QuestionId) REFERENCES Questions(Id)
);

-- QuizAttempts table
CREATE TABLE QuizAttempts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QuizId INT NOT NULL,
    UserId INT NOT NULL,
    Score INT,
    AttemptDate DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_QuizAttempts_Quizzes FOREIGN KEY (QuizId) REFERENCES Quizzes(Id),
    CONSTRAINT FK_QuizAttempts_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- LessonCompletion table
CREATE TABLE LessonCompletion (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    LessonId INT NOT NULL,
    UserId INT NOT NULL,
    CompletedDate DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_LessonCompletion_Lessons FOREIGN KEY (LessonId) REFERENCES Lessons(Id),
    CONSTRAINT FK_LessonCompletion_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Certificates table
CREATE TABLE Certificates (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CourseId INT NOT NULL,
    UserId INT NOT NULL,
    DownloadUrl NVARCHAR(500),
    GeneratedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Certificates_Courses FOREIGN KEY (CourseId) REFERENCES Courses(Id),
    CONSTRAINT FK_Certificates_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- StudentAnswers table
CREATE TABLE StudentAnswers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QuizAttemptId INT NOT NULL,
    QuestionId INT NOT NULL,
    AnswerId INT NOT NULL,
    IsCorrect BIT NOT NULL DEFAULT 0,
    AnsweredAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_StudentAnswers_QuizAttempts FOREIGN KEY (QuizAttemptId) REFERENCES QuizAttempts(Id),
    CONSTRAINT FK_StudentAnswers_Questions FOREIGN KEY (QuestionId) REFERENCES Questions(Id),
    CONSTRAINT FK_StudentAnswers_Answers FOREIGN KEY (AnswerId) REFERENCES Answers(Id)
);
