import { Activity } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center bg-primary rounded-md p-1 mr-2">
        <Activity className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl">MediTrack</span>
    </div>
  );
};

export default Logo;