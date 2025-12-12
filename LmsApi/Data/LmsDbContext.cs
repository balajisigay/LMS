using Microsoft.EntityFrameworkCore;
using LmsApi.Models;

namespace LmsApi.Data;

public class LmsDbContext : DbContext
{
    public LmsDbContext(DbContextOptions<LmsDbContext> options) : base(options)
    {
    }

    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Instructor> Instructors => Set<Instructor>();
    public DbSet<CourseSection> CourseSections => Set<CourseSection>();
    public DbSet<CourseLecture> CourseLectures => Set<CourseLecture>();
    public DbSet<CourseReview> CourseReviews => Set<CourseReview>();

    // ⭐ NEW — Add User Table
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // (existing relationships stay the same)
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Instructor)
            .WithMany(i => i.CreatedCourses)
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.Restrict);

        // (your JSON-list conversions unchanged)

        modelBuilder.Entity<Course>()
            .Property(c => c.WhatYouLearn)
            .HasConversion(
                v => string.Join(";", v),
                v => v.Split(";", StringSplitOptions.RemoveEmptyEntries).ToList());

        modelBuilder.Entity<Course>()
            .Property(c => c.Includes)
            .HasConversion(
                v => string.Join(";", v),
                v => v.Split(";", StringSplitOptions.RemoveEmptyEntries).ToList());

        modelBuilder.Entity<Course>()
            .Property(c => c.Companies)
            .HasConversion(
                v => string.Join(";", v),
                v => v.Split(";", StringSplitOptions.RemoveEmptyEntries).ToList());
    }
}
