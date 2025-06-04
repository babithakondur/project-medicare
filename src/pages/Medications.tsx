import { useState, useEffect } from 'react';
import { Clock, PlusCircle, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { mockMedications } from '../data/mockData';
import { formatDistanceToNow, format, parseISO, isFuture, isPast, isToday } from 'date-fns';
import { Medication } from '../types/health';

// Component for displaying a medication card
const MedicationCard = ({ medication }: { medication: Medication }) => {
  const refillSoon = medication.refillReminder && 
                     medication.refillDate && 
                     isFuture(parseISO(medication.refillDate)) && 
                     formatDistanceToNow(parseISO(medication.refillDate), { addSuffix: true }).includes('in');
  
  const isActive = isPast(parseISO(medication.startDate)) && 
                   (!medication.endDate || isFuture(parseISO(medication.endDate)));

  return (
    <div className={`border rounded-md p-4 bg-card transition-all ${refillSoon ? 'border-warning' : ''}`}>
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{medication.name}</h3>
          <p className="text-sm">{medication.dosage} - {medication.frequency}</p>
          
          <div className="flex flex-wrap mt-2 gap-2">
            {medication.timeOfDay.map(time => (
              <span key={time} className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted">
                <Clock className="h-3 w-3 mr-1" />
                {time}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className={`badge ${isActive ? 'badge-primary' : 'badge-outline'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
          {refillSoon && (
            <div className="mt-2 text-xs flex items-center justify-end text-warning">
              <AlertCircle className="h-3 w-3 mr-1" />
              Refill soon
            </div>
          )}
        </div>
      </div>
      
      {medication.instructions && (
        <p className="mt-3 text-sm text-muted-foreground border-t border-border pt-2">
          <span className="font-medium">Instructions:</span> {medication.instructions}
        </p>
      )}
      
      <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-2 flex justify-between">
        <span>
          Started: {format(parseISO(medication.startDate), 'MMM d, yyyy')}
        </span>
        {medication.endDate && (
          <span>
            Ends: {format(parseISO(medication.endDate), 'MMM d, yyyy')}
          </span>
        )}
      </div>
    </div>
  );
};

const Medications = () => {
  const [medications, setMedications] = useState(mockMedications);
  const [filter, setFilter] = useState<'all' | 'active' | 'today'>('all');
  
  // Set page title
  useEffect(() => {
    document.title = 'Medications | MediTrack';
  }, []);

  // Filter medications based on selected filter
  const filteredMedications = medications.filter(med => {
    if (filter === 'all') return true;
    
    const startDate = parseISO(med.startDate);
    const endDate = med.endDate ? parseISO(med.endDate) : null;
    
    if (filter === 'active') {
      return isPast(startDate) && (!endDate || isFuture(endDate));
    }
    
    if (filter === 'today') {
      return isPast(startDate) && 
             (!endDate || isFuture(endDate)) && 
             (isToday(startDate) || (endDate && isToday(endDate)));
    }
    
    return true;
  });

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="heading-xl">Medications</h1>
          <p className="text-muted-foreground mt-1">Manage your medications and reminders</p>
        </div>
        
        <button className="btn btn-primary mt-4 md:mt-0">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Medication
        </button>
      </div>
      
      {/* Filter tabs */}
      <div className="flex space-x-2">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('active')}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Active
        </button>
        <button
          className={`btn ${filter === 'today' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('today')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Today
        </button>
      </div>
      
      {/* Medications list */}
      {filteredMedications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedications.map((med) => (
            <MedicationCard key={med.id} medication={med} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="heading-sm mb-2">No medications found</h2>
          <p className="text-muted-foreground mb-6">
            {filter === 'all' 
              ? 'You haven\'t added any medications yet.' 
              : filter === 'active' 
                ? 'You don\'t have any active medications.' 
                : 'You don\'t have any medications scheduled for today.'}
          </p>
          <button className="btn btn-primary">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Medication
          </button>
        </div>
      )}
    </div>
  );
};

export default Medications;