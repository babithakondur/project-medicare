import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Clock, 
  Target, 
  User, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  Bell 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import AlertsContainer from '../components/alerts/AlertsContainer';
import Logo from '../components/common/Logo';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useUser();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Vitals Tracker', href: '/vitals', icon: Activity },
    { name: 'Medications', href: '/medications', icon: Clock },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <button
          type="button"
          className="text-foreground p-2"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Logo className="h-8" />
        <div className="flex items-center">
          <button className="relative p-2">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent"></span>
          </button>
        </div>
      </div>

      {/* Sidebar for mobile (off-canvas) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-foreground/20" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 w-64 bg-card p-6 shadow-xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <Logo className="h-8" />
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {isAuthenticated && (
              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.avatar || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"}
                      alt={user?.name}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop (permanent) */}
        <nav className="hidden lg:block lg:flex-shrink-0">
          <div className="h-full w-64 border-r border-border bg-card flex flex-col">
            <div className="p-6">
              <Logo className="h-8 mb-8" />
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {isAuthenticated && (
              <div className="mt-auto p-6 border-t border-border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.avatar || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"}
                      alt={user?.name}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="py-6">
            <AlertsContainer />
            <div className="mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;