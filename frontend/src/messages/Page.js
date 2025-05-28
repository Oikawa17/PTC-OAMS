import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import TabBar from '../components/TabBar';
import './messages.css';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState(null);
  const applicationId = localStorage.getItem('application_id');
  const messagesListRef = useRef(null); // Updated ref for chat space scrolling

  const faqs = [
    { question: "What are the admission requirements?" },
    { question: "How can I check my application status?" },
    { question: "What are the available payment methods?" },
    { question: "When is the enrollment period?" }
  ];

  useEffect(() => {
    if (!applicationId) return;
    fetch(`http://localhost:5000/messages/${applicationId}`)
      .then(res => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [applicationId]);

  useEffect(() => {
    if (!applicationId) return;
    fetch(`http://localhost:5000/profile/${applicationId}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile(null));
  }, [applicationId]);

  // Scroll to bottom of messages container when messages update
  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messages]); // Scrolls only within the chat space

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      application_id: applicationId,
      sender: 'user',
      message: input
    };

    await fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg)
    });

    setMessages([...messages, { ...newMsg, created_at: new Date().toISOString() }]);
    setInput('');

    // Show automated message briefly after sending
    setTimeout(() => {
      const automatedMsg = {
        application_id: applicationId,
        sender: 'system',
        message: "Thank you for reaching out. The administrator is currently unavailable at the moment and will get back to you at 24-48 business hours. In the meantime, for egneral inquiries you can visit the FAQ page. For additional assistance and detailed help, kindly refer to ptcoams.help.support and submit a ticket.",
        created_at: new Date().toISOString()
      };

      setMessages((prevMessages) => [...prevMessages, automatedMsg]);
    }, 1000);
  };

  return (
    <div>
      <TabBar profile={profile} />
      <div className="messages-container">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="messages-content">
          <div className="messages-panel">
            <div className="messages-title">Messages</div>
            <div className="messages-subtitle">
              Contact admissions staff for inquiries about your application.
            </div>
            <div className="messages-list" ref={messagesListRef}> {/* Updated scrollable container */}
              {messages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                const isAdmin = msg.sender === 'admin';
                const isSystem = msg.sender === 'system';
                return (
                  <div key={idx} className={`message-row ${isUser ? 'user' : isSystem ? 'system' : 'admin'}`}>
                    <div className={`message-bubble ${isUser ? 'user' : isSystem ? 'system' : 'admin'}`}>
                      <strong>{isUser ? 'You' : isSystem ? 'System' : 'Admin'}</strong>
                      {msg.message}
                      <div className="message-date">
                        {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={sendMessage} className="messages-form">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="messages-input"
              />
              <button type="submit" className="messages-send-btn">➤</button>
            </form>
            <div className="messages-response-time">
              <span>⏱️ Typical response time: 24-48 hours</span>
            </div>
          </div>
          {/* FAQ Section */}
          <div className="messages-faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="messages-faq-list">
              {faqs.map((faq, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="messages-faq-item"
                  onClick={() => setInput(faq.question)}
                  title="Click to use this question"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Messages;
