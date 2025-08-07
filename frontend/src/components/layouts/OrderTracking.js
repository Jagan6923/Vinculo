import React, { useState, useEffect } from 'react';

function OrderTracking() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = () => {
    window.location.href = 'https://www.shiprocket.in/shipment-tracking/'; // Replace with your external URL
  };

  const containerStyle = {
    padding: '50px',
    textAlign: 'center',
    maxWidth: windowWidth >= 768 ? '600px' : '100%',
    margin: '0 auto',
    marginTop: '40px',
  };

  const headingStyle = {
    fontSize: windowWidth >= 768 ? '36px' : '24px',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    fontSize: windowWidth >= 768 ? '18px' : '16px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: 'green', // Increment button color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: windowWidth >= 768 ? '18px' : '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e8a74e', // Slightly darker shade for hover effect
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Track your order</h1>
      <p style={paragraphStyle}>
        By clicking the below button, you will navigate to a third-party application (Shiprocket).
      </p>
      <p>You need to provide OrderId and registered mobile number or email,to track the order.</p>
      <button
        style={buttonStyle}
        onClick={handleButtonClick}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Track order
      </button>
    </div>
  );
}

export default OrderTracking;
