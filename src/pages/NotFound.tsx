import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found | MediTrack';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="heading-lg mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button 
        className="btn btn-primary"
        onClick={() => navigate('/')}
      >
        <Home className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;