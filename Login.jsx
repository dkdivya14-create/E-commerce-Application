import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/login', { email, password });
      login(res.data.token, res.data.role);
      
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        alert("Logged in! Status: " + res.data.status);
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">System Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                 className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                 className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
        <p className="mt-4 text-center text-sm text-gray-600">
        <span onClick={() => navigate('/register')} className="text-blue-600 cursor-pointer">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;