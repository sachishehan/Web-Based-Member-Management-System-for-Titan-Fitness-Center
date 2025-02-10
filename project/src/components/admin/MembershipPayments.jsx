import { useState } from 'react';
import { FaFileInvoice, FaSearch, FaFileExport, FaEdit, FaCreditCard } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

function MembershipPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Sample data
  const [membershipPlans, setMembershipPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      price: 29.99,
      duration: 'Monthly',
      features: ['Gym access', 'Locker room', 'Basic equipment'],
      active: true
    },
    {
      id: 2,
      name: 'Standard Plan',
      price: 49.99,
      duration: 'Monthly',
      features: ['Basic features', 'Group classes', 'Fitness assessment'],
      active: true
    },
    {
      id: 3,
      name: 'Premium Plan',
      price: 99.99,
      duration: 'Monthly',
      features: ['Standard features', 'Personal trainer', 'Nutrition plan'],
      active: true
    }
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      memberId: 'MEM001',
      memberName: 'John Doe',
      plan: 'Premium Plan',
      amount: 99.99,
      date: '2024-02-20',
      status: 'completed',
      nextPayment: '2024-03-20'
    },
    {
      id: 2,
      memberId: 'MEM002',
      memberName: 'Jane Smith',
      plan: 'Basic Plan',
      amount: 29.99,
      date: '2024-02-18',
      status: 'pending',
      nextPayment: '2024-03-18'
    }
  ]);

  const handleAddPlan = (e) => {
    e.preventDefault();
    const newPlan = {
      id: membershipPlans.length + 1,
      ...selectedPlan,
      active: true
    };
    setMembershipPlans([...membershipPlans, newPlan]);
    setShowPlanModal(false);
    toast.success('Membership plan added successfully');
  };

  const handleEditPlan = (e) => {
    e.preventDefault();
    setMembershipPlans(membershipPlans.map(plan => 
      plan.id === selectedPlan.id ? selectedPlan : plan
    ));
    setShowPlanModal(false);
    toast.success('Membership plan updated successfully');
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const newPayment = {
      id: payments.length + 1,
      ...selectedPayment,
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    };
    setPayments([...payments, newPayment]);
    setShowPaymentModal(false);
    toast.success('Payment recorded successfully');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Membership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">
                    ${plan.price}
                    <span className="text-sm text-gray-500">/{plan.duration.toLowerCase()}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPlanModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold
                ${plan.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {plan.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
          <div className="bg-gray-50 rounded-lg shadow-md p-6 flex items-center justify-center">
            <button
              onClick={() => {
                setSelectedPlan({
                  name: '',
                  price: '',
                  duration: 'Monthly',
                  features: [''],
                  active: true
                });
                setShowPlanModal(true);
              }}
              className="flex items-center text-primary hover:text-blue-700"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Plan
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Payment History</h2>
          <button
            onClick={() => {
              setSelectedPayment({
                memberId: '',
                memberName: '',
                plan: membershipPlans[0]?.name || '',
                amount: membershipPlans[0]?.price || 0,
                nextPayment: ''
              });
              setShowPaymentModal(true);
            }}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
          >
            <FaCreditCard className="mr-2" />
            Record Payment
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button
            onClick={() => console.log('Export payments')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FaFileExport className="mr-2" />
            Export
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.memberName}
                      </div>
                      <div className="text-sm text-gray-500">{payment.memberId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(payment.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(payment.nextPayment), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedPlan.id ? 'Edit Plan' : 'Add New Plan'}
            </h2>
            <form onSubmit={selectedPlan.id ? handleEditPlan : handleAddPlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                <input
                  type="text"
                  required
                  value={selectedPlan.name}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={selectedPlan.price}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  value={selectedPlan.duration}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, duration: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Features</label>
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...selectedPlan.features];
                        newFeatures[index] = e.target.value;
                        setSelectedPlan({ ...selectedPlan, features: newFeatures });
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = selectedPlan.features.filter((_, i) => i !== index);
                        setSelectedPlan({ ...selectedPlan, features: newFeatures });
                      }}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedPlan({
                    ...selectedPlan,
                    features: [...selectedPlan.features, '']
                  })}
                  className="mt-2 text-sm text-primary hover:text-blue-700"
                >
                  + Add Feature
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedPlan.active}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, active: e.target.value === 'true' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPlanModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                >
                  {selectedPlan.id ? 'Save Changes' : 'Add Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Record Payment</h2>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Member ID</label>
                <input
                  type="text"
                  required
                  value={selectedPayment.memberId}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, memberId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Member Name</label>
                <input
                  type="text"
                  required
                  value={selectedPayment.memberName}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, memberName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Plan</label>
                <select
                  value={selectedPayment.plan}
                  onChange={(e) => {
                    const plan = membershipPlans.find(p => p.name === e.target.value);
                    setSelectedPayment({
                      ...selectedPayment,
                      plan: e.target.value,
                      amount: plan?.price || 0
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  {membershipPlans.map(plan => (
                    <option key={plan.id} value={plan.name}>{plan.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={selectedPayment.amount}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, amount: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Next Payment Date</label>
                <input
                  type="date"
                  required
                  value={selectedPayment.nextPayment}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, nextPayment: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipPayments;