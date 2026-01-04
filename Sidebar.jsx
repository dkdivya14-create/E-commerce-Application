import React from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 text-blue-400">Admin Pro</h2>
      <nav className="flex-1 space-y-4">
        <button className="block w-full text-left hover:text-blue-400">Dashboard</button>
        <button className="block w-full text-left hover:text-blue-400">Pending Sellers</button>
        <button className="block w-full text-left hover:text-blue-400">Settings</button>
      </nav>
      <button onClick={logout} className="mt-auto bg-red-600 p-2 rounded text-sm">Logout</button>
    </div>
  );
};

export default Sidebar;