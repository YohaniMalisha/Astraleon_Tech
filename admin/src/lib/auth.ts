import { jwtDecode } from 'jwt-decode';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const loginAdmin = async (email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error('Login failed');
  
  const { token } = await res.json();
  const user = jwtDecode<AdminUser>(token);

  if (!user.isAdmin) {
    throw new Error('Admin access required');
  }

  localStorage.setItem('adminToken', token);
  return user;
};

export const getCurrentAdmin = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return null;
  return jwtDecode<AdminUser>(token);
};