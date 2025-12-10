#!/usr/bin/env powershell

# LMS MySQL Setup Script
# Run this to set up MySQL database and tables

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  LMS MySQL Database Setup Script" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is installed
Write-Host "Checking MySQL installation..." -ForegroundColor Yellow
try {
    $mysqlVersion = mysql --version 2>$null
    Write-Host "✓ MySQL Found: $mysqlVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ MySQL not found. Please install MySQL first." -ForegroundColor Red
    Write-Host "  Download from: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor Gray

# Database credentials
$MYSQL_HOST = "localhost"
$MYSQL_PORT = 3306
$MYSQL_USER = "root"
$MYSQL_PASSWORD = "Balaji@868"
$MYSQL_DB = "lmsdb"

Write-Host ""
Write-Host "Database Configuration:" -ForegroundColor Yellow
Write-Host "  Host: $MYSQL_HOST" -ForegroundColor Gray
Write-Host "  Port: $MYSQL_PORT" -ForegroundColor Gray
Write-Host "  User: $MYSQL_USER" -ForegroundColor Gray
Write-Host "  Database: $MYSQL_DB" -ForegroundColor Gray

Write-Host ""
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor Gray

# Step 1: Restore .NET dependencies
Write-Host ""
Write-Host "Step 1: Restoring .NET dependencies..." -ForegroundColor Cyan
cd LmsApi
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to restore dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies restored" -ForegroundColor Green

# Step 2: Create migrations
Write-Host ""
Write-Host "Step 2: Creating database migrations..." -ForegroundColor Cyan
dotnet ef migrations add InitialCreate
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Migration may already exist or failed" -ForegroundColor Yellow
} else {
    Write-Host "✓ Migrations created" -ForegroundColor Green
}

# Step 3: Apply migrations
Write-Host ""
Write-Host "Step 3: Applying migrations to MySQL..." -ForegroundColor Cyan
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to update database" -ForegroundColor Red
    Write-Host "  Check MySQL connection and credentials" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Database tables created" -ForegroundColor Green

# Step 4: Verify connection
Write-Host ""
Write-Host "Step 4: Verifying database connection..." -ForegroundColor Cyan
$mysqlTest = @"
SELECT COUNT(*) as TableCount FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'lmsdb';
"@

try {
    $result = mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -h $MYSQL_HOST $MYSQL_DB -e $mysqlTest 2>$null
    if ($result) {
        Write-Host "✓ Successfully connected to MySQL" -ForegroundColor Green
        Write-Host "  Tables created in lmsdb database" -ForegroundColor Gray
    } else {
        throw "Connection failed"
    }
} catch {
    Write-Host "⚠ Could not verify connection" -ForegroundColor Yellow
    Write-Host "  Ensure MySQL is running and password is correct" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Setup Complete! ✓" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Start the API:" -ForegroundColor Cyan
Write-Host "     dotnet run" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Open Swagger UI:" -ForegroundColor Cyan
Write-Host "     https://localhost:7001/swagger" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Start React Web App:" -ForegroundColor Cyan
Write-Host "     cd ../web && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Connection Details:" -ForegroundColor Yellow
Write-Host "  MySQL Connection: $MYSQL_USER@$MYSQL_HOST`:$MYSQL_PORT/$MYSQL_DB" -ForegroundColor Gray
Write-Host "  API Endpoint: https://localhost:7001/api" -ForegroundColor Gray
Write-Host "  Admin Dashboard: http://localhost:3000/admin" -ForegroundColor Gray

Write-Host ""
