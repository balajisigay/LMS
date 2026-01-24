
// ============================================
// FILE: src/admin/AdminRouter.tsx
// ============================================
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminMessagesPage from './pages/AdminMessagesPage';
import AdminCourseCRUD from './pages/AdminCourseCRUD';
import CompleteLMSAdmin from './pages/CompleteLMSAdmin';


const AdminRouter: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUsersPage />} />
        <Route path="/courses" element={<AdminCourseCRUD />} />
        <Route path="/messages" element={<AdminMessagesPage />} />
        <Route path="/complete-lms-admin" element={<CompleteLMSAdmin />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRouter;