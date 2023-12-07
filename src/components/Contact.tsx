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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Implement your logic to handle form submission, e.g., sending data to a server
        try {
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form data submitted successfully');
                // Clear the form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                console.error('Error submitting form data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px', marginLeft: '50%' }}>
            <div style={{ display: 'flex', width: '800px' }}>
                {/* Left half - Title and Paragraph */}
                <div style={{ flex: 1, textAlign: 'left', marginRight: '20px' }}>
                    <h2>Contact Us</h2>
                    <p>Please fill out the form to send us an email.</p>
                    <h3>E-mail:</h3>
                    <p>customerservice@yourmusicemails.com</p>
                    <h3>Phone:</h3>
                    <p>(905)-316-7831</p>
                </div>

                {/* Right half - Contact Form */}
                <div style={{ flex: 1 }}>
                    {/* Form */}
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                        {/* Name input */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Name"
                            className="input-field"
                        />

                        {/* Email input */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            className="input-field"
                        />

                        {/* Subject input */}
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Subject"
                            className="input-field"
                        />

                        {/* Message input */}
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Message"
                            className="input-field"
                        />

                        {/* Submit button */}
                        <button className="custom2-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
