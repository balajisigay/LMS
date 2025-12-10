# ASP.NET Core API Setup Guide

## Overview

This LMS now uses an **ASP.NET Core 8.0 Web API** backend instead of Firebase, providing:

- **SQL Server Database** for reliable data storage
- **Entity Framework Core** for database operations
- **RESTful API endpoints** for all course operations
- **Swagger/OpenAPI** documentation
- **Full CRUD operations** for courses and instructors

## Project Structure

```
LMS/
├── LmsApi/                          # ASP.NET Core API Project
│   ├── Controllers/
│   │   ├── CoursesController.cs    # Course API endpoints
│   │   └── InstructorsController.cs # Instructor API endpoints
│   ├── Models/
│   │   └── Course.cs               # Database models
│   ├── Data/
│   │   └── LmsDbContext.cs         # Entity Framework DbContext
│   ├── DTOs/
│   │   └── CourseDto.cs            # Data transfer objects
│   ├── Program.cs                   # Application setup
│   ├── appsettings.json            # Configuration
│   └── LmsApi.csproj               # Project file
├── web/                             # React Web App
│   └── src/
│       ├── pages/
│       │   └── AdminDashboard.tsx  # Uses API
│       └── services/
│           └── courseService.ts    # API client
└── src/                             # React Native
    └── services/
        └── courseService.ts        # API client
```

## Prerequisites

- **.NET 8 SDK** - Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
- **SQL Server Express** or **LocalDB** - [Download SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-express)
- **Visual Studio** or **VS Code** with C# extension

## Step 1: Check .NET Installation

Open PowerShell and verify .NET is installed:

```powershell
dotnet --version
```

Should show version 8.0.x or higher.

## Step 2: Create ASP.NET Core Project (Already Done)

The project files are already created in `LmsApi/` folder.

## Step 3: Set Up Database Connection

Edit `LmsApi/appsettings.json` and update the connection string:

### Option A: SQL Server Express (Windows)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=LmsDb;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### Option B: LocalDB (Windows)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LmsDb;Trusted_Connection=true;"
  }
}
```

### Option C: PostgreSQL

First install package:

```bash
cd LmsApi
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

Then update `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=lmsdb;Username=postgres;Password=your_password"
  }
}
```

And update `Program.cs`:

```csharp
builder.Services.AddDbContext<LmsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Step 4: Install Dependencies

Navigate to the API project and install packages:

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet restore
```

## Step 5: Create Database with Entity Framework

Run migrations to create the database:

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi

# Create initial migration
dotnet ef migrations add InitialCreate

# Apply migration to database
dotnet ef database update
```

If you get migration errors, delete the `Migrations` folder and try again:

```powershell
Remove-Item -Recurse -Force Migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Step 6: Run the ASP.NET API

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
```

The API should start at:

- **HTTPS**: https://localhost:7001/
- **HTTP**: http://localhost:5000/

Swagger UI available at: https://localhost:7001/swagger

## Step 7: Configure React Apps

### For Web React App

Create or update `.env.local` in the `web/` folder:

```
REACT_APP_API_URL=https://localhost:7001/api
```

Or for development:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Start the Web App

```bash
cd web
npm run dev
```

Visit: http://localhost:3000/admin

## API Endpoints

### Courses

| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| GET    | `/api/courses`                     | Get all courses         |
| GET    | `/api/courses/{id}`                | Get course by ID        |
| GET    | `/api/courses/category/{category}` | Get courses by category |
| POST   | `/api/courses`                     | Create new course       |
| PUT    | `/api/courses/{id}`                | Update course           |
| DELETE | `/api/courses/{id}`                | Delete course           |

### Instructors

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/instructors`      | Get all instructors   |
| GET    | `/api/instructors/{id}` | Get instructor by ID  |
| POST   | `/api/instructors`      | Create new instructor |
| PUT    | `/api/instructors/{id}` | Update instructor     |
| DELETE | `/api/instructors/{id}` | Delete instructor     |

## Example Requests

### Create a Course

```bash
curl -X POST "https://localhost:7001/api/courses" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Bootcamp",
    "description": "Learn Python",
    "category": "Development",
    "subcategory": "Python",
    "price": 19.99,
    "originalPrice": 99.99,
    "badge": "BESTSELLER",
    "instructorId": 1,
    "imageUrl": "https://example.com/image.jpg",
    "whatYouLearn": ["Learn Python", "Build projects"],
    "includes": ["50 hours video", "10 exercises"]
  }'
```

### Get All Courses

```bash
curl "https://localhost:7001/api/courses"
```

### Update Course

```bash
curl -X PUT "https://localhost:7001/api/courses/1" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

## Database Schema

### Courses Table

- `Id` (int, PK)
- `Title` (string)
- `Description` (text)
- `Category` (string)
- `Subcategory` (string)
- `Price` (decimal)
- `OriginalPrice` (decimal)
- `Discount` (int)
- `Badge` (string)
- `Rating` (double)
- `ReviewCount` (int)
- `StudentCount` (int)
- `InstructorId` (int, FK)
- `ImageUrl` (string)
- `WhatYouLearn` (string) - semicolon separated
- `Includes` (string) - semicolon separated
- `Companies` (string) - semicolon separated
- `CreatedAt` (datetime)
- `UpdatedAt` (datetime)

### Instructors Table

- `Id` (int, PK)
- `Name` (string)
- `Title` (string)
- `Rating` (double)
- `Students` (int)
- `Courses` (int)
- `Bio` (text)
- `ImageUrl` (string)
- `CreatedAt` (datetime)

## Troubleshooting

### Connection String Error

```
Message=Server does not exist or access denied
```

**Solution:**

- Ensure SQL Server is running
- Use correct server name: `.` for Express, `(localdb)\mssqllocaldb` for LocalDB
- Add `TrustServerCertificate=true;` for LocalDB

### Migration Fails

```
The entity type 'Course' requires a primary key to be defined
```

**Solution:**

- Ensure models have `Id` property
- Delete `Migrations` folder
- Run `dotnet ef migrations add InitialCreate` again

### API Returns 500 Error

- Check server logs for error details
- Verify database connection string
- Ensure database was created with migrations

### CORS Errors in React

The API is configured to allow cross-origin requests:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApps",
        builder =>
        {
            builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
```

For production, restrict to specific origins:

```csharp
.WithOrigins("https://yourdomain.com")
```

## Running Both Frontend and Backend

### Terminal 1 - Start API

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
```

### Terminal 2 - Start Web App

```bash
cd C:\Users\user\Desktop\LMS\web
npm run dev
```

### Terminal 3 - Start Mobile (Optional)

```bash
cd C:\Users\user\Desktop\LMS
npm start
```

## Next Steps

1. ✅ **API Running** - Test with Swagger UI
2. ✅ **Database Created** - View in SQL Server Management Studio
3. **Create Admin User** - Implement authentication
4. **Upload Files** - Add file upload for course images
5. **Seed Data** - Add sample courses to database
6. **Deploy** - Host API on Azure, AWS, or Heroku
7. **Mobile Integration** - Update React Native to use API

## Performance Optimization

### Enable Database Query Optimization

```csharp
// In Program.cs
builder.Services.AddDbContext<LmsDbContext>(options =>
    options
        .UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        .EnableSensitiveDataLogging(false)
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
```

### Add Caching

```csharp
builder.Services.AddResponseCaching();

app.UseResponseCaching();
```

### Add Async/Await (Already Implemented)

All database operations use async/await for better performance.

## Security Checklist

- [ ] Remove `TrustServerCertificate=true` in production
- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Validate user input
- [ ] Use HTTPS only
- [ ] Add API key authentication
- [ ] Implement role-based access control (RBAC)

---

For questions, see the ASP.NET documentation: https://learn.microsoft.com/en-us/aspnet/core/
