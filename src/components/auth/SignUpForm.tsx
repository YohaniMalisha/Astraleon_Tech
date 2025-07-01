import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: { email: string; password: string; name: string }) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success('Account created! Verification email sent.');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input 
        {...register('name')} 
        placeholder="Full Name" 
        required 
        className="w-full p-2 border rounded"
      />
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}