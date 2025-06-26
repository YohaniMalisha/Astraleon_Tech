// Update NotFound.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center max-w-md p-8 glass-effect">
        <h1 className="text-9xl font-bold mb-4 text-primary">404</h1>
        <p className="text-2xl mb-6">Page Not Found</p>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/" className="text-lg">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
