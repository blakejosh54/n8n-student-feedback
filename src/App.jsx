import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    courseName: "",
    rating: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.email ||
      !formData.courseName ||
      !formData.rating ||
      !formData.message
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before submitting.",
      });
      return;
    }

    try {
      setStatus({
        type: "loading",
        message: "Submitting your feedback...",
      });

      const response = await fetch(
        "http://localhost:5678/webhook-test/student-feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus({
        type: "success",
        message:
          "Thank you for your feedback! Your response has been received successfully.",
      });

      setFormData({
        studentName: "",
        email: "",
        courseName: "",
        rating: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <main className="page">
      <section className="feedback-card">
        <div className="card-header">
          <h1>Share Your Course Feedback</h1>
          <p>
            Fill in the form below to send feedback about your learning
            experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Enter your full name"
              value={formData.studentName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="Example: Web Development"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="">Select a rating</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Feedback Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your feedback here..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {status.message && (
            <p className={`status-message ${status.type}`}>{status.message}</p>
          )}

          <button type="submit">Submit Feedback</button>
        </form>
      </section>
    </main>
  );
}

export default App;
