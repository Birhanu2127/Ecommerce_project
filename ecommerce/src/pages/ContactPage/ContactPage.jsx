import { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

export function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });

        try {
            await axios.post('http://localhost:3000/api/contact', formData);
            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus({
                submitting: false,
                success: false,
                error: error.response?.data?.error || 'Something went wrong. Please try again.'
            });
        }
    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>

            {status.success && (
                <div className="success-message">
                    Thank you for your message! We will get back to you soon.
                </div>
            )}

            {status.error && (
                <div className="error-message">
                    {status.error}
                </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                    ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={status.submitting}>
                    {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
}
