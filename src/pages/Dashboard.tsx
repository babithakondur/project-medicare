import { useEffect } from 'react';
import HealthSummaryCard from '../components/dashboard/HealthSummaryCard';
import HealthStatsChart from '../components/dashboard/HealthStatsChart';
import AlertsCard from '../components/dashboard/AlertsCard';
import MedicationsCard from '../components/dashboard/MedicationsCard';
import HealthGoalsCard from '../components/dashboard/HealthGoalsCard';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  
  // Set page title
  useEffect(() => {
    document.title = 'Dashboard | MediTrack';
  }, []);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="heading-xl">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">Here's your health overview for today</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary mr-2">
            Log Vitals
          </button>
          <button className="btn btn-outline">
            View Reports
          </button>
        </div>
      </div>
      
      <HealthSummaryCard />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthStatsChart />
        <AlertsCard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicationsCard />
        <HealthGoalsCard />
      </div>
    </div>
  );
};

export default Dashboard;