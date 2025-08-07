import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CardLayout = () => {
  return (
    <div style={styles.container}>
      {/* Top Section */}
      <div style={styles.topSection}>
        <div style={styles.userInfo}>
          <h2>Welcome to Vinculo!</h2>
         </div>
      </div>

      {/* Action Links */}
      <div style={styles.buttonsContainer}>
        <Link to="/about" style={styles.button}>About Us</Link>
        <Link to="/terms-conditions" style={styles.button}>Terms and Conditions</Link>
        <Link to="/faq" style={styles.button}>FAQ</Link>
        <Link to="/refund-policy" style={styles.button}>Refund Policy</Link>
        <Link to="/privacy-policy" style={styles.button}>Privacy Policy</Link>
        <Link to="/contactus" style={styles.button}>Contact Us</Link>
        <Link to="/return-exchange-policy" style={styles.button}>Return and Exchange Policy</Link>
        <Link to="/track-order" style={styles.button}>Track Order</Link>
        <Link to="/shipping-policy" style={styles.button}>Shipping Policy</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '100px'
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    fontSize: '16px',
  },
  buttonsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    margin: '20px 0',
  },
  button: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textAlign: 'center',
    textDecoration: 'none', // Ensures links look like buttons
    color: 'black', // Text color
  },
};

export default CardLayout;
