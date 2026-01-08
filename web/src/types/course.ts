export interface Course {
  id: number;                 // ✅ FIXED
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

  instructorId: number;       // ✅ FIXED
  instructor?: {
    id: number;
    name: string;
    title: string;
    rating: number;
    students: number;
    courses: number;
    bio: string;
    imageUrl: string;
  };

  imageUrl: string;           // ✅ NOW RESOLVES FOR ALL CARDS

  whatYouLearn: string[];
  includes: string[];
  companies: string[];

  courseSections: CourseSection[]; // ✅ MATCH API
  reviews: CourseReview[];

  createdAt: string;
  updatedAt: string;
}


export interface CourseSection {
  id: number;
  courseId: number;
  day: string;
  title: string;
  duration: string;
  lectures: CourseLecture[];   // ✅ MATCH API
}

export interface CourseLecture {
  id: number;
  sectionId: number;
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
