import React, { useEffect, useState } from 'react';
import { HiSearch, HiTrash, HiPencil, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const API_URL = 'http://localhost:5000/api';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  profileImageUrl: string | null;
  createdAt: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/users?page=${page}&pageSize=10`);
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/Admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        alert('Role updated successfully!');
        setEditingUser(null);
        loadUsers();
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;

    try {
      const response = await fetch(`${API_URL}/Admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('User deleted successfully!');
        loadUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading users...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>User Management</h1>
          <p style={styles.subtitle}>Manage all registered users</p>
        </div>
        <div style={styles.statsCard}>
          <span style={styles.statsLabel}>Total Users</span>
          <span style={styles.statsValue}>{totalUsers}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <HiSearch size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Users Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Joined</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>
                    <div style={styles.userCell}>
                      <div style={styles.avatar}>
                        {user.profileImageUrl ? (
                          <img 
                            src={`http://localhost:5000${user.profileImageUrl}`} 
                            alt={user.fullName}
                            style={styles.avatarImage}
                          />
                        ) : (
                          <span style={styles.avatarText}>
                            {user.fullName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span style={styles.userName}>{user.fullName}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    {editingUser?.id === user.id ? (
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        style={styles.roleSelect}
                      >
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Admin">Admin</option>
                      </select>
                    ) : (
                      <span style={styles.roleBadge}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      {editingUser?.id === user.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateRole(user.id)}
                            style={styles.saveButton}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            style={styles.cancelButton}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setNewRole(user.role);
                            }}
                            style={styles.editButton}
                          >
                            <HiPencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id, user.fullName)}
                            style={styles.deleteButton}
                          >
                            <HiTrash size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              ...styles.pageButton,
              ...(page === 1 ? styles.pageButtonDisabled : {})
            }}
          >
            <HiChevronLeft size={20} />
            Previous
          </button>
          
          <span style={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              ...styles.pageButton,
              ...(page === totalPages ? styles.pageButtonDisabled : {})
            }}
          >
            Next
            <HiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  loadingContainer: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#6b7280',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  statsCard: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '20px 32px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 500,
  },
  statsValue: {
    fontSize: '32px',
    fontWeight: 800,
    color: 'white',
  },
  searchContainer: {
    marginBottom: '24px',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '500px',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
  },
  tableCard: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '16px 20px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#6b7280',
    background: '#f9fafb',
    borderBottom: '2px solid #e5e7eb',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'background 0.2s',
  },
  td: {
    padding: '16px 20px',
    fontSize: '14px',
    color: '#1f2937',
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: 600,
    color: '#1f2937',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    background: '#f3f4f6',
    color: '#1f2937',
  },
  roleSelect: {
    padding: '6px 12px',
    borderRadius: '8px',
    border: '2px solid #667eea',
    fontSize: '13px',
    fontWeight: 600,
    outline: 'none',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: '#eff6ff',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  deleteButton: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: '#fef2f2',
    color: '#ef4444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  saveButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    background: '#10b981',
    color: 'white',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    background: '#6b7280',
    color: 'white',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderTop: '1px solid #f3f4f6',
  },
  pageButton: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    background: 'white',
    color: '#1f2937',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  pageButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  [style*="searchInput"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  [style*="tr"]:hover {
    background: #f9fafb !important;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  [style*="editButton"]:hover {
    background: #dbeafe !important;
  }
  
  [style*="deleteButton"]:hover {
    background: #fee2e2 !important;
  }
  
  [style*="pageButton"]:hover:not([style*="pageButtonDisabled"]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
`;
document.head.appendChild(styleSheet);

export default AdminUsersPage;