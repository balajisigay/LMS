# ASP.NET API Quick Start

## TL;DR - Get Running in 5 Minutes

### 1. Install .NET 8 SDK

[Download from dotnet.microsoft.com](https://dotnet.microsoft.com/download)

### 2. Install SQL Server Express

[Download from microsoft.com](https://www.microsoft.com/en-us/sql-server/sql-server-express)

### 3. Create Database

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 4. Run API

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
```

API runs at: **https://localhost:7001/**

Swagger UI: **https://localhost:7001/swagger**

### 5. Run Web Admin

```bash
cd C:\Users\user\Desktop\LMS\web
npm run dev
```

Web runs at: **http://localhost:3000/**

Admin Dashboard: **http://localhost:3000/admin**

## Database Setup Options

### Windows LocalDB (Easiest)

```json
// appsettings.json
"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LmsDb;Trusted_Connection=true;"
```

### SQL Server Express

```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=LmsDb;Trusted_Connection=true;TrustServerCertificate=true;"
```

### PostgreSQL

```json
"DefaultConnection": "Host=localhost;Database=lmsdb;Username=postgres;Password=yourpassword"
```

Then add package:

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

## Common Commands

```bash
# Install dependencies
dotnet restore

# Create migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Drop database
dotnet ef database drop

# Start development server
dotnet run

# Run in release mode
dotnet run --configuration Release

# View database in SSMS
# Server: (localdb)\mssqllocaldb
# Database: LmsDb
```

## API Examples

### Create Course

```bash
POST https://localhost:7001/api/courses
Content-Type: application/json

{
  "title": "Python Bootcamp",
  "description": "Learn Python",
  "category": "Development",
  "subcategory": "Python",
  "price": 19.99,
  "originalPrice": 99.99,
  "badge": "BESTSELLER",
  "instructorId": 1,
  "imageUrl": "https://example.com/img.jpg",
  "whatYouLearn": ["Python basics", "OOP"],
  "includes": ["50 hours video", "10 exercises"]
}
```

### Get All Courses

```bash
GET https://localhost:7001/api/courses
```

### Get Single Course

```bash
GET https://localhost:7001/api/courses/1
```

### Update Course

```bash
PUT https://localhost:7001/api/courses/1
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 29.99
}
```

### Delete Course

```bash
DELETE https://localhost:7001/api/courses/1
```

## File Locations

```
LmsApi/
├── Controllers/
│   ├── CoursesController.cs
│   └── InstructorsController.cs
├── Models/
│   └── Course.cs
├── Data/
│   └── LmsDbContext.cs
├── DTOs/
│   └── CourseDto.cs
├── appsettings.json
├── Program.cs
└── LmsApi.csproj
```

## Troubleshooting

| Problem                                 | Solution                                             |
| --------------------------------------- | ---------------------------------------------------- |
| `Microsoft.Data.SqlClient.SqlException` | Check connection string, ensure SQL Server running   |
| `Migrations` folder not found           | Run: `dotnet ef migrations add InitialCreate`        |
| CORS errors                             | API allows all origins - check your API_URL in React |
| Port 7001 already in use                | Change port in `launchSettings.json`                 |
| Database doesn't exist                  | Run: `dotnet ef database update`                     |

## Environment Variables

Create `.env.local` in `web/` folder:

```
REACT_APP_API_URL=https://localhost:7001/api
```

Or for HTTP:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running Everything

### Terminal 1

```powershell
cd LmsApi
dotnet run
```

### Terminal 2

```bash
cd web
npm run dev
```

### Terminal 3 (Optional - Mobile)

```bash
cd .
npm start
```

Then:

- Web: http://localhost:3000
- API: https://localhost:7001
- Mobile: Emulator/Device

## Learn More

- [ASP.NET Core Docs](https://learn.microsoft.com/aspnet/core)
- [Entity Framework Docs](https://learn.microsoft.com/ef/core)
- [.NET API Design Guide](https://github.com/microsoft/api-guidelines)

---

**Need help?** Check `ASPNET_API_SETUP.md` for detailed guide.
