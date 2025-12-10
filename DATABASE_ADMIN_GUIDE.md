# Database & Admin Dashboard - Quick Start

## What's New

### 🗄️ Database Layer

- **Firebase Firestore** for storing courses
- **Firebase Storage** for course images
- **Course Service** for CRUD operations
- **TypeScript Types** for type safety

### 👨‍💼 Admin Dashboard

- Create new courses with full details
- Upload course images
- Set pricing and discounts
- Define learning objectives
- List course inclusions
- View all courses
- Delete courses

### 📱 Dynamic Landing Page

- Fetches courses from database
- Updates automatically when new courses added
- Shows real course data

### 📄 Course Detail Page

- Displays actual course data from database
- Loads instructor info, pricing, sections
- Real ratings and student counts

## Quick Setup

### 1. Install Firebase

```bash
npm install firebase
cd web && npm install firebase && cd ..
```

### 2. Configure Environment Variables

Copy values from Firebase Console to `.env.local`:

```
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender
REACT_APP_FIREBASE_APP_ID=your_app
```

### 3. Access Admin Dashboard

```
http://localhost:3000/admin
```

### 4. Create Your First Course

- Click "+ Add New Course"
- Fill in course details
- Upload course image
- Click "Create Course"
- Course appears on landing page!

## Files Created/Updated

**New Files:**

- `firebaseConfig.ts` - Firebase initialization
- `.env.local` - Environment variables
- `src/types/course.ts` - TypeScript interfaces
- `src/services/courseService.ts` - Mobile service
- `web/src/services/courseService.ts` - Web service
- `web/src/pages/AdminDashboard.tsx` - Admin UI
- `FIREBASE_SETUP.md` - Complete setup guide

**Updated Files:**

- `web/src/App.tsx` - Added /admin route
- `web/src/pages/LandingPage.tsx` - Fetch from database
- `web/src/pages/CourseDetailPage.tsx` - Fetch details

## Database Schema

```typescript
interface Course {
  id: string; // Auto-generated
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  badge: string; // e.g., "BESTSELLER"
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
  imageUrl: string; // URL to image in Storage
  whatYouLearn: string[];
  includes: string[];
  reviews: CourseReview[];
  companies: string[];
  courseContent: {
    totalSections: number;
    totalLectures: number;
    totalDuration: string;
    sections: CourseSection[];
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## Service Functions

```typescript
// Get all courses
const courses = await getAllCourses();

// Get single course
const course = await getCourseById(courseId);

// Get by category
const pythonCourses = await getCoursesByCategory('Development');

// Create course
const newCourse = await createCourse({...});

// Update course
await updateCourse(courseId, {...});

// Delete course
await deleteCourse(courseId);

// Upload image
const url = await uploadCourseImage(courseId, file);
```

## Next Steps

1. **Set up Firebase Project** (see FIREBASE_SETUP.md)
2. **Test Admin Dashboard** - Create sample courses
3. **View on Landing Page** - See courses auto-appear
4. **Add Authentication** - Secure admin access
5. **Integrate Payment** - Stripe or similar
6. **Build Mobile Admin** - React Native version
7. **Add Video Upload** - Course content hosting

## Architecture

```
LMS App
├── Web (React)
│   ├── Admin Dashboard → Creates/edits courses
│   ├── Landing Page → Shows database courses
│   └── Course Detail → Displays course info
├── Mobile (React Native)
│   ├── Landing Screen → Shows database courses
│   └── Course Detail Screen → Displays course info
└── Backend (Firebase)
    ├── Firestore → Course data
    ├── Storage → Course images
    └── Auth → User authentication
```

## Security Notes

The Firebase rules in this setup allow:

- **Public read** of all courses
- **Authenticated write** for courses (requires login)
- **Authenticated write** for images

For production, implement proper admin authentication using Firebase Auth.

---

For detailed setup instructions, see **FIREBASE_SETUP.md**
