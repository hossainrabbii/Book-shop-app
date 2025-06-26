import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <title>Contact - PageTurner</title>
      <section className="p-6 md:p-12 max-w-3xl mx-auto">
        <div className="contact_banner text-center"></div>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>

        <p className="text-lg text-gray-700 mb-6">
          Have a question, suggestion, or partnership inquiry? We'd love to hear
          from you! Fill out the form below or reach us directly through the
          contact information provided.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="text-gray-700">
          <p>
            <strong>Email:</strong> mdhosen21018@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +880 1734054746
          </p>
          <p>
            <strong>Address:</strong> Mohammadpur, Dhaka-1207
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;
