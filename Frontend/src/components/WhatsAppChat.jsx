import React, { useEffect } from 'react';

const ContactButtons = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/7972456090', '_blank');
  };

  const makeCall = () => {
    window.location.href = 'tel:+7972456090';
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.08); }
        100% { transform: scale(1); }
      }

      .pulse-button {
        animation: fadeInUp 0.6s ease, pulse 1.5s infinite ease-in-out;
        transition: transform 0.3s ease;
      }

      .pulse-button:hover {
        animation: none !important;
        transform: scale(1.1);
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        zIndex: 1000,
      }}
    >
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        title="Chat with us on WhatsApp"
        className="pulse-button"
        style={{
          backgroundColor: '#25D366',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: 35, height: 35 }}
        />
      </button>

      {/* Call Button */}
      <button
        onClick={makeCall}
        title="Call our team now!"
        className="pulse-button"
        style={{
          backgroundColor: '#128C7E',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          style={{ width: 35, height: 35 }}
        >
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.48.56 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.05 11.05 0 00.56 3.48 1 1 0 01-.21 1.11l-2.23 2.2z" />
        </svg>
      </button>
    </div>
  );
};

export default ContactButtons;
