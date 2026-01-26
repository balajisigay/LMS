
// ============================================
// FILE: src/admin/AdminRouter.tsx
// ============================================
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AdminMessagesPage from './pages/AdminMessagesPage';
import AdminCourseCRUD from './pages/AdminCourseCRUD';
import CompleteLMSAdmin from './pages/CompleteLMSAdmin';
import AdminCourseDetailPage from './pages/AdminCourseDetailPage';
import CompleteCourseManager from './pages/CompleteCourseManager';


const AdminRouter: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUsersPage />} />
        <Route path="/courses" element={<AdminCoursesPage />} />
        <Route path="/messages" element={<AdminMessagesPage />} />
        <Route path="/course-crud" element={<AdminCourseCRUD />} />
        <Route path="/complete-lms-admin" element={<CompleteLMSAdmin />} />
        <Route path="/course/:courseId" element={<AdminCourseDetailPage />} />
        <Route path="/complete-manager" element={<CompleteCourseManager />} />

      </Routes>
    </AdminLayout>
  );
};

export default AdminRouter;