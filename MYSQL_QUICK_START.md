# 🚀 LMS with MySQL - Complete Setup

## Your MySQL Credentials

```
Host: localhost
Port: 3306
Username: root
Password: Balaji@868
Database: lmsdb
```

## ✅ Quick Setup (5 Minutes)

### 1️⃣ Ensure MySQL is Running

Windows:

```powershell
# Check if MySQL is running
Get-Service -Name MySQL80 | Start-Service

# Or verify connection
mysql -u root -p
# Enter password: Balaji@868
# Type: exit
```

### 2️⃣ Run Setup Script

```powershell
cd C:\Users\user\Desktop\LMS
.\setup-mysql.ps1
```

This will:

- ✅ Restore .NET dependencies
- ✅ Create database migrations
- ✅ Create all tables in MySQL
- ✅ Verify connection

### 3️⃣ Start the API

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
```

API starts at: **https://localhost:7001/**

### 4️⃣ Test the API

Open browser: **https://localhost:7001/swagger**

You should see all API endpoints documented.

### 5️⃣ Start React Web App

```bash
cd C:\Users\user\Desktop\LMS\web
npm run dev
```

Access: **http://localhost:3000/admin**

---

## 📊 Database Tables Created

Automatically created by Entity Framework:

```
lmsdb/
├── Instructors          # Teacher information
├── Courses              # Course details
├── CourseSections       # Course sections (Day 1, Day 2, etc.)
├── CourseLectures       # Individual lectures
└── CourseReviews        # Student reviews
```

---

## 🔌 API Endpoints

### Courses

```
GET    /api/courses              - Get all courses
GET    /api/courses/{id}         - Get course by ID
GET    /api/courses/category/{cat} - Get by category
POST   /api/courses              - Create course
PUT    /api/courses/{id}         - Update course
DELETE /api/courses/{id}         - Delete course
```

### Instructors

```
GET    /api/instructors          - Get all instructors
GET    /api/instructors/{id}     - Get instructor
POST   /api/instructors          - Create instructor
PUT    /api/instructors/{id}     - Update instructor
DELETE /api/instructors/{id}     - Delete instructor
```

---

## 📝 Example: Create a Course

```bash
curl -X POST "https://localhost:7001/api/courses" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Bootcamp",
    "description": "Learn Python programming",
    "category": "Development",
    "subcategory": "Python",
    "price": 19.99,
    "originalPrice": 99.99,
    "badge": "BESTSELLER",
    "instructorId": 1,
    "imageUrl": "https://example.com/image.jpg",
    "whatYouLearn": ["Python basics", "OOP"],
    "includes": ["50 hours video", "10 exercises"]
  }'
```

---

## 🔄 Full Stack Commands

### Terminal 1 - Start API

```powershell
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
# Output: Now listening on https://localhost:7001
```

### Terminal 2 - Start Web

```bash
cd C:\Users\user\Desktop\LMS\web
npm run dev
# Output: Local: http://localhost:3000
```

### Terminal 3 - Verify MySQL

```bash
mysql -u root -p -h localhost lmsdb
# Enter password: Balaji@868
# View tables: SHOW TABLES;
# View courses: SELECT * FROM Courses;
```

---

## 🐛 Troubleshooting

| Problem                | Solution                                  |
| ---------------------- | ----------------------------------------- |
| MySQL connection error | Ensure MySQL running: `net start MySQL80` |
| Password incorrect     | Default: `Balaji@868`                     |
| Port 7001 in use       | Change in `launchSettings.json`           |
| Tables not created     | Run: `dotnet ef database update`          |
| API returns 500 error  | Check Swagger error details at /swagger   |

---

## 📚 Detailed Guides

- **MYSQL_SETUP.md** - Complete MySQL setup guide
- **ASPNET_API_SETUP.md** - API architecture details
- **ASPNET_QUICK_START.md** - Quick reference

---

## 🎯 What's Configured

✅ **ASP.NET Core 8.0** - Modern, fast API framework  
✅ **Entity Framework Core** - ORM for database operations  
✅ **MySQL Database** - Reliable relational database  
✅ **REST API** - RESTful endpoints for all operations  
✅ **Swagger/OpenAPI** - Auto-generated API documentation  
✅ **CORS Enabled** - React apps can communicate  
✅ **Async/Await** - Non-blocking operations  
✅ **Error Handling** - Comprehensive error responses

---

## 🏃 Getting Started Right Now

```powershell
# 1. Setup database
.\setup-mysql.ps1

# 2. Start API (Terminal 1)
cd LmsApi && dotnet run

# 3. Start Web (Terminal 2)
cd ..\web && npm run dev

# 4. Access admin
# Open: http://localhost:3000/admin
```

Done! Your LMS is running with MySQL! 🎉

---

**Need Help?** Check the comprehensive guides or review API docs at `https://localhost:7001/swagger`
