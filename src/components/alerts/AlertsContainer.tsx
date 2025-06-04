import { useAlerts, Alert as AlertType } from '../../context/AlertContext';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Alert = ({ alert, onClose }: { alert: AlertType; onClose: () => void }) => {
  const icons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
  };

  const colors = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div
      className={`rounded-md border p-4 flex items-start justify-between animate-slide-down mb-2 ${colors[alert.type]}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">{icons[alert.type]}</div>
        <div>{alert.message}</div>
      </div>
      <button
        type="button"
        className="ml-4 inline-flex"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const AlertsContainer = () => {
  const { alerts, removeAlert } = useAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          alert={alert}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

export default AlertsContainer;