
## Learning Management System (LMS)

This project is a Learning Management System (LMS) built with ASP.NET Core Web API, Entity Framework Core, and SQL Server.
It supports user management, courses, lessons, quizzes, certificates, and lesson completion tracking, providing a complete backend for an LMS application.

## Technologies Used

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Swagger (OpenAPI)
* C#

## Project Structure

```
LMS.Api/
├── Controllers/      → API Controllers (UsersController)
├── Models/           → Entity Models (User)
├── Data/             → DbContext
├── Migrations/       → EF Core migrations
├── Program.cs        → Application entry point
└── appsettings.json  → Configuration & connection string
```
## API Endpoints

### Certificates

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | /users/{userId}/certificates     |
| POST   | /courses/{courseId}/certificates |

### Courses

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/Courses      |
| POST   | /api/Courses      |
| GET    | /api/Courses/{id} |
| PUT    | /api/Courses/{id} |
| DELETE | /api/Courses/{id} |

### Lesson Completions

| Method | Endpoint                          |
| ------ | --------------------------------- |
| POST   | /lessons/{lessonId}/complete      |
| GET    | /users/{userId}/lesson-completion |

### Questions

| Method | Endpoint                        |
| ------ | ------------------------------- |
| GET    | /quizzes/{quizId}/questions     |
| POST   | /quizzes/{quizId}/questions     |
| GET    | /api/Questions/{id}             |
| PUT    | /api/Questions/{id}             |
| DELETE | /api/Questions/{id}             |
| GET    | /questions/{questionId}/answers |
| POST   | /questions/{questionId}/answers |

### Quiz Attempts

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| POST   | /quizzes/{quizId}/attempts          |
| GET    | /quizzes/{quizId}/attempts/{userId} |
| POST   | /quiz-attempts/{attemptId}/answers  |
| GET    | /quiz-attempts/{attemptId}/answers  |

### Quizzes

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /courses/{courseId}/quizzes |
| GET    | /lessons/{lessonId}/quizzes |
| POST   | /api/Quizzes                |
| GET    | /api/Quizzes/{id}           |
| PUT    | /api/Quizzes/{id}           |
| DELETE | /api/Quizzes/{id}           |

### Users

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/Users      |
| POST   | /api/Users      |
| GET    | /api/Users/{id} |
| PUT    | /api/Users/{id} |
| DELETE | /api/Users/{id} |

## Schemas

* Answer
* Certificate
* Course
* Lesson
* LessonCompletion
* Question
* Quiz
* QuizAttempt
* StudentAnswer
* User

---

## API Review

Here’s a preview of the Users API in Swagger UI:

![Swagger UI](LMS.Api/Assetss/swagger.png.png)

## API Testing

The API is tested using **Swagger UI**.
After running the project, open:

```
https://localhost:{port}/swagger
```

Swagger allows you to:

* Create users
* View users
* Update users
* Delete users

## Database

* Database is created using **Entity Framework Core Migrations**
* SQL Server is used as the database engine
* Migrations are stored in the `Migrations` folder

## How to Run the Project

1. Open the solution in **Visual Studio**
2. Update the connection string in `appsettings.json` if needed
3. Run the following commands in **Package Manager Console**:

```
Add-Migration InitialUsers
Update-Database
```

4. Run the project
5. Open Swagger and test the API

## Database

The SQL Server database schema is included in the [`Database/LMS_DB_Schema.sql`](Database/LMS_DB_SCHEMA.sql) file.  

It contains the following tables:

* Users  
* Courses  
* Lessons  
* Quizzes  
* Questions  
* Answers  
* QuizAttempts  
* LessonCompletion  
* Certificates  
* StudentAnswers  

All **primary keys**, **foreign keys**, and **relationships** are defined in the script.  

### Entity-Relationship Diagram

Here’s a visual representation of the database structure:

![LMS Database ER Diagram](LMS.Api/Assetss/sql.png)





