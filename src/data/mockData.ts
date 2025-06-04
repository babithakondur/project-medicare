import { format, subDays, subHours, addDays } from 'date-fns';
import { 
  VitalSignEntry, 
  Medication, 
  HealthGoal, 
  HealthAlert 
} from '../types/health';

// Generate dates relative to now
const today = new Date();
const yesterday = subDays(today, 1);
const twoDaysAgo = subDays(today, 2);
const threeDaysAgo = subDays(today, 3);
const fourDaysAgo = subDays(today, 4);
const fiveDaysAgo = subDays(today, 5);
const sixDaysAgo = subDays(today, 6);
const oneWeekAgo = subDays(today, 7);

// Format date for display
const formatDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

// Generate mock vital signs data
export const mockVitalSigns: VitalSignEntry[] = [
  // Heart Rate entries
  {
    id: 'hr1',
    type: 'heartRate',
    value: 72,
    timestamp: formatDate(today),
    notes: 'Resting heart rate after morning coffee',
  },
  {
    id: 'hr2',
    type: 'heartRate',
    value: 68,
    timestamp: formatDate(yesterday),
  },
  {
    id: 'hr3',
    type: 'heartRate',
    value: 75,
    timestamp: formatDate(twoDaysAgo),
  },
  {
    id: 'hr4',
    type: 'heartRate',
    value: 70,
    timestamp: formatDate(threeDaysAgo),
  },
  {
    id: 'hr5',
    type: 'heartRate',
    value: 73,
    timestamp: formatDate(fourDaysAgo),
  },
  {
    id: 'hr6',
    type: 'heartRate',
    value: 71,
    timestamp: formatDate(fiveDaysAgo),
  },
  {
    id: 'hr7',
    type: 'heartRate',
    value: 69,
    timestamp: formatDate(sixDaysAgo),
  },

  // Blood Pressure entries
  {
    id: 'bp1',
    type: 'bloodPressure',
    value: { systolic: 120, diastolic: 80 },
    timestamp: formatDate(today),
    notes: 'Morning reading before breakfast',
  },
  {
    id: 'bp2',
    type: 'bloodPressure',
    value: { systolic: 118, diastolic: 79 },
    timestamp: formatDate(yesterday),
  },
  {
    id: 'bp3',
    type: 'bloodPressure',
    value: { systolic: 122, diastolic: 82 },
    timestamp: formatDate(twoDaysAgo),
  },
  {
    id: 'bp4',
    type: 'bloodPressure',
    value: { systolic: 125, diastolic: 85 },
    timestamp: formatDate(threeDaysAgo),
  },
  {
    id: 'bp5',
    type: 'bloodPressure',
    value: { systolic: 121, diastolic: 81 },
    timestamp: formatDate(fourDaysAgo),
  },
  
  // Blood Glucose entries
  {
    id: 'bg1',
    type: 'bloodGlucose',
    value: 95,
    timestamp: formatDate(today),
    measurementContext: 'fasting',
    notes: 'Morning fasting level',
  },
  {
    id: 'bg2',
    type: 'bloodGlucose',
    value: 110,
    timestamp: formatDate(subHours(today, 12)),
    measurementContext: 'afterMeal',
  },
  {
    id: 'bg3',
    type: 'bloodGlucose',
    value: 92,
    timestamp: formatDate(yesterday),
    measurementContext: 'fasting',
  },
  {
    id: 'bg4',
    type: 'bloodGlucose',
    value: 105,
    timestamp: formatDate(twoDaysAgo),
    measurementContext: 'afterMeal',
  },
  
  // Weight entries
  {
    id: 'w1',
    type: 'weight',
    value: 70.5,
    timestamp: formatDate(today),
    notes: 'Morning weight',
  },
  {
    id: 'w2',
    type: 'weight',
    value: 70.7,
    timestamp: formatDate(threeDaysAgo),
  },
  {
    id: 'w3',
    type: 'weight',
    value: 71.0,
    timestamp: formatDate(sixDaysAgo),
  },
  
  // Oxygen Saturation entries
  {
    id: 'ox1',
    type: 'oxygenSaturation',
    value: 98,
    timestamp: formatDate(today),
  },
  {
    id: 'ox2',
    type: 'oxygenSaturation',
    value: 97,
    timestamp: formatDate(twoDaysAgo),
  },
  {
    id: 'ox3',
    type: 'oxygenSaturation',
    value: 99,
    timestamp: formatDate(fourDaysAgo),
  },
];

// Generate mock medications
export const mockMedications: Medication[] = [
  {
    id: 'med1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: formatDate(subDays(today, 30)),
    timeOfDay: ['08:00'],
    instructions: 'Take with food',
    refillReminder: true,
    refillDate: formatDate(addDays(today, 10)),
  },
  {
    id: 'med2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: formatDate(subDays(today, 60)),
    timeOfDay: ['08:00', '20:00'],
    instructions: 'Take with meals',
  },
  {
    id: 'med3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    startDate: formatDate(subDays(today, 90)),
    timeOfDay: ['21:00'],
    instructions: 'Take in the evening',
    refillReminder: true,
    refillDate: formatDate(addDays(today, 5)),
  },
];

// Generate mock health goals
export const mockHealthGoals: HealthGoal[] = [
  {
    id: 'goal1',
    title: 'Reduce Blood Pressure',
    description: 'Lower blood pressure to healthy levels',
    category: 'weight',
    target: 120,
    unit: 'mmHg',
    currentValue: 125,
    startDate: formatDate(subDays(today, 30)),
    targetDate: formatDate(addDays(today, 60)),
    isCompleted: false,
    progress: 50,
  },
  {
    id: 'goal2',
    title: 'Daily Steps Goal',
    description: 'Reach 10,000 steps every day',
    category: 'activity',
    target: 10000,
    unit: 'steps',
    currentValue: 7500,
    startDate: formatDate(subDays(today, 15)),
    isCompleted: false,
    progress: 75,
  },
  {
    id: 'goal3',
    title: 'Improve Sleep Duration',
    description: 'Get at least 7 hours of sleep per night',
    category: 'sleep',
    target: 7,
    unit: 'hours',
    currentValue: 6.5,
    startDate: formatDate(subDays(today, 7)),
    targetDate: formatDate(addDays(today, 30)),
    isCompleted: false,
    progress: 85,
  },
];

// Generate mock health alerts
export const mockHealthAlerts: HealthAlert[] = [
  {
    id: 'alert1',
    timestamp: formatDate(subHours(today, 2)),
    type: 'high',
    title: 'High Blood Pressure Alert',
    message: 'Your blood pressure reading was above your target range. Consider checking again in 30 minutes.',
    vitalType: 'bloodPressure',
    read: false,
  },
  {
    id: 'alert2',
    timestamp: formatDate(subHours(today, 12)),
    type: 'reminder',
    title: 'Medication Reminder',
    message: 'Time to take Lisinopril (10mg)',
    read: true,
  },
  {
    id: 'alert3',
    timestamp: formatDate(yesterday),
    type: 'info',
    title: 'Goal Progress Update',
    message: 'You\'re 75% of the way to your daily steps goal!',
    read: false,
  },
  {
    id: 'alert4',
    timestamp: formatDate(subDays(today, 2)),
    type: 'critical',
    title: 'Missed Medication Alert',
    message: 'You may have missed your evening dose of Metformin',
    read: true,
  },
  {
    id: 'alert5',
    timestamp: formatDate(subDays(today, 3)),
    type: 'low',
    title: 'Low Blood Glucose Alert',
    message: 'Your blood glucose reading was below normal range',
    vitalType: 'bloodGlucose',
    read: true,
  },
];