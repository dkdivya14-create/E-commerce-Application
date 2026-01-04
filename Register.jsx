import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', password: '', business_name: '', phone: '', address: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/register', formData);
      alert("Registration Successful! Please wait for admin approval.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Seller Signup</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} 
                   className="w-full p-2 border rounded" required />
          </div>
          <div className="col-span-2">
            <input name="password" type="password" placeholder="Password" onChange={handleChange} 
                   className="w-full p-2 border rounded" required />
          </div>
          <input name="business_name" placeholder="Business Name" onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="address" placeholder="Business Address" onChange={handleChange} 
                    className="col-span-2 w-full p-2 border rounded h-24" />
        </div>
        <button type="submit" className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Submit Application</button>
        <button type="button" onClick={() => navigate('/login')} className="w-full mt-2 text-gray-500 text-sm">Already have an account? Login</button>
      </form>
    </div>
  );
};

export default Register;