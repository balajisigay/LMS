# Firebase & Admin Dashboard Setup Guide

## Overview

The LMS now includes:

- **Firebase Firestore** for storing course data
- **Firebase Storage** for course images
- **Admin Dashboard** for creating/editing/deleting courses
- **Course Service Layer** for database operations

## Step 1: Install Firebase

```bash
npm install firebase
cd web && npm install firebase && cd ..
```

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Name it "LMS" (or your preferred name)
4. Wait for project creation to complete

## Step 3: Get Firebase Credentials

1. In Firebase Console, click "Project Settings" (gear icon)
2. Go to "Your apps" section
3. Click "Create app" and choose "Web"
4. Register your app with name "LMS Web"
5. Copy the Firebase config object
6. You'll see something like:

```javascript
{
  apiKey: "AIzaSyDemoKey...",
  authDomain: "lms-xxx.firebaseapp.com",
  projectId: "lms-xxx",
  storageBucket: "lms-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

## Step 4: Configure Environment Variables

1. Open `.env.local` in your project root
2. Fill in the Firebase credentials:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyDemoKey...
REACT_APP_FIREBASE_AUTH_DOMAIN=lms-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=lms-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=lms-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Step 5: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your preferred region (e.g., US)
5. Click "Enable"

## Step 6: Update Firestore Security Rules

1. In Firestore, go to "Rules" tab
2. Replace with these rules (for development):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read courses
    match /courses/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 7: Enable Cloud Storage

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Start in "production mode"
4. Click "Create"

## Step 8: Update Storage Rules

1. In Storage, go to "Rules" tab
2. Replace with these rules (for development):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read images
    match /courses/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 9: Access Admin Dashboard

1. Start the web development server:

```bash
cd web
npm run dev
```

2. Go to `http://localhost:3000/admin`

3. You can now:
   - ✅ Create new courses
   - ✅ Upload course images
   - ✅ Set pricing and course details
   - ✅ Add learning objectives and course inclusions
   - ✅ View all courses in the database
   - ✅ Delete courses

## Step 10: View Courses on Landing Page

1. Go to `http://localhost:3000/`
2. The landing page now fetches courses from Firebase instead of using sample data
3. Click any course to view details
4. Newly created courses appear automatically

## API Endpoints (Service Layer)

### Mobile (React Native)

```typescript
import {
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
} from './src/services/courseService';
```

### Web (React)

```typescript
import {
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
} from './src/services/courseService';
```

## Example Usage

### Fetch All Courses

```typescript
try {
  const courses = await getAllCourses();
  setCourses(courses);
} catch (error) {
  console.error('Error:', error);
}
```

### Create a Course

```typescript
const newCourse = await createCourse({
  title: 'JavaScript Masterclass',
  description: 'Learn JavaScript from basics to advanced',
  category: 'Development',
  subcategory: 'JavaScript',
  price: 19.99,
  originalPrice: 99.99,
  badge: 'BESTSELLER',
  instructor: {
    name: 'John Doe',
    title: 'JavaScript Expert',
    rating: 4.9,
    students: 50000,
    courses: 5,
    bio: 'Expert JavaScript developer',
  },
  whatYouLearn: ['Learn ES6+', 'DOM Manipulation', 'Async/Await'],
  includes: ['50 hours video', '20 exercises', '10 articles'],
  imageFile: imageFile, // optional
});
```

### Fetch Course by ID

```typescript
const course = await getCourseById('courseId123');
if (course) {
  console.log(course);
}
```

## File Structure

```
LMS/
├── firebaseConfig.ts          # Firebase initialization
├── .env.local                 # Environment variables (create this)
├── src/
│   ├── types/
│   │   └── course.ts         # TypeScript interfaces
│   └── services/
│       └── courseService.ts  # Firebase operations
├── web/
│   └── src/
│       ├── pages/
│       │   ├── AdminDashboard.tsx    # Admin interface
│       │   ├── LandingPage.tsx       # Updated to fetch courses
│       │   └── CourseDetailPage.tsx  # Updated to fetch details
│       ├── services/
│       │   └── courseService.ts      # Web version
│       └── App.tsx            # Updated routes
```

## Troubleshooting

### "Firebase config is invalid"

- Check your `.env.local` file
- Ensure all values are copied correctly from Firebase Console
- Restart the dev server after updating `.env.local`

### "Permission denied" errors

- Check Firestore/Storage rules
- Ensure rules are in "production mode"
- Re-publish the rules

### Images not uploading

- Check Storage rules allow write access
- Ensure file size is reasonable
- Check browser console for detailed errors

### Courses not appearing

- Go to Firebase Console > Firestore
- Check "courses" collection exists
- Verify document structure matches TypeScript interface

## Next Steps

1. ✅ Set up authentication for admin access
2. ✅ Add course content upload (videos, documents)
3. ✅ Implement course player functionality
4. ✅ Add enrollment and payment integration
5. ✅ Create student dashboard
