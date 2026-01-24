import React, { useState, useRef, useEffect } from "react";
import { HiX, HiPaperAirplane, HiChatAlt2 } from "react-icons/hi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  "hello": "👋 Hello! Welcome to SrinuTechGuru Learning Management System. I'm here to help! What can I assist you with today?",
  "hi": "👋 Hello! Welcome to SrinuTechGuru. How can I help you?",
  
  // Courses
  "courses": "📚 We offer a wide variety of courses across different categories:\n• Programming & Web Development\n• Data Science & Analytics\n• Cloud & DevOps\n• Mobile Development\n• UI/UX Design\n\nVisit our home page to browse all available courses or click 'Courses' in the menu!",
  "course": "📚 Check out our course catalog! You can:\n• Browse all courses from the home page\n• View course details, ratings, and reviews\n• See instructor information\n• Check pricing and what's included\n• Read student feedback\n\nJust click on any course to learn more!",
  "category": "📚 Our courses are organized by category. Use the Courses menu to filter and find courses in your area of interest!",
  "instructor": "👨‍🏫 Each course has an experienced instructor. You can view:\n• Their name and expertise\n• Number of courses they teach\n• Student reviews\n• Course details\n\nThis information is displayed on the course details page.",
  
  // Enrollment
  "enroll": "✅ Enrolling is easy!\n1. Browse courses and click on the one you like\n2. Click 'Add to Cart' or 'Buy Now'\n3. Review your cart\n4. Complete payment\n5. Start learning immediately!\n\nOnce enrolled, you'll see the course in 'My Learning' section.",
  "enrollment": "✅ To enroll in a course:\n• Click 'Add to Cart' to purchase later\n• Click 'Buy Now' for immediate enrollment\n• Go to your cart and checkout\n• Payment is secure and encrypted\n• Instant access after payment!",
  "how to enroll": "✅ Simple enrollment process:\n1. Find a course you like\n2. Click 'Add to Cart' (to buy later) or 'Buy Now' (instant)\n3. Go to shopping cart\n4. Enter payment details\n5. Confirm purchase\n6. Access course immediately!",
  "my learning": "📖 Your 'My Learning' section shows:\n• All courses you've enrolled in\n• Course progress\n• Your certificates\n• Learning history\n\nAccess it from the header menu!",
  "enrolled courses": "📖 View your enrolled courses in 'My Learning' (available in the header menu after login). You'll see your progress and can resume learning anytime!",
  
  // Payment
  "payment": "💳 Payment Information:\n• We accept credit cards & debit cards\n• All payments are secure and encrypted\n• Payment gateway is PCI-DSS compliant\n• Instant confirmation after payment\n• No hidden charges\n\nYour transaction is protected!",
  "price": "💰 Course Pricing:\n• Prices vary by course\n• Many courses have discounts available\n• See pricing on individual course pages\n• Check your cart before checkout\n\nVisit a course page to see current pricing!",
  "discount": "🎉 We offer special discounts and promotions!\n• Follow our social media for exclusive deals\n• Check course pages for active sales\n• Seasonal promotions throughout the year\n\nKeeep an eye out for limited-time offers!",
  "cost": "💰 Course costs depend on the specific course. You can see the price on each course's detail page. Many courses offer discounts - check the current pricing!",
  
  // Refunds & Guarantees
  "refund": "💵 Our Refund Policy:\n✅ 30-Day Money-Back Guarantee\n• Full refund within 30 days of purchase\n• No questions asked\n• Easy refund process\n• Your satisfaction is our priority\n\nIf you're not happy, we'll refund your money!",
  "money back": "💵 Yes! We offer a 30-Day Money-Back Guarantee.\n• Enroll risk-free\n• Get full refund within 30 days if not satisfied\n• Easy refund process\n• No complicated terms",
  "guarantee": "✅ 30-Day Money-Back Guarantee:\n• Get a full refund if not satisfied\n• Valid for 30 days after purchase\n• No questions asked\n• Contact our support team to request",
  "refund policy": "💵 Our Refund Policy:\n• 30-day money-back guarantee\n• Full refund if dissatisfied\n• Simple refund process\n• Contact support for assistance",
  
  // Certificates
  "certificate": "🎓 Certificate of Completion:\n✅ You'll receive a certificate after completing a course\n• Digital certificate (downloadable)\n• Shareable on LinkedIn and resumes\n• Proves your skills and commitment\n• Add to your professional portfolio\n\nCertificates are issued upon 100% course completion!",
  "certification": "🎓 Upon completing a course, you receive:\n• Certificate of Completion\n• Digital credential\n• Shareable certificate\n• Professional recognition\n\nDisplay it proudly on your profile!",
  "certificate of completion": "🎓 Yes! Complete a course and earn a Certificate of Completion. It's digital, downloadable, and perfect for your resume and LinkedIn profile!",
  
  // Access & Duration
  "access": "🎯 Course Access:\n✅ Lifetime Access Guarantee\n• Access all course materials forever\n• Watch videos anytime, anywhere\n• Download resources\n• Revisit lessons as needed\n• Never expires!\n\nYour investment lasts a lifetime!",
  "lifetime": "♾️ Yes! You get Lifetime Access:\n• Access courses forever\n• Revisit materials anytime\n• Get updates for free\n• No expiration date\n• Full course access preserved",
  "duration": "⏱️ Course Duration:\n• Varies by course\n• Self-paced learning\n• Learn at your own speed\n• Access lifetime\n• No time limits\n\nCheck the course details for estimated duration!",
  "how long": "⏱️ Courses are self-paced:\n• No strict time limits\n• Complete at your speed\n• Estimated hours shown on course page\n• Access lifetime\n• Learn whenever you want",
  
  // Account & Profile
  "profile": "👤 Your Profile:\n• View and edit your information\n• Upload profile photo\n• Add social media links\n• Update bio\n• Manage account settings\n\nVisit the Profile page to manage your account!",
  "account": "🔐 Account Management:\n• Login/Sign up securely\n• Update profile information\n• View enrollment history\n• Track progress\n• Download certificates\n\nAll your learning in one place!",
  "login": "🔐 How to Login:\n• Click 'Log in' button in header\n• Enter your email and password\n• Secure login with encryption\n• Create account if new user\n\nYour account is protected!",
  "sign up": "📝 Getting Started:\n• Click 'Sign Up' button\n• Enter your email and create password\n• Complete registration\n• Start browsing courses\n• Begin your learning journey!\n\nIt's free to join!",
  
  // Support
  "support": "💬 Need Help?\n• Visit our Contact page\n• Email our support team\n• We respond within 24 hours\n• Available for all your questions\n• Professional and friendly support\n\nDon't hesitate to reach out!",
  "contact": "📧 Contact Us:\n• Visit the Contact page (in menu)\n• Send us your message\n• Get response within 24 hours\n• Support team available\n• Dedicated to helping you",
  "help": "🆘 How can we help?\n• Courses - Browse and enroll\n• Enrollment - How to join courses\n• Payment - Secure transactions\n• Refunds - 30-day guarantee\n• Certificates - Proof of completion\n• Support - Contact our team\n\nWhat would you like to know?",
  
  // Career & Learning
  "career": "💼 Career Growth:\n• Learn in-demand skills\n• Industry expert instructors\n• Practical projects\n• Certificates for your resume\n• Advance your career\n\nMany students launch new careers after our courses!",
  "learning": "📚 Learning Path:\n1. Choose a course\n2. Enroll and start learning\n3. Complete lessons at your pace\n4. Track your progress\n5. Earn certificate\n6. Apply new skills\n\nYour learning journey starts here!",
  "skills": "🎯 Skill Development:\n• Learn from industry experts\n• Hands-on practical content\n• Real-world projects\n• Up-to-date curriculum\n• Certificates to showcase skills\n\nGain skills that matter!",
  
  // General/Fallback
  "default": "I'm not sure about that. I can help with:\n• 📚 Courses - Browse & learn\n• ✅ Enrollment - How to join\n• 💳 Payment - Secure transactions\n• 💵 Refunds - 30-day guarantee\n• 🎓 Certificates - Proof of completion\n• 💬 Support - Contact our team\n\nOr visit our Contact page for more help!",
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm your SrinuTechGuru assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close chatbot on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const findBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase().trim();
    
    // Exact match first
    if (FAQ_RESPONSES[lowerInput]) {
      return FAQ_RESPONSES[lowerInput];
    }

    // Partial match
    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (key !== "default" && (lowerInput.includes(key) || key.includes(lowerInput))) {
        return response;
      }
    }

    // Default response
    return FAQ_RESPONSES["default"];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      {/* Floating Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={styles.floatingButton}
          title="Open Chat"
        >
          <HiChatAlt2 size={24} />
          <span style={styles.badge}>?</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <h3 style={styles.title}>SrinuTechGuru Support</h3>
              <p style={styles.subtitle}>Typically replies in minutes</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
              title="Close Chat"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div style={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.messageWrapper,
                  ...(message.sender === "user"
                    ? styles.userMessageWrapper
                    : styles.botMessageWrapper),
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage),
                  }}
                >
                  <p style={styles.messageText}>{message.text}</p>
                  <span style={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={styles.botMessageWrapper}>
                <div style={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={styles.input}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={{
                ...styles.sendButton,
                ...(inputValue.trim()
                  ? styles.sendButtonActive
                  : styles.sendButtonDisabled),
              }}
              title="Send Message"
            >
              <HiPaperAirplane size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatbotContainer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 98,
    pointerEvents: "none",
  },
  floatingButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
    zIndex: 98,
    transition: "all 0.3s ease",
    pointerEvents: "auto",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#ef4444",
    color: "white",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
  },
  chatWindow: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "420px",
    height: "600px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: 99,
    overflow: "hidden",
    maxHeight: "calc(100vh - 100px)",
    pointerEvents: "auto",
    '@media (max-width: 768px)': {
      width: "calc(100vw - 20px)",
      height: "calc(100vh - 100px)",
      bottom: "10px",
      right: "10px",
    },
  } as React.CSSProperties & { '@media (max-width: 768px)'?: any },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    opacity: 0.9,
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    transition: "all 0.2s",
    fontSize: "20px",
    minWidth: "40px",
    minHeight: "40px",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#f9fafb",
  },
  messageWrapper: {
    display: "flex",
    marginBottom: "8px",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  botMessageWrapper: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: "12px 16px",
    borderRadius: "12px",
    wordWrap: "break-word",
  },
  userMessage: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderBottomRightRadius: "4px",
  },
  botMessage: {
    background: "white",
    color: "#374151",
    border: "1px solid #e5e7eb",
    borderBottomLeftRadius: "4px",
  },
  messageText: {
    margin: "0 0 6px 0",
    fontSize: "14px",
    lineHeight: "1.4",
    whiteSpace: "pre-wrap",
  },
  timestamp: {
    fontSize: "11px",
    opacity: 0.7,
  },
  typingIndicator: {
    display: "flex",
    gap: "4px",
    padding: "12px 16px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    borderBottomLeftRadius: "4px",
  },
  inputContainer: {
    display: "flex",
    gap: "8px",
    padding: "16px",
    background: "white",
    borderTop: "1px solid #e5e7eb",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "24px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
    backgroundColor: "#f9fafb",
  },
  sendButton: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  sendButtonActive: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  },
  sendButtonDisabled: {
    background: "#e5e7eb",
    color: "#9ca3af",
    cursor: "not-allowed",
  },
};
