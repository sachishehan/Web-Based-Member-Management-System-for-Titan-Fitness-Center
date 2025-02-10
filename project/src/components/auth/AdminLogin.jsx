import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // For demo purposes, hardcoded admin credentials
  const demoAdmin = {
    email: 'admin@titanfitness.com',
    password: 'admin123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple front-end validation
    if (formData.email === demoAdmin.email && formData.password === demoAdmin.password) {
      // Store admin session in localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        isAuthenticated: true,
        user: {
          email: formData.email,
          role: 'admin'
        }
      }));
      
      toast.success('Login successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the admin dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>

          <div className="text-sm text-center">
            <p className="text-gray-600">
              Demo Credentials:
            </p>
            <p className="text-gray-500">
              Email: admin@titanfitness.com
              <br />
              Password: admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;