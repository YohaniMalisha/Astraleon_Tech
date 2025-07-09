// admin-panel/src/pages/admin/login.tsx
export default function AdminLogin() {
  const [email, setEmail] = useState('admin@astraleon.tech');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      if (!data.user.isAdmin) {
        throw new Error('Admin privileges required');
      }

      localStorage.setItem('adminToken', data.token);
      router.push('/admin');
    } catch (error) {
      alert('Admin login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}