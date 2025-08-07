import React, { useState } from 'react';

import './Returnproduct.css';

const ReturnProduct = () => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [invoice, setInvoice] = useState(null);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleInvoiceUpload = (e) => {
    setInvoice(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('reason', reason);
    formData.append('description', description);
    formData.append('invoice', invoice);

    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/return-product`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Return request submitted successfully:', data);
        alert('Return request submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting return request:', error);
        alert('Failed to submit return request.');
      });
  };

  return (
    <div className="return-product-page">
      <h2>Return Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Reason for Return</label>
          <select
            id="reason"
            value={reason}
            onChange={handleReasonChange}
            required
          >
            <option value="" disabled>
              Select a reason
            </option>
            <option value="Damaged Product">Damaged Product</option>
            <option value="Wrong Product Delivered">Wrong Product Delivered</option>
            <option value="Size Issue">Size Issue</option>
            <option value="Quality Issue">Quality Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Additional Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Provide any additional details about your return..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoice">Upload Invoice</label>
          <input
            type="file"
            id="invoice"
            onChange={handleInvoiceUpload}
            accept=".jpg, .jpeg, .png, .pdf"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReturnProduct;
