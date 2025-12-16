

# Learning Management System – Users API

This project is a **Backend Web API** built with **ASP.NET Core Web API** and **Entity Framework Core**.
It provides full **CRUD operations** for the **Users** entity within a Learning Management System (LMS).

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

## User Entity

The **User** table contains the following fields:

* `Id` (int)
* `FullName` (string)
* `Email` (string)
* `PasswordHash` (string)
* `Role` (string)
* `CreatedAt` (DateTime)

## CRUD Operations (REST API)

| Operation      | HTTP Method | Endpoint          |
| -------------- | ----------- | ----------------- |
| Get all users  | GET         | `/api/Users`      |
| Get user by ID | GET         | `/api/Users/{id}` |
| Create user    | POST        | `/api/Users`      |
| Update user    | PUT         | `/api/Users/{id}` |
| Delete user    | DELETE      | `/api/Users/{id}` |

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

The SQL Server database schema is included in the [`Database/LMS_DB_Schema.sql`](Database/LMS_DB_Schema.sql) file.  

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


## Notes

* This project focuses only on the **Users** entity
* Authentication and authorization are **not implemented**
* Passwords are stored as plain text **for educational purposes only**

## Author

**Zenith**
Learning Management System – Backend API

