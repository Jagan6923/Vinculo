import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RefundForm.css'; // Import the CSS file

const RefundForm = () => {
  const form = useRef();
  const [formType, setFormType] = useState('refund'); // State to manage form type
  const [isOnlinePayment, setIsOnlinePayment] = useState(false); // State to manage payment method for Refund

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setIsOnlinePayment(e.target.value === 'online');
  };

  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_b08b5r3',       // Replace with your EmailJS Service ID
      formType === 'refund' ? 'template_zz6647i' : 'template_8ar9qrb', // Use different templates for Refund and Exchange
      form.current,
      'ULCHCinPiLigHaIpU'      // Replace with your EmailJS User ID
    ).then(
      (result) => {
        console.log(result.text);
        alert(`${formType === 'refund' ? 'Refund' : 'Exchange'} request sent successfully!`);
      },
      (error) => {
        console.log(error.text);
        alert('An error occurred, please try again.');
      }
    );
    e.target.reset();
  };

  return (
    <div className='pad'>
      <form ref={form} onSubmit={sendEmail} className="refund-form">
        <h2>{formType === 'refund' ? 'Refund Request' : 'Exchange Request'}</h2>

        <div className="form-group">
          <label>Request Type</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="form_type" 
                value="refund" 
                onChange={handleFormTypeChange} 
                checked={formType === 'refund'}
                required 
              /> Refund
            </label>
            <label>
              <input 
                type="radio" 
                name="form_type" 
                value="exchange" 
                onChange={handleFormTypeChange} 
                checked={formType === 'exchange'}
                required 
              /> Exchange
            </label>
          </div>
        </div>

        {formType === 'refund' && (
          <>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="user_name" required />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input type="email" name="user_email" required />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div>
                <label>
                  <input 
                    type="radio" 
                    name="payment_method" 
                    value="online" 
                    onChange={handlePaymentMethodChange} 
                    required 
                  /> Online
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="payment_method" 
                    value="offline" 
                    onChange={handlePaymentMethodChange} 
                    required 
                  /> Offline
                </label>
              </div>
            </div>

            {isOnlinePayment && (
              <div className="form-group">
                <label>Payment ID</label>
                <input type="text" name="payment_id" required={isOnlinePayment} />
              </div>
            )}

            <div className="form-group">
              <label>Order ID</label>
              <input type="text" name="order_id" required />
            </div>

            <div className="form-group">
              <label>UPI ID</label>
              <input type="text" name="UPI_ID" required />
            </div>

            <div className="form-group">
              <label>Reason for Refund</label>
              <textarea name="reason" required />
            </div>
          </>
        )}

        {formType === 'exchange' && (
          <>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="user_name" required />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input type="email" name="user_email" required />
            </div>

            <div className="form-group">
              <label>Your Phone Number</label>
              <input type="text" name="user_phone" required />
            </div>

            <div className="form-group">
              <label>Select Size</label>  
              <select name="size" required>
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reason for Exchange</label>
              <textarea name="reason" required />
            </div>
          </>
        )}

        <button type="submit" className="submit-btn">
          Submit {formType === 'refund' ? 'Refund' : 'Exchange'} Request
        </button>
      </form>
    </div>
  );
};



export default RefundForm;
