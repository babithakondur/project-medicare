import { useState, useEffect } from 'react';
import { Bell, Share2, Lock, Eye, Moon, Sun } from 'lucide-react';

const Settings = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Settings | MediTrack';
  }, []);

  // State for settings
  const [settings, setSettings] = useState({
    // Notifications
    medicationReminders: true,
    measurementReminders: false,
    criticalAlerts: true,
    goalUpdates: true,
    
    // Sharing
    shareWithDoctors: true,
    shareWithFamily: false,
    anonymousDataSharing: false,
    
    // Privacy
    twoFactorAuth: false,
    dataRetention: '1year',
    
    // Display
    darkMode: false,
    highContrast: false,
    fontSize: 'medium',
  });

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6 pb-6">
      <h1 className="heading-xl">Settings</h1>

      <div className="space-y-8">
        {/* Notifications Section */}
        <section className="card">
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            <h2 className="heading-md">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Medication Reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Receive reminders when it's time to take your medications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.medicationReminders} 
                  onChange={() => handleToggle('medicationReminders')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Measurement Reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Get prompts to record your vital signs
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.measurementReminders} 
                  onChange={() => handleToggle('measurementReminders')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Critical Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive immediate alerts for concerning health measurements
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.criticalAlerts} 
                  onChange={() => handleToggle('criticalAlerts')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Goal Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Get notifications about your health goal progress
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.goalUpdates} 
                  onChange={() => handleToggle('goalUpdates')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
        
        {/* Data Sharing Section */}
        <section className="card">
          <div className="flex items-center mb-6">
            <Share2 className="h-5 w-5 mr-2 text-secondary" />
            <h2 className="heading-md">Data Sharing</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Share with Healthcare Providers</h3>
                <p className="text-sm text-muted-foreground">
                  Allow your doctors to access your health data
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.shareWithDoctors} 
                  onChange={() => handleToggle('shareWithDoctors')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Share with Family Members</h3>
                <p className="text-sm text-muted-foreground">
                  Allow family members to access your health data
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.shareWithFamily} 
                  onChange={() => handleToggle('shareWithFamily')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Anonymous Data Contribution</h3>
                <p className="text-sm text-muted-foreground">
                  Share anonymized data for research and product improvement
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.anonymousDataSharing} 
                  onChange={() => handleToggle('anonymousDataSharing')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
        
        {/* Privacy & Security Section */}
        <section className="card">
          <div className="flex items-center mb-6">
            <Lock className="h-5 w-5 mr-2 text-accent" />
            <h2 className="heading-md">Privacy & Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.twoFactorAuth} 
                  onChange={() => handleToggle('twoFactorAuth')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Data Retention Period</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Choose how long to keep your health data
              </p>
              <select
                name="dataRetention"
                value={settings.dataRetention}
                onChange={handleChange}
                className="input"
              >
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
                <option value="3years">3 Years</option>
                <option value="forever">Keep Forever</option>
              </select>
            </div>
            
            <div className="pt-2">
              <button className="btn btn-outline text-error border-error hover:bg-error/10">
                Download My Data
              </button>
            </div>
          </div>
        </section>
        
        {/* Display Settings */}
        <section className="card">
          <div className="flex items-center mb-6">
            <Eye className="h-5 w-5 mr-2 text-success" />
            <h2 className="heading-md">Display</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Use a darker color scheme
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode} 
                  onChange={() => handleToggle('darkMode')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <div className="absolute pointer-events-none left-[2px] top-[2px] text-gray-400 peer-checked:left-auto peer-checked:right-[2px]">
                  {settings.darkMode ? (
                    <Moon className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">High Contrast Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.highContrast} 
                  onChange={() => handleToggle('highContrast')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Font Size</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Adjust the text size throughout the app
              </p>
              <select
                name="fontSize"
                value={settings.fontSize}
                onChange={handleChange}
                className="input"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="x-large">Extra Large</option>
              </select>
            </div>
          </div>
        </section>
        
        {/* Save Settings Button */}
        <div className="flex justify-end">
          <button className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;