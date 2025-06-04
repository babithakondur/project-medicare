import { Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockHealthGoals } from '../../data/mockData';

const HealthGoalsCard = () => {
  const navigate = useNavigate();
  
  // Sort goals by progress
  const sortedGoals = [...mockHealthGoals].sort((a, b) => b.progress - a.progress);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-md">Health Goals</h2>
        <button 
          className="btn btn-ghost text-primary"
          onClick={() => navigate('/goals')}
        >
          View All
        </button>
      </div>

      {sortedGoals.length > 0 ? (
        <div className="space-y-4">
          {sortedGoals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{goal.title}</h3>
                <span className="text-sm">{goal.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-500 ease-in-out"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current: {goal.currentValue} {goal.unit}</span>
                <span>Target: {goal.target} {goal.unit}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Target className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p>No health goals set yet.</p>
          <button 
            className="btn btn-outline mt-4"
            onClick={() => navigate('/goals')}
          >
            Set a Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthGoalsCard;