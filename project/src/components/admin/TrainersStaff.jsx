import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function TrainersStaff() {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Senior Trainer',
      specialization: ['Strength Training', 'CrossFit'],
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      schedule: 'Mon-Fri, 9AM-5PM',
      status: 'active',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      certifications: ['NASM CPT', 'CrossFit Level 2'],
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Yoga Instructor',
      specialization: ['Yoga', 'Meditation'],
      email: 'sarah.j@example.com',
      phone: '(555) 234-5678',
      schedule: 'Tue-Sat, 10AM-6PM',
      status: 'active',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      certifications: ['RYT 200', 'Meditation Instructor'],
      joinDate: '2023-03-20'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialization: [''],
    email: '',
    phone: '',
    schedule: '',
    status: 'active',
    image: '',
    certifications: [''],
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleAddStaff = () => {
    setModalMode('add');
    setFormData({
      name: '',
      role: '',
      specialization: [''],
      email: '',
      phone: '',
      schedule: '',
      status: 'active',
      image: '',
      certifications: [''],
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleEditStaff = (staffMember) => {
    setModalMode('edit');
    setSelectedStaff(staffMember);
    setFormData(staffMember);
    setShowModal(true);
  };

  const handleDeleteStaff = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter(s => s.id !== staffId));
      toast.success('Staff member removed successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newStaff = {
        ...formData,
        id: staff.length + 1
      };
      setStaff([...staff, newStaff]);
      toast.success('Staff member added successfully');
    } else {
      setStaff(staff.map(s => s.id === selectedStaff.id ? { ...formData, id: s.id } : s));
      toast.success('Staff member updated successfully');
    }
    setShowModal(false);
  };

  const handleArrayInput = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trainers & Staff</h1>
        <button
          onClick={handleAddStaff}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold
                ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditStaff(member)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(member.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  {member.email}
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2" />
                  {member.phone}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {member.schedule}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'add' ? 'Add New Staff Member' : 'Edit Staff Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                <input
                  type="text"
                  required
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="e.g., Mon-Fri, 9AM-5PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <input
                  type="date"
                  required
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                {formData.specialization.map((spec, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleArrayInput('specialization', index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('specialization', index)}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('specialization')}
                  className="text-sm text-primary hover:text-blue-700"
                >
                  + Add Specialization
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => handleArrayInput('certifications', index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('certifications', index)}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('certifications')}
                  className="text-sm text-primary hover:text-blue-700"
                >
                  + Add Certification
                </button>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                >
                  {modalMode === 'add' ? 'Add Staff Member' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainersStaff;