import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Implement your logic to handle form submission, e.g., sending data to a server
        console.log('Form data:', formData);
        // Clear the form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
            <div style={{ display: 'flex', width: '800px' }}>
                {/* Left half - Title and Paragraph */}
                <div style={{ flex: 1, textAlign: 'left', marginRight: '20px' }}>
                    <h2>Contact Us</h2>
                    <p>
                        Feel free to reach out to us with any questions, feedback, or inquiries. We'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Right half - Contact Form */}
                <div style={{ flex: 1 }}>
                    {/* Form */}
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                        {/* Name input */}
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                        {/* Email input */}
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                        {/* Subject input */}
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />

                        {/* Message input */}
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />

                        {/* Submit button */}
                        <button className="custom2-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
