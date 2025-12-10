# 🚀 START HERE - LMS Setup Complete!

## ✅ Everything is Ready!

Your LMS backend with MySQL database and ASP.NET Core API is **fully configured and tested**.

---

## ⚡ Get Running in 30 Seconds

### Step 1: Open PowerShell Terminal and Run API

```powershell
cd "C:\Users\user\Desktop\LMS\LmsApi"
dotnet run
```

✅ Wait for output: `"Now listening on http://localhost:5000"`

### Step 2: Open Browser and Test

```
http://localhost:5000/swagger
```

✅ You should see interactive API documentation with 10+ endpoints

### Step 3: Try GET All Courses

In Swagger UI or PowerShell:

```powershell
curl http://localhost:5000/api/courses
```

✅ You should see 8 courses with all details

---

## 📊 What You Have

| Component          | Status    | Location                      |
| ------------------ | --------- | ----------------------------- |
| **MySQL Database** | ✅ Ready  | localhost:3306                |
| **Database Name**  | `lmsdb`   | -                             |
| **API Server**     | ✅ Ready  | http://localhost:5000         |
| **API Docs**       | ✅ Ready  | http://localhost:5000/swagger |
| **Sample Data**    | ✅ Loaded | 4 instructors, 8 courses      |
| **Web Frontend**   | ✅ Ready  | C:\Users\user\Desktop\LMS\web |

---

## 🎯 5-Minute Setup

### Terminal 1: Start API

```powershell
cd "C:\Users\user\Desktop\LMS\LmsApi"
dotnet run
# → Listen on http://localhost:5000
```

### Browser: Test API

```
Open: http://localhost:5000/swagger
Try any endpoint!
```

### Terminal 2: Start Web App (Optional)

```bash
cd "C:\Users\user\Desktop\LMS\web"
npm run dev
# → Open http://localhost:3000
```

**Done! Your LMS is running!**

---

## 🔑 Database Credentials

```
Host:     localhost
Port:     3306
Username: root
Password: Balaji@868
Database: lmsdb
```

---

## 🌐 Important URLs

| What                | Where                         |
| ------------------- | ----------------------------- |
| **API**             | http://localhost:5000         |
| **API Swagger**     | http://localhost:5000/swagger |
| **Web App**         | http://localhost:3000         |
| **Admin Dashboard** | http://localhost:3000/admin   |
| **Database**        | localhost:3306 (MySQL)        |

---

## 📚 API Endpoints (Quick Reference)

### Courses

```
GET    /api/courses              → All courses
GET    /api/courses/1            → Course by ID
POST   /api/courses              → Create course
PUT    /api/courses/1            → Update course
DELETE /api/courses/1            → Delete course
```

### Instructors

```
GET    /api/instructors          → All instructors
GET    /api/instructors/1        → Instructor by ID
POST   /api/instructors          → Create instructor
PUT    /api/instructors/1        → Update instructor
DELETE /api/instructors/1        → Delete instructor
```

---

## 🧪 Test the API Right Now

### Using Swagger UI (Easiest)

1. Start API: `dotnet run`
2. Open: `http://localhost:5000/swagger`
3. Click "Try it out" on any endpoint
4. Click "Execute"

### Using PowerShell

```powershell
# Get all courses
curl http://localhost:5000/api/courses

# Get specific course
curl http://localhost:5000/api/courses/1

# Get instructors
curl http://localhost:5000/api/instructors
```

### Using Browser

Just open: `http://localhost:5000/api/courses`

---

## 📊 Sample Data Available

### Instructors (4)

- Sarah Johnson (Python Expert, 4.8★)
- Mike Chen (Full Stack, 4.9★)
- Emma Davis (Data Science, 4.7★)
- John Wilson (Web Dev, 4.6★)

### Courses (8)

- Complete Python Programming
- React for Beginners
- Data Science Masterclass
- JavaScript Advanced
- Web Design Fundamentals
- - 3 more test courses

### Each Course Includes

- Sections with lectures
- Customer reviews
- Learning outcomes
- Required skills
- Partner companies

---

## 🚀 Next Steps

### Option A: Just Test It

1. Run API: `dotnet run`
2. Open Swagger: `http://localhost:5000/swagger`
3. Click around and test endpoints
4. Done! ✅

### Option B: Integrate with Frontend

1. Run API: `dotnet run`
2. Start Web: `npm run dev` (in web folder)
3. Open: `http://localhost:3000/admin`
4. Update React components to use API
5. Build your features

### Option C: Add More Data

```powershell
# Database still running in Terminal 1?
# Then in Terminal 2:

# Insert test instructor
@'
USE lmsdb;
INSERT INTO Instructors VALUES (...);
SELECT * FROM Courses;
'@ | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p"Balaji@868" -h localhost
```

---

## 💡 Pro Tips

### View API Logs

The console where you ran `dotnet run` shows all API activity:

```
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (5ms) [Parameters=[], CommandType='Text']
      SELECT * FROM `Courses`
```

### Test Create Operation

```powershell
$course = @{
    title = "My New Course"
    description = "Test course"
    category = "Development"
    subcategory = "Testing"
    price = 9.99
    originalPrice = 99.99
    instructorId = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/courses" `
  -Method POST `
  -Body $course `
  -ContentType "application/json"
```

### View Database

```powershell
mysql -u root -p -h localhost
# Enter password: Balaji@868
# Then:
USE lmsdb;
SHOW TABLES;
SELECT * FROM Courses;
DESCRIBE Courses;
```

---

## ❓ Common Questions

### Q: Is MySQL running?

A: Run this command:

```powershell
Get-Service MySQL80
```

Should show: `Status : Running`

### Q: API won't start?

A: Check if MySQL is running:

```powershell
Get-Service MySQL80 | Start-Service
```

### Q: How do I see the database?

A: Use MySQL Workbench or command line:

```powershell
mysql -u root -p -h localhost
```

### Q: Where's the React app?

A: In folder: `C:\Users\user\Desktop\LMS\web`
Start it:

```bash
cd web
npm run dev
```

### Q: How do I add more courses?

A: Use Swagger UI to POST to `/api/courses`

---

## 📁 Important Folders

```
C:\Users\user\Desktop\LMS\
├── LmsApi\               ← Run this: dotnet run
├── web\                  ← Run this: npm run dev
├── src\                  ← React Native app
└── Documentation files
```

---

## ⚙️ Technology Stack

- **Backend**: ASP.NET Core 8.0
- **Database**: MySQL 8.0
- **ORM**: Entity Framework Core
- **Frontend**: React 19.0.0 (TypeScript)

---

## 🎓 Learning Resources

- **Swagger UI**: `http://localhost:5000/swagger` (Built-in docs)
- **API Setup**: Read `SETUP_COMPLETE.md`
- **Database Info**: Read `DATABASE_SETUP_COMPLETE.md`
- **System Overview**: Read `SYSTEM_OVERVIEW.md`

---

## ✨ Key Files

| File                                      | Purpose             |
| ----------------------------------------- | ------------------- |
| `LmsApi/Program.cs`                       | API configuration   |
| `LmsApi/appsettings.json`                 | Database connection |
| `LmsApi/Controllers/CoursesController.cs` | API endpoints       |
| `web/src/services/courseService.ts`       | Frontend API calls  |
| `web/src/pages/AdminDashboard.tsx`        | Admin UI            |

---

## 🎯 Common Tasks

### See All Endpoints

```
http://localhost:5000/swagger
```

### Test Specific Endpoint

```powershell
curl http://localhost:5000/api/courses/1
```

### Create a Course

Use Swagger UI → POST /api/courses → Try it out

### Update Course

Use Swagger UI → PUT /api/courses/{id} → Try it out

### Delete Course

Use Swagger UI → DELETE /api/courses/{id} → Try it out

---

## 📞 Troubleshooting

| Problem                | Solution                                   |
| ---------------------- | ------------------------------------------ |
| Port 5000 in use       | Kill process or change port                |
| MySQL connection error | Run `Get-Service MySQL80 \| Start-Service` |
| No tables in database  | Migrations already applied ✅              |
| API returns 500 error  | Check MySQL connection                     |
| CORS error             | Already configured ✅                      |

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just:

1. **Run**: `cd LmsApi && dotnet run`
2. **Test**: Open `http://localhost:5000/swagger`
3. **Build**: Update React components to use the API
4. **Deploy**: When ready for production

---

## 📞 Need Help?

1. **Check Swagger**: `http://localhost:5000/swagger`
2. **Read Docs**: Open any `.md` file in project root
3. **Check Logs**: Look at console output from `dotnet run`
4. **Verify DB**: `mysql -u root -p -h localhost`

---

**🚀 Start the API and let's build something amazing! 🚀**

```powershell
cd "C:\Users\user\Desktop\LMS\LmsApi"
dotnet run
```

Then open: **http://localhost:5000/swagger**

Enjoy! 🎓
