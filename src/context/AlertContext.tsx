import { createContext, useState, useContext, ReactNode } from 'react';

// Alert types
export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  timeout?: number;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string, timeout?: number) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (type: AlertType, message: string, timeout = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newAlert = { id, type, message, timeout };
    
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    
    if (timeout > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, timeout);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}