// Health data types for the application

// Types of vital signs that can be tracked
export type VitalType = 
  | 'bloodPressure' 
  | 'heartRate' 
  | 'bloodGlucose' 
  | 'temperature' 
  | 'oxygenSaturation' 
  | 'weight' 
  | 'sleep' 
  | 'steps';

// Blood pressure reading
export interface BloodPressureReading {
  systolic: number; // mmHg
  diastolic: number; // mmHg
}

// Base vital sign entry
export interface VitalSignBase {
  id: string;
  timestamp: string; // ISO date string
  notes?: string;
}

// Heart rate entry
export interface HeartRateEntry extends VitalSignBase {
  type: 'heartRate';
  value: number; // BPM
}

// Blood pressure entry
export interface BloodPressureEntry extends VitalSignBase {
  type: 'bloodPressure';
  value: BloodPressureReading;
}

// Blood glucose entry
export interface BloodGlucoseEntry extends VitalSignBase {
  type: 'bloodGlucose';
  value: number; // mg/dL
  measurementContext?: 'fasting' | 'beforeMeal' | 'afterMeal' | 'bedtime';
}

// Temperature entry
export interface TemperatureEntry extends VitalSignBase {
  type: 'temperature';
  value: number; // Celsius
}

// Oxygen saturation entry
export interface OxygenSaturationEntry extends VitalSignBase {
  type: 'oxygenSaturation';
  value: number; // Percentage
}

// Weight entry
export interface WeightEntry extends VitalSignBase {
  type: 'weight';
  value: number; // kg
}

// Sleep entry
export interface SleepEntry extends VitalSignBase {
  type: 'sleep';
  value: number; // hours
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
}

// Steps entry
export interface StepsEntry extends VitalSignBase {
  type: 'steps';
  value: number;
}

// Union type for all vital sign entries
export type VitalSignEntry = 
  | HeartRateEntry
  | BloodPressureEntry
  | BloodGlucoseEntry
  | TemperatureEntry
  | OxygenSaturationEntry
  | WeightEntry
  | SleepEntry
  | StepsEntry;

// Medication type
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  timeOfDay: string[];
  instructions?: string;
  refillReminder?: boolean;
  refillDate?: string;
}

// Health goal type
export interface HealthGoal {
  id: string;
  title: string;
  description?: string;
  category: 'weight' | 'activity' | 'nutrition' | 'sleep' | 'custom';
  target: number;
  unit: string;
  currentValue: number;
  startDate: string;
  targetDate?: string;
  isCompleted: boolean;
  progress: number; // Percentage from 0-100
}

// Health alert type
export interface HealthAlert {
  id: string;
  timestamp: string;
  type: 'high' | 'low' | 'critical' | 'reminder' | 'info';
  title: string;
  message: string;
  vitalType?: VitalType;
  read: boolean;
}