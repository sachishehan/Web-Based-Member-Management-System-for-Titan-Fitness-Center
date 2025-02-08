function Membership() {
  const membershipDetails = {
    plan: 'Premium',
    startDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: 'Active',
    features: [
      'Unlimited Gym Access',
      'All Classes Included',
      'Personal Trainer Sessions',
      'Locker Access',
      'Nutrition Consultation'
    ]
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Membership Details</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{membershipDetails.plan} Plan</h2>
            <p className="text-gray-600">Status: <span className="text-green-500">{membershipDetails.status}</span></p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
            Renew Membership
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="font-semibold">{membershipDetails.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expiry Date</p>
            <p className="font-semibold">{membershipDetails.expiryDate}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Plan Features</h3>
          <ul className="space-y-2">
            {membershipDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="material-icons text-green-500 mr-2">check_circle</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Billing History</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">Annual Membership Renewal</p>
              <p className="text-sm text-gray-600">Jan 1, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">$599.00</p>
              <p className="text-sm text-green-500">Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Membership