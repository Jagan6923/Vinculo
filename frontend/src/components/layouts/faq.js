import React, { useState } from 'react';
import './faq.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Vinculo's return policy?",
      answer: "You can return any item purchased from Vinculo within 6 days of delivery for a full refund. Please make sure that the product is unused, in original packaging, and has all the tags intact."
    },
    {
      question: "How do I track my Vinculo order?",
      answer: "You can track your order by logging into your Vinculo account and going to the 'My Orders' section. You'll find the latest updates about your order status there."
    },
    {
      question: "What payment methods does Vinculo accept?",
      answer: "Vinculo accepts a variety of payment methods including credit/debit cards, net banking, UPI, and cash on delivery (COD) in selected areas."
    },
  
    {
        question: " Why do I need to log in with Google?",
        answer: "Logging in with Google provides a secure and easy way to access your account without needing to remember another password. It also allows us to personalize your experience and keep track of your preferences."
      },
      
    
    {
      question: "How do I log in to the website?",
      answer: "To log in, click on the Login button on the top right corner of the homepage. Choose the Sign in with Google option and follow the prompts to authenticate using your Google account."
    },
    {
      question: "How do I cancel my order on Vinculo?",
      answer: "To cancel your order, log in to your Vinculo account, go to 'My Orders,' and select the order you wish to cancel. You'll see a 'Cancel' button next to the order if it is eligible for cancellation."
    },
    {
      question: "How does Vinculo's exchange policy work?",
      answer: "Vinculo offers an exchange policy for selected products. You can exchange an old product for a new one and get a discount on the new product based on the condition of the old one."
    },
    {
      question: "How can I contact Vinculo customer support?",
      answer: "You can contact Vinculo customer support through the 'Contact Us' section on the website. You can also call their customer service number or use the chat support available on the platform."
    },
    {
      question: "What are the contions to eligible for refund",
      answer: "To be eligible for a return, your item must be in the same condition that you received it. It must also be in the original packaging.If it's not in same condition your refund amount will be partially refund "
    }
    ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-header">Frequently Asked Questions</h1>
      {questions.map((item, index) => (
        <div key={index} className="faq-item">
          <div onClick={() => handleToggle(index)} className="faq-question">
            {item.question}
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {activeIndex === index ? '-' : '+'}
            </span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;