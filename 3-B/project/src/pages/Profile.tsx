import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getProfile, updateProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Save, Lock } from 'lucide-react';

const Profile = () => {
  const { user: authUser, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: authUser?.name ?? '',
    email: authUser?.email ?? '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profile = await getProfile();
        setFormData({ name: profile.name, email: profile.email, password: '' });
      } catch {
        toast.error('Unable to fetch profile details');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updated = await updateProfile({
        name: formData.name,
        email: formData.email,
        ...(formData.password ? { password: formData.password } : {}),
      });

      setUser({ ...authUser!, ...updated });
      setFormData((prev) => ({ ...prev, password: '' }));
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center text-white">Loading profile...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10 bg-gradient-to-br from-black via-slate-900 to-gray-950">
      <div className="bg-white/10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl max-w-lg w-full border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
          My Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            Icon={User}
          />
          <FormField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            Icon={Mail}
          />
          <FormField
            label="New Password (optional)"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Leave blank to keep current"
            Icon={Lock}
          />
          <button
            type="submit"
            disabled={updating}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {updating ? 'Updating...' : (
              <>
                <Save className="w-5 h-5" />
                <span>Update Profile</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ElementType;
};

const FormField = ({ label, type, name, value, onChange, placeholder, Icon }: FormFieldProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-white mb-1">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full border border-white/20 bg-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
        required={type !== 'password'}
      />
    </div>
  </div>
);
