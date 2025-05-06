import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-md text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-bold text-white tracking-wide">
            XYZ.com
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center hover:text-blue-400 transition"
                >
                  <UserCircle className="w-5 h-5 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center hover:text-red-400 transition"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
