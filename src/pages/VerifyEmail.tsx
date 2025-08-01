// app/src/features/auth/components/VerifyEmail.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify/${token}`);
        toast({
          title: 'Email Verified',
          description: 'Your email has been successfully verified!',
          variant: 'default'
        });
        navigate('/dashboard');
      } catch (error) {
        toast({
          title: 'Verification Failed',
          description: error.response?.data?.error || 'Invalid or expired token',
          variant: 'destructive'
        });
        navigate('/login');
      }
    };

    verifyToken();
  }, [token, navigate, toast]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p>Please wait while we verify your email address.</p>
      </div>
    </div>
  );
}