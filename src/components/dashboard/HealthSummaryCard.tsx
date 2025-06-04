import { useNavigate } from 'react-router-dom';
import { Activity, Heart, Droplet, Thermometer } from 'lucide-react';
import { mockVitalSigns } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

const HealthSummaryCard = () => {
  const navigate = useNavigate();
  
  // Get latest readings for each type
  const latestHeartRate = mockVitalSigns.find(
    (v) => v.type === 'heartRate'
  ) as { type: 'heartRate'; value: number; timestamp: string } | undefined;
  
  const latestBloodPressure = mockVitalSigns.find(
    (v) => v.type === 'bloodPressure'
  ) as { type: 'bloodPressure'; value: { systolic: number; diastolic: number }; timestamp: string } | undefined;
  
  const latestBloodGlucose = mockVitalSigns.find(
    (v) => v.type === 'bloodGlucose'
  ) as { type: 'bloodGlucose'; value: number; timestamp: string } | undefined;
  
  const latestOxygenSaturation = mockVitalSigns.find(
    (v) => v.type === 'oxygenSaturation'
  ) as { type: 'oxygenSaturation'; value: number; timestamp: string } | undefined;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-md">Health Snapshot</h2>
        <button 
          className="btn btn-ghost text-primary"
          onClick={() => navigate('/vitals')}
        >
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className="bg-muted rounded-lg p-4 transition-transform hover:scale-105">
          <div className="flex items-center mb-2">
            <Heart className="w-5 h-5 text-accent mr-2" />
            <h3 className="text-sm font-medium">Heart Rate</h3>
          </div>
          {latestHeartRate ? (
            <>
              <p className="text-2xl font-bold">{latestHeartRate.value} <span className="text-sm font-normal">bpm</span></p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(latestHeartRate.timestamp), { addSuffix: true })}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No data</p>
          )}
        </div>
        
        {/* Blood Pressure */}
        <div className="bg-muted rounded-lg p-4 transition-transform hover:scale-105">
          <div className="flex items-center mb-2">
            <Activity className="w-5 h-5 text-secondary mr-2" />
            <h3 className="text-sm font-medium">Blood Pressure</h3>
          </div>
          {latestBloodPressure ? (
            <>
              <p className="text-2xl font-bold">
                {latestBloodPressure.value.systolic}/{latestBloodPressure.value.diastolic}
                <span className="text-sm font-normal"> mmHg</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(latestBloodPressure.timestamp), { addSuffix: true })}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No data</p>
          )}
        </div>
        
        {/* Blood Glucose */}
        <div className="bg-muted rounded-lg p-4 transition-transform hover:scale-105">
          <div className="flex items-center mb-2">
            <Droplet className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-sm font-medium">Blood Glucose</h3>
          </div>
          {latestBloodGlucose ? (
            <>
              <p className="text-2xl font-bold">{latestBloodGlucose.value} <span className="text-sm font-normal">mg/dL</span></p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(latestBloodGlucose.timestamp), { addSuffix: true })}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No data</p>
          )}
        </div>
        
        {/* Oxygen Saturation */}
        <div className="bg-muted rounded-lg p-4 transition-transform hover:scale-105">
          <div className="flex items-center mb-2">
            <Thermometer className="w-5 h-5 text-success mr-2" />
            <h3 className="text-sm font-medium">Oxygen Saturation</h3>
          </div>
          {latestOxygenSaturation ? (
            <>
              <p className="text-2xl font-bold">{latestOxygenSaturation.value}<span className="text-sm font-normal">%</span></p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(latestOxygenSaturation.timestamp), { addSuffix: true })}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthSummaryCard;