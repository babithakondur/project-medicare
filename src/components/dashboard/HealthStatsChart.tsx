import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockVitalSigns } from '../../data/mockData';
import { format, parseISO } from 'date-fns';

const HealthStatsChart = () => {
  // Process data for the chart
  const heartRateData = mockVitalSigns
    .filter(entry => entry.type === 'heartRate')
    .map(entry => ({
      date: format(parseISO(entry.timestamp), 'MMM d'),
      heartRate: (entry as any).value,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  // Process blood pressure data
  const bloodPressureData = mockVitalSigns
    .filter(entry => entry.type === 'bloodPressure')
    .map(entry => ({
      date: format(parseISO(entry.timestamp), 'MMM d'),
      systolic: (entry as any).value.systolic,
      diastolic: (entry as any).value.diastolic,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  
  // Process blood glucose data
  const bloodGlucoseData = mockVitalSigns
    .filter(entry => entry.type === 'bloodGlucose')
    .map(entry => ({
      date: format(parseISO(entry.timestamp), 'MMM d'),
      bloodGlucose: (entry as any).value,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  // State for the selected metric
  const [selectedMetric, setSelectedMetric] = React.useState('heartRate');
  
  // Determine which dataset to use based on the selected metric
  let chartData;
  let chartConfig;
  
  if (selectedMetric === 'heartRate') {
    chartData = heartRateData;
    chartConfig = {
      lines: [{ dataKey: 'heartRate', stroke: '#EF4444', name: 'Heart Rate (BPM)' }],
      yAxisLabel: 'BPM',
    };
  } else if (selectedMetric === 'bloodPressure') {
    chartData = bloodPressureData;
    chartConfig = {
      lines: [
        { dataKey: 'systolic', stroke: '#3B82F6', name: 'Systolic (mmHg)' },
        { dataKey: 'diastolic', stroke: '#0D9488', name: 'Diastolic (mmHg)' },
      ],
      yAxisLabel: 'mmHg',
    };
  } else if (selectedMetric === 'bloodGlucose') {
    chartData = bloodGlucoseData;
    chartConfig = {
      lines: [{ dataKey: 'bloodGlucose', stroke: '#8B5CF6', name: 'Blood Glucose (mg/dL)' }],
      yAxisLabel: 'mg/dL',
    };
  }

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="heading-md mb-4">Health Trends</h2>
        
        <div className="flex space-x-2">
          <button
            className={`btn ${selectedMetric === 'heartRate' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedMetric('heartRate')}
          >
            Heart Rate
          </button>
          <button
            className={`btn ${selectedMetric === 'bloodPressure' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedMetric('bloodPressure')}
          >
            Blood Pressure
          </button>
          <button
            className={`btn ${selectedMetric === 'bloodGlucose' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedMetric('bloodGlucose')}
          >
            Blood Glucose
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%\" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis 
                stroke="#6b7280"
                label={{ 
                  value: chartConfig?.yAxisLabel || '',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip />
              <Legend />
              {chartConfig?.lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  name={line.name}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">No data available for this metric</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthStatsChart;