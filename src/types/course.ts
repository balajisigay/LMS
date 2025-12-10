export interface Course {
  id: string;
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
  instructorId: string;
  instructor: {
    name: string;
    title: string;
    rating: number;
    students: number;
    courses: number;
    bio: string;
  };
  imageUrl: string;
  whatYouLearn: string[];
  courseContent: {
    totalSections: number;
    totalLectures: number;
    totalDuration: string;
    sections: CourseSection[];
  };
  includes: string[];
  reviews: CourseReview[];
  companies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSection {
  day: string;
  title: string;
  duration: string;
  subsections?: CourseLecture[];
}

export interface CourseLecture {
  title: string;
  duration: string;
  videoUrl?: string;
}

export interface CourseReview {
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
  instructorId: string;
  instructor: {
    name: string;
    title: string;
    rating: number;
    students: number;
    courses: number;
    bio: string;
  };
  imageFile?: File;
  whatYouLearn: string[];
  includes: string[];
  companies?: string[];
}
