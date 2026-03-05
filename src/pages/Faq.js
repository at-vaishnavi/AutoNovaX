import React, { useState } from "react";
import "../styles/Faq.css"; 

const faqs = [
  {
    question: "What types of spare parts do you sell?",
    answer: "We provide high-quality spare parts for four-wheelers, including electrical components, engine parts, suspension systems, and more."
  },
  {
    question: "Are all your spare parts genuine?",
    answer: "Yes, we only supply genuine and high-performance spare parts from trusted manufacturers and brands."
  },
  {
    question: "What brands do you distribute?",
    answer: "We are authorized distributors for brands like AUTOLEK, ANUPAM, and other reputed automobile spare parts manufacturers."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Returns and exchanges are subject to our return policy. Please contact us within 7 days of purchase for assistance."
  },
  {
    question: "Do you provide bulk orders for businesses?",
    answer: "Yes, we cater to bulk orders for automobile workshops, dealerships, and businesses. Special pricing is available for bulk purchases."
  },
  {
    question: "What are your working hours?",
    answer: "We are open from 9 AM to 6:00 PM, Monday to Saturday."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via email at autonovax2015@gmail.com or call us at +91 9876543210."
  },
  {
    question: "Do you offer a warranty on your spare parts?",
    answer: "Yes, warranty policies depend on the manufacturer. Contact us for specific warranty details on a product."
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="arrow">{activeIndex === index ? "▲" : "▼"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
