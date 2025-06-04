import { Clock, CheckCircle, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockMedications } from '../../data/mockData';
import { format } from 'date-fns';

const MedicationsCard = () => {
  const navigate = useNavigate();
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  // Get medications due today
  const medicationsDueToday = mockMedications.filter(med => {
    const startDate = new Date(med.startDate);
    const endDate = med.endDate ? new Date(med.endDate) : null;
    
    return (
      startDate <= today && 
      (!endDate || endDate >= today)
    );
  });

  const medStatus = {
    taken: ['08:00'],
    pending: ['20:00'],
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-md">Today's Medications</h2>
        <button 
          className="btn btn-ghost text-primary"
          onClick={() => navigate('/medications')}
        >
          View All
        </button>
      </div>

      {medicationsDueToday.length > 0 ? (
        <div className="space-y-3">
          {medicationsDueToday.map((med) => (
            <div key={med.id} className="border rounded-md p-3 transition-all hover:border-primary/20">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{med.name}</h3>
                  <p className="text-sm">{med.dosage} - {med.frequency}</p>
                  
                  <div className="flex flex-wrap mt-2 gap-2">
                    {med.timeOfDay.map(time => {
                      const isTaken = medStatus.taken.includes(time);
                      const isPending = medStatus.pending.includes(time);
                      
                      return (
                        <span 
                          key={time} 
                          className={`inline-flex items-center text-xs px-2 py-1 rounded-full
                            ${isTaken ? 'bg-success/10 text-success' : 
                              isPending ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`
                          }
                        >
                          {isTaken ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {time}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <button className="rounded-full p-1 hover:bg-muted">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p>No medications scheduled for today.</p>
          <button 
            className="btn btn-outline mt-4"
            onClick={() => navigate('/medications')}
          >
            Add Medication
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicationsCard;