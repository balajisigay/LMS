# Reset MySQL database script
# Usage: .\reset-db.ps1

$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

if (-not (Test-Path $mysqlPath)) {
    Write-Host "❌ MySQL not found at $mysqlPath" -ForegroundColor Red
    Write-Host "Please install MySQL or update the path"
    exit 1
}

# Drop and recreate database
Write-Host "🗑️  Dropping and recreating lmsdb database..." -ForegroundColor Yellow

$sqlCommands = @"
DROP DATABASE IF EXISTS lmsdb;
CREATE DATABASE lmsdb;
"@

# Execute MySQL commands
$sqlCommands | & $mysqlPath -u root -p"Balaji@868" -h localhost

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database reset successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "1. cd C:\Users\user\Desktop\LMS\LmsApi"
    Write-Host "2. dotnet ef database update"
    Write-Host "3. dotnet run"
} else {
    Write-Host "❌ Failed to reset database" -ForegroundColor Red
    exit 1
}
