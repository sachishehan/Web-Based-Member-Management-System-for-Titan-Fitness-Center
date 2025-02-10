import { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaFileExport, FaFilter } from 'react-icons/fa';
import { format, subDays } from 'date-fns';

function AttendanceTracking() {
  const [dateRange, setDateRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample attendance data
  const [attendanceRecords] = useState([
    {
      id: 1,
      memberId: 'MEM001',
      memberName: 'John Doe',
      checkIn: '2024-02-20T09:00:00',
      checkOut: '2024-02-20T10:30:00',
      status: 'completed',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      memberId: 'MEM002',
      memberName: 'Jane Smith',
      checkIn: '2024-02-20T10:15:00',
      checkOut: '2024-02-20T11:45:00',
      status: 'completed',
      paymentStatus: 'paid'
    },
    {
      id: 3,
      memberId: 'MEM003',
      memberName: 'Mike Johnson',
      checkIn: '2024-02-20T14:00:00',
      status: 'checked-in',
      paymentStatus: 'pending'
    }
  ]);

  // Statistics
  const stats = {
    totalVisits: 150,
    uniqueMembers: 45,
    averageDuration: '1.5 hours',
    peakHours: '5:00 PM - 7:00 PM'
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting attendance data...');
  };

  const handleShowDetails = (member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance Tracking</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Visits</h3>
          <p className="text-2xl font-bold text-primary">{stats.totalVisits}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Unique Members</h3>
          <p className="text-2xl font-bold text-primary">{stats.uniqueMembers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Average Duration</h3>
          <p className="text-2xl font-bold text-primary">{stats.averageDuration}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Peak Hours</h3>
          <p className="text-2xl font-bold text-primary">{stats.peakHours}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <FaFileExport className="mr-2" />
          Export
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {record.memberName}
                      </div>
                      <div className="text-sm text-gray-500">{record.memberId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(record.checkIn), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.checkOut 
                    ? format(new Date(record.checkOut), 'MMM d, yyyy HH:mm')
                    : '-'
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.paymentStatus.charAt(0).toUpperCase() + record.paymentStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleShowDetails(record)}
                    className="text-primary hover:text-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Member Details Modal */}
      {showDetailsModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Member Attendance Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Information</h3>
                <p className="mt-1">
                  <span className="font-medium">Name:</span> {selectedMember.memberName}
                </p>
                <p>
                  <span className="font-medium">ID:</span> {selectedMember.memberId}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Check-in Time</h3>
                <p className="mt-1">
                  {format(new Date(selectedMember.checkIn), 'MMM d, yyyy HH:mm')}
                </p>
              </div>

              {selectedMember.checkOut && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Check-out Time</h3>
                  <p className="mt-1">
                    {format(new Date(selectedMember.checkOut), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${selectedMember.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                  </span>
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceTracking;