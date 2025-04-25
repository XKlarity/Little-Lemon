import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <main className="p-6">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-green-600 text-white p-4 text-center">
      <h1 className="text-3xl font-bold" role="heading">Little Lemon Reservation</h1>
      <p className="text-sm">Book your table now!</p>
    </header>
  );
}

function BookingForm() {
  const [formData, setFormData] = useState({ name: '', date: '', time: '', guests: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests || formData.guests <= 0) newErrors.guests = 'Guests must be greater than 0';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert(`Reservation confirmed for ${formData.name}`);
      setFormData({ name: '', date: '', time: '', guests: '' });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="max-w-xl mx-auto bg-white p-6 rounded shadow" onSubmit={handleSubmit} aria-label="Reservation Form">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block mb-1">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          aria-invalid={!!errors.date}
        />
        {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="time" className="block mb-1">Time</label>
        <input
          id="time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          aria-invalid={!!errors.time}
        />
        {errors.time && <p className="text-red-600 text-sm">{errors.time}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="guests" className="block mb-1">Guests</label>
        <input
          id="guests"
          name="guests"
          type="number"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          aria-invalid={!!errors.guests}
        />
        {errors.guests && <p className="text-red-600 text-sm">{errors.guests}</p>}
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book Table</button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="text-center p-4 text-sm text-gray-600">
      &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
    </footer>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default BookingForm;
