import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import { PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', isAdmin: false });

  // Fetch users with search and pagination
  const { data: users, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-users', searchTerm],
    queryFn: async () => {
      const { data } = await api.get('/admin/users', {
        params: { search: searchTerm }
      });
      return data.users;
    }
  });

  // Update user mutation
  const { mutate: updateUser } = useMutation({
    mutationFn: (updatedUser: any) => 
      api.put(`/admin/users/${updatedUser.id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      setEditingUserId(null);
      toast.success('User updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  });

  // Delete user mutation
  const { mutate: deleteUser } = useMutation({
    mutationFn: (userId: string) => api.delete(`/admin/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      toast.success('User deleted successfully');
    }
  });

  const handleEdit = (user: any) => {
    setEditingUserId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUserId) {
      updateUser({ id: editingUserId, ...editForm });
    }
  };

  if (isLoading) return (
    <div className="flex justify-center py-8">
      <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );

  if (isError) return (
    <div className="text-red-500 p-4">
      Error loading users. 
      <button onClick={() => refetch()} className="ml-2 text-blue-500">
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user: any) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{user.email}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <select
                      value={editForm.isAdmin ? 'admin' : 'user'}
                      onChange={(e) => setEditForm({...editForm, isAdmin: e.target.value === 'admin'})}
                      className="border rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingUserId === user._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSubmit}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this user?')) {
                            deleteUser(user._id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}