import { useState } from "react";
import { createContact } from "../services/api";

function ContactForm({ onContactAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await createContact(formData);
      onContactAdded(res.data);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
  <h3 className="text-xl font-semibold mb-4 text-gray-700">
    Add New Contact
  </h3>

  <form onSubmit={handleCreate} className="space-y-4">
    <input
      name="name"
      placeholder="Full Name"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <input
      name="email"
      placeholder="Email Address"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      name="phone"
      placeholder="Phone Number"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <textarea
      name="message"
      placeholder="Notes (optional)"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
      ➕ Add Contact
    </button>
  </form>
</div>
  );
}

export default ContactForm;
