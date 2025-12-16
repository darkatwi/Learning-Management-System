

```md
# Learning Management System – Users API

This project is a **Backend Web API** built using **ASP.NET Core Web API** and **Entity Framework Core**.  
It implements full **CRUD operations** for the **Users** entity as part of a Learning Management System (LMS).

---

## 📌 Technologies Used

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Swagger (OpenAPI)
- C#

---

## 📂 Project Structure

```

LMS.Api/
│
├── Controllers/        # API Controllers (UsersController)
├── Models/             # Entity Models (User)
├── Data/               # DbContext
├── Migrations/         # EF Core migrations
├── Program.cs          # Application entry point
├── appsettings.json    # Configuration & connection string

```

---

## 🧑‍💻 User Entity

The **User** table contains the following fields:

- `Id` (int)
- `FullName` (string)
- `Email` (string)
- `PasswordHash` (string)
- `Role` (string)
- `CreatedAt` (DateTime)

---

## 🔁 CRUD Operations (REST API)

| Operation | HTTP Method | Endpoint |
|----------|------------|----------|
| Get all users | GET | `/api/Users` |
| Get user by ID | GET | `/api/Users/{id}` |
| Create user | POST | `/api/Users` |
| Update user | PUT | `/api/Users/{id}` |
| Delete user | DELETE | `/api/Users/{id}` |

---

## 🧪 API Testing

The API is fully tested using **Swagger UI**.

After running the project, open:
```

[https://localhost:{port}/swagger](https://localhost:{port}/swagger)

```

Swagger allows:
- Creating users
- Viewing users
- Updating users
- Deleting users

---

## 🗄️ Database

- Database is created using **Entity Framework Core Migrations**
- SQL Server is used as the database engine
- Migrations are stored in the `Migrations` folder

---

## 🚀 How to Run the Project

1. Open the solution in **Visual Studio**
2. Update the connection string in `appsettings.json` if needed
3. Run the following commands in Package Manager Console:
```

Add-Migration InitialUsers
Update-Database

```
4. Run the project
5. Open Swagger and test the API

---

## 📌 Notes

- This project focuses only on the **Users** entity as required
- Authentication and authorization are not implemented
- Passwords are stored as plain text for educational purposes only

---

## 👤 Author

**Zenith**  
Learning Management System – Backend API  
```

---

