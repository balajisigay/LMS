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
    public DbSet<Cart> Carts { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }



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
        modelBuilder.Entity<Cart>()
    .HasOne(c => c.Course)
    .WithMany()
    .HasForeignKey(c => c.CourseId)
    .OnDelete(DeleteBehavior.Cascade);


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
                modelBuilder.Entity<Enrollment>()
        .HasOne(e => e.Course)
        .WithMany()
        .HasForeignKey(e => e.CourseId)
        .OnDelete(DeleteBehavior.Restrict);
    }
}
