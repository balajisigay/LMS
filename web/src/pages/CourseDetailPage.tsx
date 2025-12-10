import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { Course, CourseSection, CourseLecture, CourseReview } from "../types/course";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';



export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    loadCourse(id);
  }, [id]);

  const loadCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourseById(courseId);
      setCourse(data);
      // Set first video as default if available
      if (data.courseSections?.[0]?.lectures?.[0]?.videoUrl) {
        setSelectedVideo(data.courseSections[0].lectures[0].videoUrl);
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const handleLectureClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <main style={{ padding: spacing.xl, textAlign: "center" }}>
        <p>Loading course...</p>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main style={{ padding: spacing.xl, textAlign: "center" }}>
        <p style={{ color: "red" }}>{error ?? "Course not found"}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </main>
    );
  }

  // Calculate totals
  const totalSections = course.courseSections?.length || 0;
  const totalLectures = course.courseSections?.reduce((acc, sec) => acc + (sec.lectures?.length || 0), 0) || 0;
  const totalDuration = `${Math.floor(Math.random() * 50) + 30}h ${Math.floor(Math.random() * 60)}m`;

  return (
    
    <div style={styles.pageContainer}>
            <Header />
      
      {/* Dark Header Section */}
      <div style={styles.darkHeader}>
        <div style={styles.headerContent}>
          <div style={styles.breadcrumb}>
            <span style={styles.breadcrumbLink}>Development</span>
            <span style={styles.breadcrumbSeparator}>›</span>
            <span style={styles.breadcrumbLink}>Python</span>
            <span style={styles.breadcrumbSeparator}>›</span>
            <span style={styles.breadcrumbCurrent}>Masterclass</span>
          </div>
          
          <h1 style={styles.courseTitle}>{course.title}</h1>
          
          <p style={styles.courseDescription}>
            {course.description || "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"}
          </p>

          <div style={styles.metaRow}>
            <span style={styles.bestsellerBadge}>BESTSELLER</span>
            <div style={styles.ratingGroup}>
              <span style={styles.ratingNumber}>{course.rating.toFixed(1)}</span>
              <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} style={styles.star}>★</span>
                ))}
              </div>
              <span style={styles.ratingCount}>({course.reviewCount.toLocaleString()} ratings)</span>
            </div>
            <span style={styles.studentCount}>{course.studentCount?.toLocaleString()} students</span>
          </div>

          <div style={styles.instructorRow}>
            <span style={styles.createdBy}>Created by</span>
            <span style={styles.instructorName}>{course.instructor?.name}</span>
            <span style={styles.lastUpdated}>Last updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            <span style={styles.language}>🌐 English, Spanish [Auto]</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Video Player */}
          {selectedVideo && (
            <div style={styles.videoSection}>
              <div style={styles.videoContainer}>
                <iframe
                  src={selectedVideo}
                  style={styles.videoPlayer}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              </div>
            </div>
          )}

          {/* What you'll learn */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What you'll learn</h2>
            <div style={styles.learningGrid}>
              {(course.whatYouLearn || [
                "Be able to program in Python professionally",
                "Create a portfolio of 100 Python projects to apply for developer jobs",
                "Build websites, games and apps with Python",
                "Master modern frameworks like Selenium, Beautiful Soup, Request",
                "Data Science - Pandas and NumPy analyses",
                "Create GUI Desktop Applications with Tkinter"
              ]).map((item, i) => (
                <div key={i} style={styles.learningItem}>
                  <span style={styles.checkmark}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Companies */}
          <div style={styles.companiesSection}>
            <p style={styles.companiesText}>COMPANIES LISTED OFFER THIS COURSE TO THEIR EMPLOYEES</p>
            <div style={styles.companyLogos}>
              {['aws', 'Google', 'lyft'].map((company, i) => (
                <div key={i} style={styles.companyLogo}>{company}</div>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Course Content</h2>
            <div style={styles.contentSummary}>
              <span>{totalSections} sections • {totalLectures} lectures • {totalDuration} total length</span>
              <button style={styles.expandAllButton}>Expand all sections</button>
            </div>

            <div style={styles.sectionsContainer}>
              {course.courseSections?.map((section: CourseSection, index: number) => {
                const isExpanded = expandedSections.has(index);
                const lectureCount = section.lectures?.length || 0;
                
                return (
                  <div key={index} style={styles.sectionCard}>
                    <div 
                      style={styles.sectionHeader}
                      onClick={() => toggleSection(index)}
                    >
                      <div style={styles.sectionLeft}>
                        <span style={styles.sectionArrow}>{isExpanded ? '▼' : '▶'}</span>
                        <span style={styles.sectionTitle}>{section.title}</span>
                      </div>
                      <div style={styles.sectionRight}>
                        <span style={styles.sectionMeta}>
                          {lectureCount} lectures • {section.duration}
                        </span>
                      </div>
                    </div>

                    {isExpanded && section.lectures && (
                      <div style={styles.lecturesContainer}>
                        {section.lectures.map((lecture: CourseLecture, lectureIndex: number) => (
                          <div 
                            key={lectureIndex} 
                            style={styles.lectureRow}
                            onClick={() => lecture.videoUrl && handleLectureClick(lecture.videoUrl)}
                          >
                            <div style={styles.lectureLeft}>
                              <span style={styles.playIcon}>▶</span>
                              <span style={styles.lectureTitle}>{lecture.title}</span>
                            </div>
                            <div style={styles.lectureRight}>
                              <span style={styles.lectureDuration}>{lecture.duration}</span>
                              {lectureIndex === 0 && <span style={styles.previewBadge}>Preview</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button style={styles.showMoreButton}>Show 90 more sections</button>
          </div>

          {/* Instructor */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Instructor</h2>
            <div style={styles.instructorCard}>
              <h3 style={styles.instructorCardName}>{course.instructor?.name}</h3>
              <p style={styles.instructorCardTitle}>{course.instructor?.title || "Developer and Lead Instructor"}</p>
              
              <div style={styles.instructorMeta}>
                <div style={styles.instructorMetaItem}>
                  <span style={styles.instructorIcon}>⭐</span>
                  <span>{course.rating.toFixed(1)} Rating</span>
                </div>
                <div style={styles.instructorMetaItem}>
                  <span style={styles.instructorIcon}>👤</span>
                  <span>{course.instructor?.students?.toLocaleString()} Students</span>
                </div>
                <div style={styles.instructorMetaItem}>
                  <span style={styles.instructorIcon}>▶</span>
                  <span>{course.instructor?.courses} Courses</span>
                </div>
              </div>

              <p style={styles.instructorBio}>
                {course.instructor?.bio || "I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Bootcamp. I've helped thousands of students learn to code and change their lives by becoming a developer."}
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.reviewStar}>⭐</span>
              {course.rating.toFixed(1)} Course Rating • {course.reviewCount.toLocaleString()}K Reviews
            </h2>
            
            <div style={styles.reviewsGrid}>
              {course.reviews?.map((review: CourseReview, index: number) => (
                <div key={index} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewerAvatar}>{review.name.charAt(0)}</div>
                    <div>
                      <div style={styles.reviewerName}>{review.name}</div>
                      <div style={styles.reviewStars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} style={{...styles.reviewStar, opacity: star <= review.rating ? 1 : 0.3}}>★</span>
                        ))}
                      </div>
                      <div style={styles.reviewTime}>• {review.time}</div>
                    </div>
                  </div>
                  <p style={styles.reviewText}>{review.text}</p>
                </div>
              )) || (
                <>
                  <div style={styles.reviewCard}>
                    <div style={styles.reviewHeader}>
                      <div style={styles.reviewerAvatar}>JD</div>
                      <div>
                        <div style={styles.reviewerName}>John Doe</div>
                        <div style={styles.reviewStars}>★★★★★</div>
                        <div style={styles.reviewTime}>a week ago</div>
                      </div>
                    </div>
                    <p style={styles.reviewText}>
                      This was exactly what I needed. The 100 days structure really keeps you engaged. Angela explains concepts very clearly using real world metaphors.
                    </p>
                  </div>
                  <div style={styles.reviewCard}>
                    <div style={styles.reviewHeader}>
                      <div style={styles.reviewerAvatar}>SK</div>
                      <div>
                        <div style={styles.reviewerName}>Sarah Klein</div>
                        <div style={styles.reviewStars}>★★★★★</div>
                        <div style={styles.reviewTime}>2 weeks ago</div>
                      </div>
                    </div>
                    <p style={styles.reviewText}>
                      Great course overall. Some of the latter modules felt a bit rushed, but the community support in the Q&A section is fantastic. Highly recommend for beginners.
                    </p>
                  </div>
                </>
              )}
            </div>

            <button style={styles.viewAllReviewsButton}>View all reviews</button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={styles.rightColumn}>
          <div style={styles.priceCard}>
            <div style={styles.priceCardInner}>
              {/* Preview Video Thumbnail */}
              <div style={styles.previewThumbnail}>
                {selectedVideo ? (
                  <div style={styles.thumbnailOverlay}>
                    <div style={styles.playButton}>▶</div>
                    <span style={styles.previewText}>Preview this course</span>
                  </div>
                ) : (
                  <div style={styles.noPreview}>Preview Available</div>
                )}
              </div>

              {/* Price */}
              <div style={styles.priceSection}>
                <div style={styles.currentPrice}>${course.price.toFixed(2)}</div>
                {course.originalPrice > course.price && (
                  <div style={styles.originalPriceStrike}>${course.originalPrice.toFixed(2)}</div>
                )}
                {course.originalPrice > course.price && (
                  <div style={styles.discount}>
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <div style={styles.urgencyText}>
                <span style={styles.alarmIcon}>🔥</span>
                5 hours left at this price!
              </div>

              {/* Action Buttons */}
              <button style={styles.addToCartButton}>Add to Cart</button>
              <button style={styles.buyNowButton}>Buy Now</button>
              
              <div style={styles.guarantee}>30-Day Money-Back Guarantee</div>

              {/* Course Includes */}
              <div style={styles.includesSection}>
                <h4 style={styles.includesTitle}>This course includes:</h4>
                <div style={styles.includesList}>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>▶</span>
                    <span>65 hours on-demand video</span>
                  </div>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>⚡</span>
                    <span>57 coding exercises</span>
                  </div>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>📄</span>
                    <span>42 articles</span>
                  </div>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>📥</span>
                    <span>120 downloadable resources</span>
                  </div>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>♾</span>
                    <span>Full lifetime access</span>
                  </div>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>📱</span>
                    <span>Access on mobile and TV</span>
                  </div>
                  <div style={styles.includesItem}>
                    <span style={styles.includesIcon}>🏆</span>
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>

              {/* Additional Actions */}
              <div style={styles.cardActions}>
                <button style={styles.actionButton}>Share</button>
                <button style={styles.actionButton}>Gift this course</button>
                <button style={styles.actionButton}>Apply Coupon</button>
              </div>

              {/* Training Promo */}
              <div style={styles.trainingPromo}>
                <h4 style={styles.trainingTitle}>Training 5 or more people?</h4>
                <p style={styles.trainingText}>
                  Get your team access to 25,000+ top Udemy courses anytime, anywhere.
                </p>
                <button style={styles.trainingButton}>Try Lumina Business</button>
              </div>
            </div>
          </div>
        </div>
      </div>
            <Footer />
      
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    backgroundColor: colors.background,
  },
  darkHeader: {
    backgroundColor: '#1c1d1f',
    color: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerContent: {
    maxWidth: 1400,
    margin: '0 auto',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
    fontSize: fontSize.sm,
  },
  breadcrumbLink: {
    color: '#c0c4fc',
    cursor: 'pointer',
  },
  breadcrumbSeparator: {
    color: colors.background,
    opacity: 0.5,
  },
  breadcrumbCurrent: {
    color: colors.background,
  },
  courseTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: '700',
    margin: `0 0 ${spacing.md}px 0`,
    lineHeight: 1.2,
  },
  courseDescription: {
    fontSize: fontSize.md,
    lineHeight: 1.4,
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  bestsellerBadge: {
    backgroundColor: '#eceb98',
    color: '#3d3c0a',
    padding: '4px 8px',
    fontSize: fontSize.xs,
    fontWeight: '700',
    borderRadius: borderRadius.sm,
  },
  ratingGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingNumber: {
    color: '#f69c08',
    fontWeight: '700',
    fontSize: fontSize.md,
  },
  stars: {
    color: '#f69c08',
    fontSize: fontSize.sm,
  },
  star: {
    marginRight: 2,
  },
  ratingCount: {
    color: '#c0c4fc',
    fontSize: fontSize.sm,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  studentCount: {
    fontSize: fontSize.sm,
  },
  instructorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    flexWrap: 'wrap',
    fontSize: fontSize.sm,
  },
  createdBy: {
    opacity: 0.8,
  },
  instructorName: {
    color: '#c0c4fc',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  lastUpdated: {
    opacity: 0.8,
  },
  language: {
    opacity: 0.8,
  },
  mainContent: {
    maxWidth: 1400,
    margin: '0 auto',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: spacing.xxl,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xl,
  },
  videoSection: {
    backgroundColor: '#000',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  section: {
    paddingTop: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  learningGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.md,
    border: `1px solid ${colors.border}`,
    padding: spacing.lg,
    borderRadius: borderRadius.sm,
  },
  learningItem: {
    display: 'flex',
    gap: spacing.sm,
    alignItems: 'flex-start',
    fontSize: fontSize.sm,
  },
  checkmark: {
    color: colors.text,
    fontWeight: '700',
    flexShrink: 0,
  },
  companiesSection: {
    paddingTop: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
  },
  companiesText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    marginBottom: spacing.md,
    color: colors.textLight,
  },
  companyLogos: {
    display: 'flex',
    gap: spacing.xl,
    alignItems: 'center',
  },
  companyLogo: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textLighter,
  },
  contentSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    fontSize: fontSize.sm,
  },
  expandAllButton: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  sectionsContainer: {
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.sm,
  },
  sectionCard: {
    borderBottom: `1px solid ${colors.border}`,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    cursor: 'pointer',
    backgroundColor: colors.background,
    transition: 'background-color 0.2s',
  },
  sectionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionArrow: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  sectionRight: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  sectionMeta: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  lecturesContainer: {
    backgroundColor: colors.surfaceLight,
  },
  lectureRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.sm}px ${spacing.md}px`,
    borderTop: `1px solid ${colors.border}`,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  lectureLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  playIcon: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  lectureTitle: {
    fontSize: fontSize.sm,
  },
  lectureRight: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  lectureDuration: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  previewBadge: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  showMoreButton: {
    width: '100%',
    padding: spacing.md,
    marginTop: spacing.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: borderRadius.sm,
  },
  instructorCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  instructorCardName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    margin: 0,
    color: colors.primary,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  instructorCardTitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    margin: 0,
  },
  instructorMeta: {
    display: 'flex',
    gap: spacing.lg,
    flexWrap: 'wrap',
  },
  instructorMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: fontSize.sm,
  },
  instructorIcon: {
    fontSize: fontSize.md,
  },
  instructorBio: {
    fontSize: fontSize.sm,
    lineHeight: 1.6,
    color: colors.text,
  },
  reviewStar: {
    color: '#f69c08',
    marginRight: spacing.xs,
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  reviewCard: {
    border: `1px solid ${colors.border}`,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  reviewHeader: {
    display: 'flex',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.text,
    color: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: fontSize.sm,
    flexShrink: 0,
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  reviewStars: {
    color: '#f69c08',
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  reviewTime: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  reviewText: {
    fontSize: fontSize.sm,
    lineHeight: 1.5,
    color: colors.text,
  },
  viewAllReviewsButton: {
    width: '100%',
    padding: spacing.md,
    marginTop: spacing.lg,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: borderRadius.sm,
  },
  rightColumn: {
    position: 'sticky',
    top: spacing.lg,
    height: 'fit-content',
  },
  priceCard: {
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  priceCardInner: {
    padding: spacing.lg,
  },
  previewThumbnail: {
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#000',
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  thumbnailOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSize.lg,
    marginBottom: spacing.sm,
  },
  previewText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  noPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: colors.textLight,
  },
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  currentPrice: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  originalPriceStrike: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textDecoration: 'line-through',
  },
  discount: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#5624d0',
  },
  urgencyText: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: fontSize.sm,
    color: '#dc3545',
    marginBottom: spacing.lg,
  },
  alarmIcon: {
    fontSize: fontSize.md,
  },
  addToCartButton: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: colors.primary,
    color: colors.background,
    border: 'none',
    borderRadius: borderRadius.sm,
    fontSize: fontSize.md,
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: spacing.sm,
  },
  buyNowButton: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: colors.background,
    color: colors.text,
    border: `1px solid ${colors.text}`,
    borderRadius: borderRadius.sm,
    fontSize: fontSize.md,
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: spacing.md,
  },
  guarantee: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
  includesSection: {
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
    marginBottom: spacing.md,
  },
  includesTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  includesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  includesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: fontSize.sm,
  },
  includesIcon: {
    fontSize: fontSize.md,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
    marginBottom: spacing.md,
  },
  actionButton: {
    padding: spacing.sm,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    color: colors.primary,
  },
  trainingPromo: {
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
  },
  trainingTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  trainingText: {
    fontSize: fontSize.sm,
    lineHeight: 1.5,
    marginBottom: spacing.md,
    color: colors.textLight,
  },
  trainingButton: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: colors.text,
    color: colors.background,
    border: 'none',
    borderRadius: borderRadius.sm,
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
  },
};