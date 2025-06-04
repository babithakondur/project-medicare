import { useState, useEffect } from 'react';
import { Activity, PlusCircle } from 'lucide-react';
import { mockVitalSigns } from '../data/mockData';
import { formatDistanceToNow, format } from 'date-fns';
import { VitalSignEntry, VitalType } from '../types/health';

// Component for displaying a vital sign reading
const VitalSignCard = ({ entry }: { entry: VitalSignEntry }) => {
  let displayValue = '';
  let unit = '';
  
  switch (entry.type) {
    case 'heartRate':
      displayValue = `${entry.value}`;
      unit = 'bpm';
      break;
    case 'bloodPressure':
      displayValue = `${entry.value.systolic}/${entry.value.diastolic}`;
      unit = 'mmHg';
      break;
    case 'bloodGlucose':
      displayValue = `${entry.value}`;
      unit = 'mg/dL';
      break;
    case 'oxygenSaturation':
      displayValue = `${entry.value}`;
      unit = '%';
      break;
    case 'temperature':
      displayValue = `${entry.value}`;
      unit = '°C';
      break;
    case 'weight':
      displayValue = `${entry.value}`;
      unit = 'kg';
      break;
    default:
      displayValue = `${(entry as any).value}`;
      unit = '';
  }
  
  return (
    <div className="border rounded-md p-4 bg-card">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium capitalize">{entry.type.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p className="text-2xl font-semibold mt-1">
            {displayValue} <span className="text-sm font-normal">{unit}</span>
          </p>
          {entry.type === 'bloodGlucose' && (entry as any).measurementContext && (
            <div className="mt-1">
              <span className="badge badge-outline capitalize">
                {(entry as any).measurementContext.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          )}
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>{format(new Date(entry.timestamp), 'MMM d, yyyy')}</p>
          <p>{format(new Date(entry.timestamp), 'h:mm a')}</p>
        </div>
      </div>
      {entry.notes && (
        <p className="mt-2 text-sm text-muted-foreground border-t border-border pt-2">
          {entry.notes}
        </p>
      )}
    </div>
  );
};

const VitalsTracker = () => {
  const [selectedType, setSelectedType] = useState<VitalType | 'all'>('all');
  const [vitalSigns, setVitalSigns] = useState(mockVitalSigns);
  
  // Set page title
  useEffect(() => {
    document.title = 'Vitals Tracker | MediTrack';
  }, []);

  // Filter vitals by type
  const filteredVitals = selectedType === 'all'
    ? vitalSigns
    : vitalSigns.filter(vital => vital.type === selectedType);

  // Sort vitals by timestamp (newest first)
  const sortedVitals = [...filteredVitals].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  // Get list of available vital types
  const availableTypes: VitalType[] = Array.from(
    new Set(vitalSigns.map(vital => vital.type))
  ) as VitalType[];

  // Type names mapping for display
  const typeNames: Record<VitalType | 'all', string> = {
    all: 'All Vitals',
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    bloodGlucose: 'Blood Glucose',
    temperature: 'Temperature',
    oxygenSaturation: 'Oxygen Saturation',
    weight: 'Weight',
    sleep: 'Sleep',
    steps: 'Steps',
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="heading-xl">Vitals Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor and record your health measurements</p>
        </div>
        
        <button className="btn btn-primary mt-4 md:mt-0">
          <PlusCircle className="h-4 w-4 mr-2" />
          Log New Vital
        </button>
      </div>
      
      {/* Filter tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        <button
          className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
            selectedType === 'all' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted hover:bg-muted-foreground/10'
          }`}
          onClick={() => setSelectedType('all')}
        >
          All Vitals
        </button>
        
        {availableTypes.map(type => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
              selectedType === type 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted-foreground/10'
            }`}
            onClick={() => setSelectedType(type)}
          >
            {typeNames[type]}
          </button>
        ))}
      </div>
      
      {/* Vitals list */}
      {sortedVitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedVitals.map((vital) => (
            <VitalSignCard key={vital.id} entry={vital} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="heading-sm mb-2">No vital signs recorded</h2>
          <p className="text-muted-foreground mb-6">
            Start tracking your health by logging your first vital sign.
          </p>
          <button className="btn btn-primary">
            <PlusCircle className="h-4 w-4 mr-2" />
            Log New Vital
          </button>
        </div>
      )}
    </div>
  );
};

export default VitalsTracker;