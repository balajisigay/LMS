# 📊 LMS Project - System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     LMS APPLICATION STACK                       │
└─────────────────────────────────────────────────────────────────┘

                          FRONTEND LAYER
        ┌──────────────────────────────────────────────────┐
        │                                                  │
        │  React Web App                React Native Mobile
        │  (localhost:3000)             (Expo/Metro)
        │  • Landing Page               • Landing Screen
        │  • Course Detail              • Course Detail
        │  • Admin Dashboard            • Navigation
        │                                                  │
        └──────────────────┬───────────────────────────────┘
                          │
                    HTTP Requests
                    ↓
        ┌──────────────────────────────────────────────────┐
        │                   API LAYER                      │
        │                                                  │
        │  ASP.NET Core 8.0 Web API                       │
        │  (localhost:5000)                               │
        │  ├─ /api/courses       [GET, POST, PUT, DELETE] │
        │  ├─ /api/instructors   [GET, POST, PUT, DELETE] │
        │  └─ /swagger           [API Documentation]      │
        │                                                  │
        │  Features:                                       │
        │  • RESTful endpoints                            │
        │  • Automatic API docs (Swagger)                 │
        │  • Error handling                               │
        │  • CORS enabled                                 │
        │                                                  │
        └──────────────────┬───────────────────────────────┘
                          │
                    Entity Framework
                      ORM Layer
                      ↓
        ┌──────────────────────────────────────────────────┐
        │              DATABASE LAYER                      │
        │                                                  │
        │  MySQL Database (localhost:3306)                │
        │  Database: lmsdb                                │
        │  User: root / Password: Balaji@868              │
        │                                                  │
        │  Tables:                                        │
        │  ├─ Instructors          (4 records)            │
        │  ├─ Courses              (8 records)            │
        │  ├─ CourseSections       (9 records)            │
        │  ├─ CourseLectures       (9 records)            │
        │  ├─ CourseReviews        (7 records)            │
        │  └─ __EFMigrationsHistory                       │
        │                                                  │
        │  Relationships:                                 │
        │  Instructors 1──→ N Courses                    │
        │  Courses 1──→ N CourseSections                 │
        │  CourseSections 1──→ N CourseLectures          │
        │  Courses 1──→ N CourseReviews                  │
        │                                                  │
        └──────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

```
1. USER OPENS WEB APP
   └─> React Component
       └─> courseService.ts (service layer)
           └─> fetch() API call
               └─> ASP.NET Core API
                   └─> Controller Handler
                       └─> Entity Framework ORM
                           └─> MySQL Database Query
                               └─> Return Results
                                   └─> JSON Response
                                       └─> React renders data
```

---

## 📁 Project Structure

```
C:\Users\user\Desktop\LMS\
│
├── LmsApi/                          ← ASP.NET Core Backend
│   ├── Controllers/
│   │   ├── CoursesController.cs     ← CRUD for courses
│   │   └── InstructorsController.cs ← CRUD for instructors
│   │
│   ├── Models/                       ← Domain models
│   │   ├── Course.cs
│   │   ├── Instructor.cs
│   │   ├── CourseSection.cs
│   │   ├── CourseLecture.cs
│   │   └── CourseReview.cs
│   │
│   ├── Data/
│   │   └── LmsDbContext.cs          ← Entity Framework DbContext
│   │
│   ├── DTOs/                        ← Data Transfer Objects
│   │   └── CourseDto.cs
│   │
│   ├── Migrations/
│   │   └── *_InitialCreate.cs       ← Database schema
│   │
│   ├── Program.cs                   ← ASP.NET configuration
│   ├── appsettings.json             ← MySQL connection string
│   └── LmsApi.csproj                ← Project file
│
├── web/                             ← React Web Frontend
│   ├── src/
│   │   ├── services/
│   │   │   └── courseService.ts     ← API calls
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx      ← Course list
│   │   │   ├── CourseDetailPage.tsx ← Course details
│   │   │   └── AdminDashboard.tsx   ← Management UI
│   │   │
│   │   └── App.tsx                  ← Main routing
│   │
│   ├── package.json
│   └── vite.config.js
│
├── src/                             ← React Native Mobile
│   ├── screens/
│   │   ├── LandingScreen.tsx
│   │   └── CourseDetailScreen.tsx
│   │
│   ├── App.tsx
│   └── navigation/
│
└── Documentation/
    ├── SETUP_COMPLETE.md            ← Main setup guide
    ├── DATABASE_SETUP_COMPLETE.md   ← DB summary
    ├── MYSQL_QUICK_START.md         ← 5-min setup
    ├── MYSQL_SETUP.md               ← Detailed guide
    ├── ASPNET_API_SETUP.md          ← API guide
    ├── ASPNET_QUICK_START.md        ← Quick ref
    ├── sample-data.sql              ← Test data
    ├── insert-data-via-api.ps1      ← Data script
    ├── reset-db.ps1                 ← DB reset
    └── SETUP_CHECKLIST.md           ← This file
```

---

## 🚀 Quick Start Commands

```powershell
# TERMINAL 1: Start API
cd "C:\Users\user\Desktop\LMS\LmsApi"
dotnet run
# → API at http://localhost:5000

# TERMINAL 2: Start Web App
cd "C:\Users\user\Desktop\LMS\web"
npm run dev
# → Web at http://localhost:3000

# TERMINAL 3: Test API
curl http://localhost:5000/api/courses
# → Returns JSON array of courses

# BROWSER: View API Documentation
# http://localhost:5000/swagger
# → Interactive API testing interface

# BROWSER: View Admin Dashboard
# http://localhost:3000/admin
# → Course management interface
```

---

## 📊 Data Flow Examples

### Example 1: Get All Courses

```
User Click "Browse Courses"
        ↓
React Component (LandingPage.tsx)
        ↓
Call courseService.getAllCourses()
        ↓
fetch("http://localhost:5000/api/courses")
        ↓
ASP.NET Core API
        ↓
CoursesController.GetCourses()
        ↓
Entity Framework Query: dbContext.Courses.ToListAsync()
        ↓
MySQL: SELECT * FROM Courses
        ↓
8 course records with instructor, sections, reviews
        ↓
JSON Response
        ↓
React renders course cards
```

### Example 2: Create New Course

```
Admin clicks "Add Course"
        ↓
Fill form and click "Save"
        ↓
Call courseService.createCourse(courseData)
        ↓
POST http://localhost:5000/api/courses
        ↓
CoursesController.PostCourse(courseDto)
        ↓
dbContext.Courses.Add(course)
dbContext.SaveChangesAsync()
        ↓
MySQL: INSERT INTO Courses VALUES (...)
        ↓
New course record created in database
        ↓
Success response with new course ID
        ↓
Admin dashboard refreshes and shows new course
```

### Example 3: Get Course Details

```
User clicks on "Python Course"
        ↓
URL changes: /course/1
        ↓
CourseDetailPage loads with courseId = 1
        ↓
Call courseService.getCourseById(1)
        ↓
GET http://localhost:5000/api/courses/1
        ↓
CoursesController.GetCourse(1)
        ↓
dbContext.Courses.Include(...).FirstOrDefault(c => c.Id == 1)
        ↓
MySQL: SELECT * FROM Courses WHERE Id = 1
        Joins with Instructors, Sections, Lectures, Reviews
        ↓
Complete course object with all relations
        ↓
JSON Response with:
- Course info
- Instructor details
- All sections and lectures
- All reviews
        ↓
React displays full course page
```

---

## 🔌 API Endpoints Quick Reference

```
COURSES ENDPOINTS
─────────────────────────────────────────────────
GET  /api/courses
     Returns: Array of all courses
     Example: http://localhost:5000/api/courses

GET  /api/courses/{id}
     Returns: Single course with all relations
     Example: http://localhost:5000/api/courses/1

GET  /api/courses/category/{category}
     Returns: Courses filtered by category
     Example: http://localhost:5000/api/courses/category/Development

POST /api/courses
     Body: CourseCreateDto
     Returns: Created course with ID

PUT  /api/courses/{id}
     Body: CourseUpdateDto
     Returns: Updated course

DELETE /api/courses/{id}
     Returns: 204 No Content


INSTRUCTORS ENDPOINTS
─────────────────────────────────────────────────
GET  /api/instructors
     Returns: Array of all instructors

GET  /api/instructors/{id}
     Returns: Single instructor details

POST /api/instructors
     Body: InstructorCreateDto
     Returns: Created instructor

PUT  /api/instructors/{id}
     Body: InstructorUpdateDto
     Returns: Updated instructor

DELETE /api/instructors/{id}
     Returns: 204 No Content
```

---

## 💾 Database Schema

```
INSTRUCTORS
───────────────────────────────
Id          INT PRIMARY KEY AUTO_INCREMENT
Name        VARCHAR(255) NOT NULL
Title       VARCHAR(255) NOT NULL
Rating      DOUBLE NOT NULL
Students    INT NOT NULL
Courses     INT NOT NULL
Bio         LONGTEXT NOT NULL
ImageUrl    LONGTEXT NOT NULL
CreatedAt   DATETIME NOT NULL


COURSES
───────────────────────────────
Id              INT PRIMARY KEY AUTO_INCREMENT
Title           VARCHAR(255) NOT NULL
Description     LONGTEXT NOT NULL
Category        VARCHAR(100) NOT NULL
Subcategory     VARCHAR(100) NOT NULL
Price           DECIMAL(10,2) NOT NULL
OriginalPrice   DECIMAL(10,2) NOT NULL
Discount        INT NOT NULL
Badge           VARCHAR(50) NOT NULL
Rating          DOUBLE NOT NULL
ReviewCount     INT NOT NULL
StudentCount    INT NOT NULL
InstructorId    INT FOREIGN KEY → Instructors
ImageUrl        LONGTEXT NOT NULL
WhatYouLearn    LONGTEXT NOT NULL (semicolon-separated)
Includes        LONGTEXT NOT NULL (semicolon-separated)
Companies       LONGTEXT NOT NULL (semicolon-separated)
CreatedAt       DATETIME NOT NULL
UpdatedAt       DATETIME NOT NULL


COURSESECTIONS
───────────────────────────────
Id          INT PRIMARY KEY AUTO_INCREMENT
CourseId    INT FOREIGN KEY → Courses (CASCADE)
Day         VARCHAR(50) NOT NULL
Title       VARCHAR(255) NOT NULL
Duration    VARCHAR(50) NOT NULL


COURSELECTURES
───────────────────────────────
Id          INT PRIMARY KEY AUTO_INCREMENT
SectionId   INT FOREIGN KEY → CourseSections (CASCADE)
Title       VARCHAR(255) NOT NULL
Duration    VARCHAR(50) NOT NULL
VideoUrl    LONGTEXT NULLABLE


COURSEREVIEWS
───────────────────────────────
Id          INT PRIMARY KEY AUTO_INCREMENT
CourseId    INT FOREIGN KEY → Courses (CASCADE)
Name        VARCHAR(255) NOT NULL
Rating      INT NOT NULL
Time        VARCHAR(100) NOT NULL
Text        LONGTEXT NOT NULL
```

---

## 🎯 Current Sample Data

```
INSTRUCTORS (4 total)
───────────────────────────────────
1. Sarah Johnson
   - Title: Python Expert
   - Rating: 4.8★
   - Students: 15,420
   - Courses: 5

2. Mike Chen
   - Title: Full Stack Developer
   - Rating: 4.9★
   - Students: 18,500
   - Courses: 6

3. Emma Davis
   - Title: Data Science Pro
   - Rating: 4.7★
   - Students: 12,300
   - Courses: 4

4. John Wilson
   - Title: Web Development
   - Rating: 4.6★
   - Students: 9,800
   - Courses: 3


COURSES (8 total)
───────────────────────────────────
1. Complete Python Programming ($19.99, 80% off)
   - Sections: 3 | Lectures: 6 | Reviews: 3

2. React for Beginners ($29.99, 80% off)
   - Sections: 3 | Lectures: 3 | Reviews: 2

3. Data Science Masterclass ($39.99, 80% off)
   - Sections: 3 | Lectures: 0 | Reviews: 2

4. JavaScript Advanced ($24.99, 81% off)
   - Sections: 0 | Lectures: 0 | Reviews: 0

5. Web Design Fundamentals ($14.99, 81% off)
   - Sections: 0 | Lectures: 0 | Reviews: 0

[+ 3 more duplicate courses from test inserts]
```

---

## ✅ Verification Checklist

Run these commands to verify everything is working:

```powershell
# 1. Verify MySQL is running
Get-Service MySQL80 | Select-Object Status

# 2. Connect to MySQL
mysql -u root -p -h localhost
# Then: USE lmsdb; SHOW TABLES;

# 3. Start API server
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
# Should see: "Now listening on http://localhost:5000"

# 4. Test API in new terminal
curl http://localhost:5000/api/courses
# Should return JSON array

# 5. Open Swagger UI
Start-Process "http://localhost:5000/swagger"
# Should display interactive API documentation

# 6. Start React app
cd C:\Users\user\Desktop\LMS\web
npm run dev
# Should see: "Local: http://localhost:3000"

# 7. Open admin dashboard
Start-Process "http://localhost:3000/admin"
# Should display course management interface
```

---

## 🎓 Learning Path

```
1. START HERE
   └─> Read: SETUP_COMPLETE.md
       └─> Understand: Full system overview

2. RUN THE API
   └─> cd LmsApi
       dotnet run
       └─> Open: http://localhost:5000/swagger
           └─> Explore: API endpoints

3. TEST WITH DATA
   └─> Try GET /api/courses
       └─> Try POST /api/courses (create new)
           └─> Understand: Data flow

4. INTEGRATE FRONTEND
   └─> Open: web/src/pages/LandingPage.tsx
       └─> Call: courseService.getAllCourses()
           └─> Render: Courses on page

5. BUILD ADMIN
   └─> Open: web/src/pages/AdminDashboard.tsx
       └─> Implement: Create/Update/Delete
           └─> Connect: Full CRUD workflow

6. DEPLOY
   └─> Move to: Production environment
       └─> Setup: HTTPS, Auth, Monitoring
           └─> Go Live!
```

---

## 📞 Support Resources

- **API Documentation**: http://localhost:5000/swagger
- **MySQL Docs**: https://dev.mysql.com/doc/
- **ASP.NET Core**: https://docs.microsoft.com/dotnet/core/
- **Entity Framework**: https://docs.microsoft.com/ef/
- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## 🎉 You're All Set!

Your LMS backend is ready for development. Start the API, explore the Swagger documentation, and begin building your frontend!

**Happy coding! 🚀**
