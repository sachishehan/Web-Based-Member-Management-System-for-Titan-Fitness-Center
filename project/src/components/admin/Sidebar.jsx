import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaCalendarAlt, FaChartBar, 
  FaMoneyBillWave, FaDumbbell, FaCog, FaSignOutAlt,
  FaQrcode 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/admin', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/members', icon: FaUsers, label: 'Manage Members' },
    { path: '/admin/scanner', icon: FaQrcode, label: 'QR Scanner' },
    { path: '/admin/classes', icon: FaCalendarAlt, label: 'Class Management' },
    { path: '/admin/attendance', icon: FaChartBar, label: 'Attendance Tracking' },
    { path: '/admin/payments', icon: FaMoneyBillWave, label: 'Membership & Payments' },
    { path: '/admin/trainers', icon: FaDumbbell, label: 'Trainers & Staff' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-30
      ${isOpen ? 'w-64' : 'w-0 md:w-20'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className={`font-bold text-primary dark:text-white ${!isOpen && 'md:hidden'}`}>
            TITAN FITNESS
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                  ${isActive ? 'bg-blue-50 dark:bg-gray-700 text-primary dark:text-white' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white w-full"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;