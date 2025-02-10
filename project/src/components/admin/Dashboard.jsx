import { useState } from 'react';
import { FaUsers, FaCalendarCheck, FaCreditCard, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { useMemberContext } from '../../contexts/MemberContext';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StatCard({ icon: Icon, title, value, trend }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <p className={`mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
      </p>
    </div>
  );
}

function Dashboard() {
  const { members, updateMemberStatus } = useMemberContext();
  const [registrationRequests, setRegistrationRequests] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      membershipType: 'premium',
      requestDate: '2024-02-20'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      membershipType: 'basic',
      requestDate: '2024-02-21'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      membershipType: 'standard',
      requestDate: '2024-02-21'
    }
  ]);

  // Handle registration request actions
  const handleRegistrationAction = async (requestId, action) => {
    try {
      // Remove the request from the list
      setRegistrationRequests(prev => prev.filter(req => req.id !== requestId));
      
      // Show success message
      if (action === 'approve') {
        toast.success('Registration request approved successfully');
      } else {
        toast.info('Registration request rejected');
      }
    } catch (error) {
      toast.error('Failed to process registration request');
    }
  };

  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 3500, 4000, 3800, 4200, 4500],
        borderColor: '#007BFF',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Revenue'
      }
    }
  };

  // Calculate statistics
  const activeMembers = members.filter(m => m.status === 'active').length;
  const pendingPayments = members.filter(m => m.renewalStatus === 'pending').length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={FaUsers}
          title="Active Members"
          value={activeMembers}
          trend={8.1}
        />
        <StatCard
          icon={FaCalendarCheck}
          title="Today's Attendance"
          value="45"
          trend={12.5}
        />
        <StatCard
          icon={FaCreditCard}
          title="Pending Payments"
          value={pendingPayments}
          trend={-3.2}
        />
        <StatCard
          icon={FaChartLine}
          title="Monthly Revenue"
          value="$45,678"
          trend={15.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        {/* New Registrations */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">New Registration Requests</h3>
          <div className="space-y-4">
            {registrationRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium">{request.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{request.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Membership: {request.membershipType.charAt(0).toUpperCase() + request.membershipType.slice(1)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRegistrationAction(request.id, 'approve')}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRegistrationAction(request.id, 'reject')}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {registrationRequests.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No pending registration requests
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;