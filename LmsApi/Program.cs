using Microsoft.EntityFrameworkCore;
using LmsApi.Data;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy =
            System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddDbContext<LmsDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApps", cors =>
    {
        cors.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowReactApps");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
