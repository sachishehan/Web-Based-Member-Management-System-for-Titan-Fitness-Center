import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <TopNav 
        toggleSidebar={toggleSidebar} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className={`transition-all duration-300 pt-16
        ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;