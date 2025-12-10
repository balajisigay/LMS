using Microsoft.EntityFrameworkCore;
using LmsApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<LmsDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApps", cors =>
    {
        cors.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Auto-migrate
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LmsDbContext>();
    db.Database.Migrate();
}

// Swagger only in dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ⭐ IMPORTANT: DO NOT ENABLE HTTPS REDIRECT
// app.UseHttpsRedirection();

app.UseCors("AllowReactApps");
app.UseAuthorization();

app.MapControllers();

app.Run();
