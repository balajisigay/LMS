# Script to insert sample data via API
# Usage: .\insert-data-via-api.ps1

$apiUrl = "http://localhost:5000/api"

Write-Host "📡 Inserting sample data via API..." -ForegroundColor Cyan

# Sample instructors
$instructors = @(
    @{
        Name = "Sarah Johnson"
        Title = "Python Expert"
        Rating = 4.8
        Students = 15420
        Courses = 5
        Bio = "Experienced Python developer with 10+ years in software development"
        ImageUrl = "https://api.example.com/instructor1.jpg"
    },
    @{
        Name = "Mike Chen"
        Title = "Full Stack Developer"
        Rating = 4.9
        Students = 18500
        Courses = 6
        Bio = "Full stack specialist focusing on modern web technologies"
        ImageUrl = "https://api.example.com/instructor2.jpg"
    },
    @{
        Name = "Emma Davis"
        Title = "Data Science Pro"
        Rating = 4.7
        Students = 12300
        Courses = 4
        Bio = "Data scientist passionate about machine learning and AI"
        ImageUrl = "https://api.example.com/instructor3.jpg"
    },
    @{
        Name = "John Wilson"
        Title = "Web Development"
        Rating = 4.6
        Students = 9800
        Courses = 3
        Bio = "Web developer specializing in React and Node.js"
        ImageUrl = "https://api.example.com/instructor4.jpg"
    }
)

# Create instructors
Write-Host "Creating instructors..." -ForegroundColor Yellow
$instructorIds = @()

foreach ($instructor in $instructors) {
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/instructors" `
            -Method POST `
            -Headers @{"Content-Type" = "application/json"} `
            -Body ($instructor | ConvertTo-Json) `
            -SkipCertificateCheck
        
        $instructorIds += $response.id
        Write-Host "  ✅ Created instructor: $($instructor.Name)" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ Failed to create instructor: $($instructor.Name)" -ForegroundColor Red
        Write-Host "     Error: $_"
    }
}

Write-Host ""
Write-Host "Creating courses..." -ForegroundColor Yellow

# Sample courses
$courses = @(
    @{
        Title = "Complete Python Programming"
        Description = "Learn Python from basics to advanced OOP concepts"
        Category = "Development"
        Subcategory = "Python"
        Price = 19.99
        OriginalPrice = 99.99
        Discount = 80
        Badge = "BESTSELLER"
        Rating = 4.8
        ReviewCount = 3245
        StudentCount = 45230
        InstructorId = $instructorIds[0]
        ImageUrl = "https://api.example.com/python-course.jpg"
        WhatYouLearn = @("Python Basics", "OOP Concepts", "Web Scraping", "Data Analysis", "Automation")
        Includes = @("50 hours video", "30 coding exercises", "Downloadable resources", "Lifetime access", "Certificate")
        Companies = @("Google", "Amazon", "Microsoft", "Facebook")
    },
    @{
        Title = "React for Beginners"
        Description = "Master React and build modern web applications"
        Category = "Development"
        Subcategory = "React"
        Price = 29.99
        OriginalPrice = 149.99
        Discount = 80
        Badge = "NEW"
        Rating = 4.9
        ReviewCount = 1856
        StudentCount = 28900
        InstructorId = $instructorIds[3]
        ImageUrl = "https://api.example.com/react-course.jpg"
        WhatYouLearn = @("React Fundamentals", "Hooks", "State Management", "Routing", "API Integration")
        Includes = @("40 hours video", "20 projects", "Code samples", "Community support", "Certificate")
        Companies = @("Netflix", "Airbnb", "Uber", "PayPal")
    },
    @{
        Title = "Data Science Masterclass"
        Description = "Comprehensive guide to becoming a data scientist"
        Category = "Data Science"
        Subcategory = "Machine Learning"
        Price = 39.99
        OriginalPrice = 199.99
        Discount = 80
        Badge = "BESTSELLER"
        Rating = 4.7
        ReviewCount = 2156
        StudentCount = 32100
        InstructorId = $instructorIds[2]
        ImageUrl = "https://api.example.com/datascience-course.jpg"
        WhatYouLearn = @("Statistics", "Python for Data", "Machine Learning", "Data Visualization", "Deep Learning")
        Includes = @("60 hours video", "15 real-world projects", "Jupyter notebooks", "Dataset access", "Certificate")
        Companies = @("Google", "IBM", "Amazon", "Apple")
    },
    @{
        Title = "JavaScript Advanced"
        Description = "Deep dive into advanced JavaScript concepts"
        Category = "Development"
        Subcategory = "JavaScript"
        Price = 24.99
        OriginalPrice = 129.99
        Discount = 81
        Badge = "BESTSELLER"
        Rating = 4.8
        ReviewCount = 2890
        StudentCount = 38500
        InstructorId = $instructorIds[1]
        ImageUrl = "https://api.example.com/js-advanced.jpg"
        WhatYouLearn = @("Closures", "Promises", "Async/Await", "Functional Programming", "Modules")
        Includes = @("45 hours video", "25 code challenges", "Practice projects", "Community", "Certificate")
        Companies = @("Google", "Microsoft", "Facebook", "Apple")
    }
)

$courseIds = @()

foreach ($course in $courses) {
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/courses" `
            -Method POST `
            -Headers @{"Content-Type" = "application/json"} `
            -Body ($course | ConvertTo-Json) `
            -SkipCertificateCheck
        
        $courseIds += $response.id
        Write-Host "  ✅ Created course: $($course.Title)" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ Failed to create course: $($course.Title)" -ForegroundColor Red
        Write-Host "     Error: $_"
    }
}

Write-Host ""
Write-Host "✅ Sample data insertion complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:"
Write-Host "  • $($instructorIds.Count) instructors created"
Write-Host "  • $($courseIds.Count) courses created"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Access Swagger UI: http://localhost:5000/swagger"
Write-Host "  2. Start React web app: cd web && npm run dev"
Write-Host "  3. Admin dashboard: http://localhost:3000/admin"
