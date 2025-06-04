import { createContext, useState, useContext, ReactNode } from 'react';

// Define user types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: string;
  height?: number;
  weight?: number;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  doctors?: {
    id: string;
    name: string;
    specialty: string;
    phone?: string;
    email?: string;
  }[];
}

// Create a mock user
const mockUser: User = {
  id: '1',
  name: 'KONDUR BABITHA',
  email: 'babithakonduri465@gmail.com',
  avatar: 'public/imgs/Snapchat-932890877.jpg',
  dateOfBirth: '2005-07-20',
  gender: 'Female',
  height: 167, // in cm
  weight: 45, // in kg
  emergencyContact: {
    name: 'babitha rao',
    relationship: '',
    phone: '9121653891',
  },
  doctors: [
    {
      id: 'd1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      phone: '(555) 987-6543',
      email: 'sarah.johnson@example.com',
    },
    {
      id: 'd2',
      name: 'Dr. Michael Chen',
      specialty: 'General Practitioner',
      phone: '(555) 456-7890',
      email: 'michael.chen@example.com',
    },
  ],
};

// Create context type
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser); // Pre-filled with mock data
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-set to true for demo

  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}