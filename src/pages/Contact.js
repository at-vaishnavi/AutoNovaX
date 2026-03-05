import React, { useState } from "react";
// Import CSS file for styling the Contact page
import "./../styles/Contact.css";

function Contact() {
  // useState hook to manage form data state as an object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle input changes and update state dynamically
  const handleChange = (e) => {
    // Use computed property name to update correct field
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    alert("Form submitted successfully! We will contact you soon.");
    console.log("Form Data:", formData); // Log the form data for debugging

    // You can add API call here to send data to backend/server if needed
  };

  return (
    // Main container for contact page content
    <div className="contact-container">

      {/* Page heading */}
      <h1>Contact Us</h1>

      {/* Static contact info displayed */}
      <p className="contact-info">📧 Email: autonovax2015@gmail.com</p>
      <p className="contact-info">📞 Phone: +91 9876543210</p>
      <p className="contact-info">🕒 Working Hours: 9 AM to 6 PM</p>

      {/* Contact form container */}
      <div className="contact-form">
        <h2>Get in Touch</h2>

        {/* Form element with onSubmit handler */}
        <form onSubmit={handleSubmit}>

          {/* Name input */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone input (optional) */}
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Message textarea */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          {/* Submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
