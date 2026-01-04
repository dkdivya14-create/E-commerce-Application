import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const res = await axiosInstance.get('/admin/pending');
      setSellers(res.data);
    } catch (err) {
      console.error("Failed to fetch");
    }
  };

  useEffect(() => { fetchSellers(); }, []);

  const handleAction = async (id, status) => {
    await axiosInstance.post('/admin/approve', { id, status });
    fetchSellers(); // Refresh list
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Pending Applications</h1>
        <div className="grid gap-4">
          {sellers.map(s => (
            <div key={s.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p className="font-bold text-lg">{s.business_name}</p>
                <p className="text-gray-500">{s.email}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleAction(s.id, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={() => handleAction(s.id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;