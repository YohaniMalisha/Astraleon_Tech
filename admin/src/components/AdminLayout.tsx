// admin-panel/src/components/AdminLayout.tsx

import React from 'react';
import Link from 'next/link';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Astraleon Admin</h1>
        <nav className="space-y-2">
          <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">Users</Link>
          <Link href="/admin/orders" className="block py-2 px-4 rounded hover:bg-gray-700">Orders</Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = '/admin/login';
            }}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}