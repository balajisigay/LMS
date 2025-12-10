export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  badge: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  instructorId: number;
  instructor: {
    id?: number;
    name: string;
    title: string;
    rating: number;
    students: number;
    courses: number;
    bio: string;
    imageUrl?: string;
  };
  imageUrl: string;
  whatYouLearn: string[];
  courseSections: CourseSection[];
  includes: string[];
  reviews: CourseReview[];
  companies: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CourseSection {
  id?: number;
  courseId?: number;
  day: string;
  title: string;
  duration: string;
  lectures?: CourseLecture[];
}

export interface CourseLecture {
  id?: number;
  sectionId?: number;
  title: string;
  duration: string;
  videoUrl?: string;
}

export interface CourseReview {
  id?: number;
  courseId?: number;
  name: string;
  rating: number;
  time: string;
  text: string;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  badge: string;
  instructorId: number;
  imageUrl: string;
  whatYouLearn: string[];
  includes: string[];
  companies?: string[];
}
