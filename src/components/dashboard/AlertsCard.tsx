import { useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { mockHealthAlerts } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

const AlertsCard = () => {
  const [alerts, setAlerts] = useState(mockHealthAlerts);
  
  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const alertTypeClasses = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    low: 'bg-yellow-50 border-yellow-200',
    high: 'bg-yellow-50 border-yellow-200',
    critical: 'bg-red-50 border-red-200',
    reminder: 'bg-purple-50 border-purple-200',
  };

  const alertTypeTextClasses = {
    info: 'text-blue-700',
    success: 'text-green-700',
    warning: 'text-yellow-700',
    low: 'text-yellow-700',
    high: 'text-yellow-700',
    critical: 'text-red-700',
    reminder: 'text-purple-700',
  };

  // Sort alerts by timestamp (most recent first) and unread first
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-md">Recent Alerts</h2>
        <span className="badge badge-primary">{alerts.filter(a => !a.read).length} New</span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 border rounded-md transition-all ${alertTypeClasses[alert.type]} ${!alert.read ? 'ring-2 ring-primary/30' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-medium ${alertTypeTextClasses[alert.type]}`}>{alert.title}</h3>
                  <p className="text-sm mt-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                  </p>
                </div>
                {!alert.read && (
                  <button 
                    className="text-muted-foreground hover:text-primary ml-2 p-1"
                    onClick={() => markAsRead(alert.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p>No alerts at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsCard;