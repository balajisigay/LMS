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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Instructor)
            .WithMany(i => i.CreatedCourses)
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<CourseSection>()
            .HasOne(cs => cs.Course)
            .WithMany(c => c.CourseSections)
            .HasForeignKey(cs => cs.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CourseLecture>()
            .HasOne(cl => cl.Section)
            .WithMany(cs => cs.Lectures)
            .HasForeignKey(cl => cl.SectionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CourseReview>()
            .HasOne(cr => cr.Course)
            .WithMany(c => c.Reviews)
            .HasForeignKey(cr => cr.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure JSON properties for lists
        modelBuilder.Entity<Course>()
            .Property(c => c.WhatYouLearn)
            .HasConversion(
                v => string.Join(";", v),
                v => v.Split(";", StringSplitOptions.RemoveEmptyEntries).ToList())
            .Metadata.SetValueComparer(
                new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2 ?? new()),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()));

        modelBuilder.Entity<Course>()
            .Property(c => c.Includes)
            .HasConversion(
                v => string.Join(";", v),
                v => v.Split(";", StringSplitOptions.RemoveEmptyEntries).ToList())
            .Metadata.SetValueComparer(
                new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2 ?? new()),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()));

        modelBuilder.Entity<Course>()
            .Property(c => c.Companies)
            .HasConversion(
                v => string.Join(";", v),
                v => v.Split(";", StringSplitOptions.RemoveEmptyEntries).ToList())
            .Metadata.SetValueComparer(
                new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2 ?? new()),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()));
    }
}
