import React, { useEffect, useState } from 'react';
import { 
  HiSearch,
  HiTrash,
  HiMail,
  HiChevronLeft, 
  HiChevronRight,
  HiReply,
  HiX
} from 'react-icons/hi';

const API_URL = 'http://localhost:5000/api';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, [page]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/contact-messages?page=${page}&pageSize=10`);
      const data = await response.json();
      setMessages(data.messages);
      setTotalPages(data.totalPages);
      setTotalMessages(data.totalMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: number, userName: string) => {
    if (!confirm(`Delete message from "${userName}"?`)) return;

    try {
      const response = await fetch(`${API_URL}/Admin/contact-messages/${messageId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Message deleted successfully!');
        loadMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading messages...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Contact Messages</h1>
          <p style={styles.subtitle}>View and manage user inquiries</p>
        </div>
        <div style={styles.statsCard}>
          <HiMail size={32} color="white" />
          <div>
            <span style={styles.statsLabel}>Total Messages</span>
            <span style={styles.statsValue}>{totalMessages}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <HiSearch size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search messages by name, email, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Messages Grid */}
      <div style={styles.messagesGrid}>
        {filteredMessages.map((message) => (
          <div 
            key={message.id} 
            style={styles.messageCard}
            onClick={() => setSelectedMessage(message)}
          >
            <div style={styles.messageHeader}>
              <div style={styles.messageAvatar}>
                {message.name.charAt(0).toUpperCase()}
              </div>
              <div style={styles.messageHeaderInfo}>
                <h3 style={styles.messageName}>{message.name}</h3>
                <p style={styles.messageEmail}>{message.email}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMessage(message.id, message.name);
                }}
                style={styles.deleteIconButton}
              >
                <HiTrash size={18} />
              </button>
            </div>

            <div style={styles.messageContent}>
              <h4 style={styles.messageSubject}>{message.subject || 'No Subject'}</h4>
              <p style={styles.messageText}>
                {message.message.length > 120 
                  ? message.message.substring(0, 120) + '...'
                  : message.message
                }
              </p>
            </div>

            <div style={styles.messageFooter}>
              <span style={styles.messageDate}>
                {new Date(message.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <button style={styles.replyButton}>
                <HiReply size={16} />
                Reply
              </button>
            </div>
          </div>
        ))}
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

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div style={styles.modalOverlay} onClick={() => setSelectedMessage(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalHeaderInfo}>
                <div style={styles.modalAvatar}>
                  {selectedMessage.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={styles.modalName}>{selectedMessage.name}</h2>
                  <p style={styles.modalEmail}>{selectedMessage.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                style={styles.modalClose}
              >
                <HiX size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalSubjectSection}>
                <span style={styles.modalLabel}>Subject</span>
                <h3 style={styles.modalSubject}>
                  {selectedMessage.subject || 'No Subject'}
                </h3>
              </div>

              <div style={styles.modalMessageSection}>
                <span style={styles.modalLabel}>Message</span>
                <p style={styles.modalMessage}>{selectedMessage.message}</p>
              </div>

              <div style={styles.modalDateSection}>
                <span style={styles.modalLabel}>Received</span>
                <p style={styles.modalDate}>
                  {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.modalReplyButton}>
                <HiReply size={20} />
                Reply via Email
              </button>
              <button 
                onClick={() => handleDeleteMessage(selectedMessage.id, selectedMessage.name)}
                style={styles.modalDeleteButton}
              >
                <HiTrash size={20} />
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
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
    alignItems: 'center',
    gap: '16px',
  },
  statsLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 500,
    display: 'block',
    marginBottom: '4px',
  },
  statsValue: {
    fontSize: '32px',
    fontWeight: 800,
    color: 'white',
    display: 'block',
  },
  searchContainer: {
    marginBottom: '32px',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '600px',
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
  messagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  messageCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '2px solid transparent',
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  messageAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  messageHeaderInfo: {
    flex: 1,
    minWidth: 0,
  },
  messageName: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  messageEmail: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  deleteIconButton: {
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
    flexShrink: 0,
    transition: 'all 0.2s',
  },
  messageContent: {
    marginBottom: '16px',
  },
  messageSubject: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  messageText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.6,
    margin: 0,
  },
  messageFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
  },
  messageDate: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  replyButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    background: '#eff6ff',
    color: '#3b82f6',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  modalAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  modalName: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 4px 0',
  },
  modalEmail: {
    fontSize: '15px',
    color: '#6b7280',
    margin: 0,
  },
  modalClose: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: 'none',
    background: '#f3f4f6',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  modalSubjectSection: {},
  modalMessageSection: {},
  modalDateSection: {},
  modalLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '8px',
  },
  modalSubject: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    margin: 0,
  },
  modalMessage: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: 1.8,
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  modalDate: {
    fontSize: '15px',
    color: '#6b7280',
    margin: 0,
  },
  modalFooter: {
    padding: '24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '12px',
  },
  modalReplyButton: {
    flex: 1,
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  modalDeleteButton: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: '2px solid #fee2e2',
    background: '#fef2f2',
    color: '#ef4444',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  
  [style*="messageCard"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
    border-color: #667eea !important;
  }
  
  [style*="deleteIconButton"]:hover {
    background: #fee2e2 !important;
    transform: scale(1.1);
  }
  
  [style*="replyButton"]:hover {
    background: #dbeafe !important;
  }
  
  [style*="pageButton"]:hover:not([style*="pageButtonDisabled"]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="modalReplyButton"]:hover,
  [style*="modalDeleteButton"]:hover {
    transform: translateY(-2px);
  }
`;
document.head.appendChild(styleSheet);

export default AdminMessagesPage;