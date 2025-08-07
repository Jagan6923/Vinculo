// import React, { useRef, useState, useEffect } from 'react';
// import emailjs from 'emailjs-com';
// import { useNavigate } from 'react-router-dom';
// import './cancelorder.css';

// const CancelOrder = () => {
//   const form = useRef(null); // Initialize useRef to point to the form
//   const [isOnlinePayment, setIsOnlinePayment] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     // Debugging: log the form reference to ensure it's correct
//     console.log("Form Reference: ", form.current); // This should log the form object when the component mounts
//   }, []);

//   const handlePaymentMethodChange = (e) => {
//     setIsOnlinePayment(e.target.value === 'online');
//   };

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const sendEmail = (e) => {
//     e.preventDefault();

//     // Debugging: log form data to ensure it's being accessed
//     console.log("Form Data: ", form.current);

//     // Extract the order ID from the form
//     const orderId = form.current['order_id'].value; // Correct way to access form inputs
//     console.log("Order ID: ", orderId); // Debugging: log the order ID

//     // Use EmailJS to send form data
//     emailjs.sendForm(
//       'service_b08b5r3', // Replace with your EmailJS Service ID
//       'template_zz6647i', // Replace with your EmailJS Template ID
//       form.current,
//       'ULCHCinPiLigHaIpU' // Replace with your EmailJS User ID
//     ).then(
//       (result) => {
//         console.log(result.text);
//         alert('Cancelled order!');

//         // Save the cancellation status in local storage with the order ID
//         localStorage.setItem(`orderCancelled_${orderId}`, 'true');

//         // Redirect to the Order Details page with the correct order ID
//         navigate(`/order/${orderId}`); // Dynamically navigate using the order_id
//       },
//       (error) => {
//         console.log(error.text);
//         alert('An error occurred, please try again.');
//       }
//     );

//     e.target.reset();
//   };

//   return (
//     <div className='pad'>
//       <form ref={form} onSubmit={sendEmail} className="refund-form">
//         <h2>Cancel Order</h2>

//         <div className="form-group">
//           <label>Your Name</label>
//           <input type="text" name="user_name" required />
//         </div>

//         <div className="form-group">
//           <label>Your Email</label>
//           <input type="email" name="user_email" required />
//         </div>

//         <div className="form-group">
//           <label>Payment Method</label>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="payment_method"
//                 value="online"
//                 onChange={handlePaymentMethodChange}
//                 required
//               /> Online
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="payment_method"
//                 value="offline"
//                 onChange={handlePaymentMethodChange}
//                 required
//               /> Offline
//             </label>
//           </div>
//         </div>

//         {isOnlinePayment && (
//           <div className="form-group">
//             <label>Payment ID</label>
//             <input type="text" name="payment_id" required={isOnlinePayment} />
//           </div>
//         )}

//         <div className="form-group">
//           <label>Order ID</label>
//           <input type="text" name="order_id" required /> {/* Critical for capturing the order ID */}
//         </div>

//         <div className="form-group">
//           <label>UPI ID</label>
//           <input type="text" name="UPI_ID" required />
//         </div>

//         <div className="form-group">
//           <label>Reason for CancelOrder</label>
//           <textarea name="reason" required />
//         </div>

//         <div className="form-group">
//           <label>
//             <input type="checkbox" onChange={handleCheckboxChange} /> I confirm that all the information provided is correct.
//           </label>
//         </div>

//         <button type="submit" className="submit-btn" disabled={!isChecked}>
//           Cancel Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CancelOrder;








import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import './cancelorder.css';

const CancelOrder = () => {
  const form = useRef(null); // Initialize useRef to point to the form
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Debugging: log the form reference to ensure it's correct
    console.log("Form Reference: ", form.current); // This should log the form object when the component mounts
  }, []);

  const handlePaymentMethodChange = (e) => {
    setIsOnlinePayment(e.target.value === 'online');
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Debugging: log form data to ensure it's being accessed
    console.log("Form Data: ", form.current);

    // Extract the order ID from the form
    const orderId = form.current['order_id'].value; // Correct way to access form inputs
    console.log("Order ID: ", orderId); // Debugging: log the order ID

    // Use EmailJS to send form data
    emailjs.sendForm(
      'service_b08b5r3', // Replace with your EmailJS Service ID
      'template_zz6647i', // Replace with your EmailJS Template ID
      form.current,
      'ULCHCinPiLigHaIpU' // Replace with your EmailJS User ID
    ).then(
      (result) => {
        console.log(result.text);
        alert('Cancelled order!');

        // Save the cancellation status in local storage with the order ID
        localStorage.setItem(`orderCancelled_${orderId}`, 'true');

        // Redirect to the Order Details page with the correct order ID
        navigate(`/order/${orderId}`); // Dynamically navigate using the order_id
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
        <h2>Cancel Order</h2>

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
          <>
            <div className="form-group">
              <label>Payment ID</label>
              <input type="text" name="payment_id" required={isOnlinePayment} />
            </div>

            <div className="form-group">
              <label>UPI ID</label>
              <input type="text" name="UPI_ID" required={isOnlinePayment} /> {/* UPI ID is only required for online payments */}
            </div>
          </>
        )}

        <div className="form-group">
          <label>Order ID</label>
          <input type="text" name="order_id" required /> {/* Critical for capturing the order ID */}
        </div>

        <div className="form-group">
          <label>Reason for CancelOrder</label>
          <textarea name="reason" required />
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" onChange={handleCheckboxChange} /> I confirm that all the information provided is correct.
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={!isChecked}>
          Cancel Order
        </button>
      </form>
    </div>
  );
};

export default CancelOrder;
