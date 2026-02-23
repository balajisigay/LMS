import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiHome,
  HiUsers,
  HiAcademicCap,
  HiMail,
  HiLogout,
  HiMenu,
  HiX
} from 'react-icons/hi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HiHome size={20} />, path: '/admin' },
    { id: 'users', label: 'Users', icon: <HiUsers size={20} />, path: '/admin/users' },
    { id: 'courses', label: 'Courses', icon: <HiAcademicCap size={20} />, path: '/admin/courses' },
    { id: 'messages', label: 'Messages', icon: <HiMail size={20} />, path: '/admin/messages' },
    { id: 'complete-manager', label: 'Course Manager', icon: <HiAcademicCap size={20} />, path: '/admin/complete-manager' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminUser');
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        width: sidebarOpen ? '280px' : '80px'
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>A</div>
            {sidebarOpen && <span style={styles.logoText}>Admin Panel</span>}
          </div>
        </div>

        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                ...(location.pathname === item.path ? styles.navItemActive : {})
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button style={styles.logoutButton} onClick={handleLogout}>
          <HiLogout size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.menuButton}
          >
            {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          <div style={styles.headerRight}>
            <div style={styles.adminProfile}>
              <div style={styles.adminAvatar}>A</div>
              <span style={styles.adminName}>Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f3f4f6',
  },
  sidebar: {
    background: '#1f2937',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  sidebarHeader: {
    padding: '24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'white',
  },
  nav: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    color: '#9ca3af',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
  },
  navItemActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  navLabel: {},
  logoutButton: {
    margin: '16px',
    padding: '12px 16px',
    borderRadius: '10px',
    border: 'none',
    background: '#ef4444',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'white',
    padding: '20px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  menuButton: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    background: '#f3f4f6',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  adminProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  adminAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  adminName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1f2937',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '32px',
  },
};

export default AdminLayout;