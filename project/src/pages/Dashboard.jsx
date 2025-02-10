import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { QRCodeSVG } from 'qrcode.react'

function Dashboard() {
  const { user } = useAuth()
  const [showQRModal, setShowQRModal] = useState(false)

  // Calculate days until renewal
  const renewalDate = new Date(user.nextPaymentDue)
  const today = new Date()
  const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24))

  // Sample announcements
  const announcements = [
    {
      type: 'maintenance',
      message: 'Gym closed for maintenance on March 30th, 2024',
      date: '2024-03-25'
    },
    {
      type: 'event',
      message: 'New Yoga classes starting from April 1st',
      date: '2024-03-28'
    }
  ]
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600">Member ID: {user.memberId}</p>
          </div>
          <button
            onClick={() => setShowQRModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Show QR Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Membership Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Membership Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${user.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                {user.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Membership Type:</span>
              <span className="font-medium">Premium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Start Date:</span>
              <span>{user.lastPayment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Renewal Date:</span>
              <span className={`font-medium ${daysUntilRenewal <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                {user.nextPaymentDue}
              </span>
            </div>
            {daysUntilRenewal <= 5 && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                ⚠️ Your membership expires in {daysUntilRenewal} days. Please renew soon.
              </div>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800">{announcement.message}</p>
                <p className="text-sm text-blue-600 mt-1">{announcement.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>
          <div className="space-y-3">
            {user.paymentHistory.slice(0, 3).map((payment, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{payment.date}</p>
                  <p className="text-sm text-gray-600">Monthly Membership</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">Rs {payment.amount}</p>
                  <p className="text-sm text-green-600">{payment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.attendance.slice(0, 5).map((record, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4">{record.date}</td>
                    <td className="py-3 px-4">{record.time}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCodeSVG value={user.memberId} size={200} />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Show this QR code at the reception for attendance
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard