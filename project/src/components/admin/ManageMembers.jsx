import { useState } from 'react';
import { FaSearch, FaFileExport, FaUserPlus, FaEdit, FaCheck, FaTimes, FaBan, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';
import { useMemberContext } from '../../contexts/MemberContext';

function ManageMembers() {
  const { 
    members, 
    addMember, 
    updateMember,
    updateMemberPayment, 
    updateMemberStatus,
    getMembershipAmount 
  } = useMemberContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [renewalFilter, setRenewalFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [renewalDate, setRenewalDate] = useState(addMonths(new Date(), 1).toISOString().split('T')[0]);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [editedMember, setEditedMember] = useState(null);
  const itemsPerPage = 10;

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'basic',
    startDate: new Date().toISOString().split('T')[0],
    paymentStatus: 'pending'
  });

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addMember({
        ...newMember,
        lastPaidDate: newMember.startDate,
        renewalDate: addMonths(new Date(newMember.startDate), 1).toISOString().split('T')[0],
        renewalStatus: newMember.paymentStatus,
        status: 'pending'
      });
      setShowAddMemberModal(false);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        address: '',
        membershipType: 'basic',
        startDate: new Date().toISOString().split('T')[0],
        paymentStatus: 'pending'
      });
    } catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  const handleAction = (member, type) => {
    setSelectedMember(member);
    setActionType(type);
    setActionReason('');
    setShowActionModal(true);
  };

  const confirmAction = async () => {
    try {
      await updateMemberStatus(selectedMember.id, actionType, actionReason);
      setShowActionModal(false);
    } catch (error) {
      console.error(`Failed to ${actionType} member:`, error);
    }
  };

  const handlePayment = (member) => {
    setSelectedMember(member);
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setRenewalDate(addMonths(new Date(), 1).toISOString().split('T')[0]);
    setShowPaymentModal(true);
  };

  const confirmPayment = async (e) => {
    e.preventDefault();
    try {
      const amount = getMembershipAmount(selectedMember.membershipType);
      await updateMemberPayment(selectedMember.id, paymentDate, renewalDate, amount);
      setShowPaymentModal(false);
    } catch (error) {
      console.error('Failed to update payment:', error);
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditedMember({ ...member });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMember(editedMember.id, editedMember);
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRenewal = renewalFilter === 'all' || member.renewalStatus === renewalFilter;
    
    return matchesSearch && matchesStatus && matchesRenewal;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    // Create CSV content
    const headers = ['Member ID', 'Name', 'Email', 'Phone', 'Status', 'Renewal Status', 'Last Paid Date'];
    const csvContent = [
      headers.join(','),
      ...filteredMembers.map(member => [
        member.memberId,
        member.name,
        member.email,
        member.phone,
        member.status,
        member.renewalStatus,
        member.lastPaidDate
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `members-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Member data exported successfully');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRenewalStatusBadgeClass = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Manage Members</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleExport}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FaFileExport className="mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowAddMemberModal(true)}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
          >
            <FaUserPlus className="mr-2" />
            Add Member
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
        <select
          value={renewalFilter}
          onChange={(e) => setRenewalFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Renewals</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending Renewal</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membership ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Renewal Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMembers.map((member, index) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.memberId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRenewalStatusBadgeClass(member.renewalStatus)}`}>
                      {member.renewalStatus === 'paid' ? 'Paid' : 'Pending Renewal'}
                    </span>
                    <div className="text-xs text-gray-500">
                      Last Paid: {new Date(member.lastPaidDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {member.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(member, 'approve')}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <FaCheck className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAction(member, 'reject')}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <FaTimes className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    {member.renewalStatus === 'pending' && (
                      <button
                        onClick={() => handlePayment(member)}
                        className="text-green-600 hover:text-green-900"
                        title="Mark as Paid"
                      >
                        <FaDollarSign className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleAction(member, member.status === 'suspended' ? 'activate' : 'suspend')}
                      className="text-gray-600 hover:text-gray-900"
                      title="Suspend/Activate"
                    >
                      <FaBan className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {(showAddMemberModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {showAddMemberModal ? 'Add New Member' : 'Edit Member'}
            </h2>
            <form onSubmit={showAddMemberModal ? handleAddMember : handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={showAddMemberModal ? newMember.name : editedMember?.name}
                  onChange={(e) => showAddMemberModal 
                    ? setNewMember({...newMember, name: e.target.value})
                    : setEditedMember({...editedMember, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={showAddMemberModal ? newMember.email : editedMember?.email}
                  onChange={(e) => showAddMemberModal
                    ? setNewMember({...newMember, email: e.target.value})
                    : setEditedMember({...editedMember, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={showAddMemberModal ? newMember.phone : editedMember?.phone}
                  onChange={(e) => showAddMemberModal
                    ? setNewMember({...newMember, phone: e.target.value})
                    : setEditedMember({...editedMember, phone: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  required
                  value={showAddMemberModal ? newMember.address : editedMember?.address}
                  onChange={(e) => showAddMemberModal
                    ? setNewMember({...newMember, address: e.target.value})
                    : setEditedMember({...editedMember, address: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  rows="3"
                ></textarea>
              </div>

              {showAddMemberModal && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Membership Type</label>
                    <select
                      value={newMember.membershipType}
                      onChange={(e) => setNewMember({...newMember, membershipType: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    >
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newMember.startDate}
                      onChange={(e) => setNewMember({...newMember, startDate: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                      value={newMember.paymentStatus}
                      onChange={(e) => setNewMember({...newMember, paymentStatus: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                </>
              )}

              {showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editedMember?.status}
                    onChange={(e) => setEditedMember({...editedMember, status: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => showAddMemberModal ? setShowAddMemberModal(false) : setShowEditModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                >
                  {showAddMemberModal ? 'Add Member' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
            </h2>
            <div className="space-y-4">
              <p>Are you sure you want to {actionType} this member?</p>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  rows="3"
                  placeholder="Enter reason..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 text-white rounded-lg ${
                    actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                    actionType === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                    'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Record Payment</h2>
            <form onSubmit={confirmPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Member Name</label>
                <input
                  type="text"
                  value={selectedMember?.name}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Next Renewal Date</label>
                <input
                  type="date"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
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
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageMembers;