# MySQL Setup Guide for LMS API

## Database Credentials

- **Host**: localhost
- **Port**: 3306
- **Username**: root
- **Password**: Balaji@868
- **Database**: lmsdb

## Prerequisites

Ensure MySQL Server is installed and running.

### Windows Installation

1. **Download MySQL Community Server**

   - Visit [mysql.com/downloads](https://dev.mysql.com/downloads/mysql/)
   - Download MySQL 8.0.x for Windows

2. **Install MySQL**

   - Run installer
   - Choose setup type: "Development Default"
   - Configure MySQL Server as Windows Service
   - Port: 3306
   - Root password: `Balaji@868`

3. **Verify Installation**
   ```bash
   mysql --version
   mysql -u root -p
   # Enter password: Balaji@868
   ```

## Step 1: Restore Dependencies

```bash
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet restore
```

This will install the Pomelo MySQL provider.

## Step 2: Create Database and Tables

Run Entity Framework migrations to create the database:

```bash
cd C:\Users\user\Desktop\LMS\LmsApi

# Create migration (if needed)
dotnet ef migrations add InitialCreate

# Apply migration to MySQL
dotnet ef database update
```

This will:

- Create `lmsdb` database
- Create all required tables
- Set up relationships

## Step 3: Verify Tables in MySQL

Connect to MySQL and verify tables were created:

```bash
mysql -u root -p
# Enter password: Balaji@868

USE lmsdb;
SHOW TABLES;
```

You should see:

- `Courses`
- `Instructors`
- `CourseSections`
- `CourseLectures`
- `CourseReviews`

## Step 4: Run the API

```bash
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
```

The API will start at:

- **HTTPS**: https://localhost:7001/
- **HTTP**: http://localhost:5000/

## Verify API is Connected to MySQL

1. Open Swagger UI: https://localhost:7001/swagger
2. Try GET /api/courses endpoint
3. Should return empty array `[]` initially

## Insert Sample Data

### Using MySQL Workbench

1. Open MySQL Workbench
2. Connect with:
   - Host: localhost
   - Username: root
   - Password: Balaji@868
3. Select `lmsdb` database
4. Run SQL:

```sql
USE lmsdb;

-- Insert Instructor
INSERT INTO Instructors (Name, Title, Rating, Students, Courses, Bio, ImageUrl, CreatedAt)
VALUES (
  'Dr. Angela Yu',
  'Developer and Lead Instructor',
  4.7,
  2214000,
  7,
  'I\'m Angela. I\'m a developer with a passion for teaching.',
  'https://via.placeholder.com/150',
  NOW()
);

-- Get the instructor ID
SELECT LAST_INSERT_ID() as InstructorId;
-- Note the ID (usually 1)

-- Insert Course
INSERT INTO Courses (
  Title,
  Description,
  Category,
  Subcategory,
  Price,
  OriginalPrice,
  Discount,
  Badge,
  Rating,
  ReviewCount,
  StudentCount,
  InstructorId,
  ImageUrl,
  WhatYouLearn,
  Includes,
  Companies,
  CreatedAt,
  UpdatedAt
)
VALUES (
  '2024 Complete Python Bootcamp: From Zero to Hero in Python',
  'Master Python by building 100 projects in 100 days.',
  'Development',
  'Python',
  14.99,
  84.99,
  82,
  'BESTSELLER',
  4.8,
  984252,
  453763,
  1,
  'https://via.placeholder.com/400x300?text=Python',
  'Be able to program in Python professionally;Create a portfolio of 100 Python projects;Build websites, games and apps',
  '65 hours on-demand video;37 coding exercises;22 articles;220 downloadable resources;Access on mobile and TV;Completion certificate',
  'Google;Microsoft;Facebook;Amazon',
  NOW(),
  NOW()
);
```

### Using API

Make a POST request to create a course:

```bash
curl -X POST "https://localhost:7001/api/courses" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "2024 Complete Python Bootcamp",
    "description": "Master Python by building 100 projects",
    "category": "Development",
    "subcategory": "Python",
    "price": 14.99,
    "originalPrice": 84.99,
    "badge": "BESTSELLER",
    "instructorId": 1,
    "imageUrl": "https://via.placeholder.com/400x300",
    "whatYouLearn": ["Python basics", "OOP", "Projects"],
    "includes": ["65 hours video", "37 exercises"],
    "companies": ["Google", "Microsoft"]
  }'
```

## Database Schema

### Instructors Table

```sql
CREATE TABLE Instructors (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Title VARCHAR(255),
  Rating DOUBLE,
  Students INT,
  Courses INT,
  Bio LONGTEXT,
  ImageUrl VARCHAR(500),
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Courses Table

```sql
CREATE TABLE Courses (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(500) NOT NULL,
  Description LONGTEXT,
  Category VARCHAR(100),
  Subcategory VARCHAR(100),
  Price DECIMAL(10,2),
  OriginalPrice DECIMAL(10,2),
  Discount INT,
  Badge VARCHAR(100),
  Rating DOUBLE,
  ReviewCount INT,
  StudentCount INT,
  InstructorId INT,
  ImageUrl VARCHAR(500),
  WhatYouLearn LONGTEXT,
  Includes LONGTEXT,
  Companies LONGTEXT,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (InstructorId) REFERENCES Instructors(Id)
);
```

### CourseSections Table

```sql
CREATE TABLE CourseSections (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  CourseId INT NOT NULL,
  Day VARCHAR(50),
  Title VARCHAR(500),
  Duration VARCHAR(50),
  FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE
);
```

### CourseLectures Table

```sql
CREATE TABLE CourseLectures (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  SectionId INT NOT NULL,
  Title VARCHAR(500),
  Duration VARCHAR(50),
  VideoUrl VARCHAR(500),
  FOREIGN KEY (SectionId) REFERENCES CourseSections(Id) ON DELETE CASCADE
);
```

### CourseReviews Table

```sql
CREATE TABLE CourseReviews (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  CourseId INT NOT NULL,
  Name VARCHAR(255),
  Rating INT,
  Time VARCHAR(100),
  Text LONGTEXT,
  FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE
);
```

## Troubleshooting

### Connection Error: Access Denied

```
MySqlConnector.MySqlException (0x80004005): Access denied for user 'root'@'localhost'
```

**Solution:**

- Verify MySQL is running
- Check credentials in `appsettings.json`
- Ensure password is `Balaji@868`

### Command Error: Unknown Database 'lmsdb'

```
Unknown database 'lmsdb'
```

**Solution:**

- Run migrations: `dotnet ef database update`
- Or create manually: `CREATE DATABASE lmsdb;`

### Port Already in Use

```
Cannot open server TCP port 3306
```

**Solution:**

- Check if MySQL is running twice
- Change port in `appsettings.json` to 3307
- Restart MySQL service

### Migration Failed

```
The entity type 'Course' requires a primary key
```

**Solution:**

- Ensure all models have `Id` property
- Delete Migrations folder and recreate:
  ```bash
  Remove-Item -Recurse -Force Migrations
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

## Environment Variables

Create `.env.local` in web folder:

```
REACT_APP_API_URL=https://localhost:7001/api
```

## Running the Full Stack

### Terminal 1 - MySQL

```bash
# Verify MySQL is running
mysql -u root -p
# Enter password: Balaji@868
```

### Terminal 2 - ASP.NET API

```bash
cd C:\Users\user\Desktop\LMS\LmsApi
dotnet run
```

### Terminal 3 - React Web

```bash
cd C:\Users\user\Desktop\LMS\web
npm run dev
```

Access:

- Admin Dashboard: http://localhost:3000/admin
- API Swagger: https://localhost:7001/swagger
- MySQL: localhost:3306 (root / Balaji@868)

## Database Backup

### Backup

```bash
mysqldump -u root -p lmsdb > lms_backup.sql
# Enter password: Balaji@868
```

### Restore

```bash
mysql -u root -p lmsdb < lms_backup.sql
# Enter password: Balaji@868
```

## Useful MySQL Commands

```sql
-- Connect to MySQL
mysql -u root -p

-- Show databases
SHOW DATABASES;

-- Use lmsdb
USE lmsdb;

-- Show all tables
SHOW TABLES;

-- Show table structure
DESCRIBE Courses;
DESC Instructors;

-- Count records
SELECT COUNT(*) FROM Courses;
SELECT COUNT(*) FROM Instructors;

-- View all courses
SELECT * FROM Courses;

-- View specific course
SELECT * FROM Courses WHERE Id = 1;

-- Update course
UPDATE Courses SET Title = 'New Title' WHERE Id = 1;

-- Delete course
DELETE FROM Courses WHERE Id = 1;

-- Drop entire database (careful!)
DROP DATABASE lmsdb;
```

## Next Steps

1. ✅ Install MySQL
2. ✅ Configure connection string
3. ✅ Run migrations
4. ✅ Start API
5. Create sample courses
6. Connect React admin dashboard
7. Test CRUD operations
8. Deploy to production

---

**Connection String Reference:**

```
Server=localhost;Port=3306;Database=lmsdb;User=root;Password=Balaji@868;
```
