import { useState, useEffect } from 'react';
import { Target, PlusCircle } from 'lucide-react';
import { mockHealthGoals } from '../data/mockData';
import { format, parseISO, isPast } from 'date-fns';

const Goals = () => {
  const [goals, setGoals] = useState(mockHealthGoals);
  
  // Set page title
  useEffect(() => {
    document.title = 'Health Goals | MediTrack';
  }, []);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="heading-xl">Health Goals</h1>
          <p className="text-muted-foreground mt-1">Set, track, and achieve your health objectives</p>
        </div>
        
        <button className="btn btn-primary mt-4 md:mt-0">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Goal
        </button>
      </div>
      
      {/* Goals grid */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="card card-hover">
              <div className="flex justify-between items-start">
                <h2 className="heading-md">{goal.title}</h2>
                <span className={`badge ${goal.isCompleted ? 'badge-success' : 'badge-outline'}`}>
                  {goal.isCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>
              
              {goal.description && (
                <p className="text-muted-foreground mt-1 mb-4">{goal.description}</p>
              )}
              
              <div className="mt-4 mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`rounded-full h-2 transition-all duration-700 ease-in-out ${
                      goal.progress >= 100 
                        ? 'bg-success' 
                        : goal.progress > 66 
                          ? 'bg-primary' 
                          : goal.progress > 33 
                            ? 'bg-secondary' 
                            : 'bg-accent'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div>
                  <div className="text-muted-foreground">Current</div>
                  <div className="font-medium text-lg">{goal.currentValue} {goal.unit}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Target</div>
                  <div className="font-medium text-lg">{goal.target} {goal.unit}</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                <div>Started: {format(parseISO(goal.startDate), 'MMM d, yyyy')}</div>
                {goal.targetDate && (
                  <div className={`mt-1 ${
                    isPast(parseISO(goal.targetDate)) && !goal.isCompleted 
                      ? 'text-error' : ''
                  }`}>
                    Target Date: {format(parseISO(goal.targetDate), 'MMM d, yyyy')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="heading-sm mb-2">No health goals set yet</h2>
          <p className="text-muted-foreground mb-6">
            Set your first health goal to start tracking your progress.
          </p>
          <button className="btn btn-primary">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default Goals;