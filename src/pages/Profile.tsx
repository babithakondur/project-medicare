import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { User, Mail, Calendar, Ruler, Weight, Phone, UserPlus } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const Profile = () => {
  const { user, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    height: user?.height || '',
    weight: user?.weight || '',
    emergencyContactName: user?.emergencyContact?.name || '',
    emergencyContactRelationship: user?.emergencyContact?.relationship || '',
    emergencyContactPhone: user?.emergencyContact?.phone || '',
  });
  
  // Set page title
  useEffect(() => {
    document.title = 'Profile | MediTrack';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the user profile
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      height: formData.height ? parseInt(formData.height) : undefined,
      weight: formData.weight ? parseInt(formData.weight) : undefined,
      emergencyContact: {
        name: formData.emergencyContactName,
        relationship: formData.emergencyContactRelationship,
        phone: formData.emergencyContactPhone,
      },
    });
    
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="heading-xl">Profile</h1>
        
        <button 
          className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} mt-4 md:mt-0`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>
      
      <div className="card">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:w-1/3">
                <div className="relative mb-4">
                  <img
                    src={user.avatar || "public\imgs\Snapchat-932890877.jpg"}
                    alt={user.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                  <button 
                    type="button" 
                    className="absolute bottom-0 right-0 bg-primary rounded-full p-2 text-white"
                  >
                    <User className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="heading-md">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="input w-full"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="height" className="block text-sm font-medium mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="heading-sm mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="emergencyContactRelationship" className="block text-sm font-medium mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="emergencyContactPhone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:w-1/3">
                <img
                  src={user.avatar || "public\imgs\Snapchat-932890877.jpg"}
                  alt={user.name}
                  className="h-32 w-32 rounded-full object-cover mb-4"
                />
                <h2 className="heading-md">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="heading-sm mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">
                        {user.dateOfBirth ? format(parseISO(user.dateOfBirth), 'MMMM d, yyyy') : 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{user.gender || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-medium">{user.height ? `${user.height} cm` : 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Weight className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{user.weight ? `${user.weight} kg` : 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="heading-sm mt-8 mb-4">Emergency Contact</h3>
                {user.emergencyContact ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{user.emergencyContact.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <UserPlus className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Relationship</p>
                        <p className="font-medium">{user.emergencyContact.relationship}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{user.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No emergency contact provided</p>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="heading-sm mb-4">Healthcare Providers</h3>
              {user.doctors && user.doctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.doctors.map((doctor) => (
                    <div key={doctor.id} className="border rounded-md p-4 bg-muted">
                      <h4 className="font-medium">{doctor.name}</h4>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      
                      <div className="mt-2 space-y-1 text-sm">
                        {doctor.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{doctor.phone}</span>
                          </div>
                        )}
                        {doctor.email && (
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{doctor.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No healthcare providers added</p>
              )}
              
              <button className="btn btn-outline mt-4">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Healthcare Provider
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;