import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ClassManagement() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Yoga Basics',
      instructor: 'Sarah Johnson',
      schedule: 'Mon, Wed, Fri',
      time: '09:00 AM',
      capacity: 20,
      enrolled: 15,
      status: 'active'
    },
    {
      id: 2,
      name: 'CrossFit',
      instructor: 'Mike Thompson',
      schedule: 'Tue, Thu',
      time: '10:30 AM',
      capacity: 15,
      enrolled: 12,
      status: 'active'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newClass, setNewClass] = useState({
    name: '',
    instructor: '',
    schedule: '',
    time: '',
    capacity: '',
    status: 'active'
  });

  const handleAddClass = (e) => {
    e.preventDefault();
    const classId = classes.length + 1;
    setClasses([...classes, { ...newClass, id: classId, enrolled: 0 }]);
    setShowAddModal(false);
    setNewClass({
      name: '',
      instructor: '',
      schedule: '',
      time: '',
      capacity: '',
      status: 'active'
    });
    toast.success('Class added successfully');
  };

  const handleEditClass = (e) => {
    e.preventDefault();
    setClasses(classes.map(c => c.id === selectedClass.id ? selectedClass : c));
    setShowEditModal(false);
    toast.success('Class updated successfully');
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== classId));
      toast.success('Class deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add New Class
        </button>
      </div>

      {/* Class List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{classItem.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedClass(classItem);
                    setShowEditModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteClass(classItem.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {classItem.schedule} at {classItem.time}
              </p>
              <p>Instructor: {classItem.instructor}</p>
              <div className="flex justify-between">
                <span>Capacity: {classItem.enrolled}/{classItem.capacity}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${classItem.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Class</h2>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                <input
                  type="text"
                  required
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <input
                  type="text"
                  required
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                <input
                  type="text"
                  required
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="e.g., Mon, Wed, Fri"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="text"
                  required
                  value={newClass.time}
                  onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="e.g., 09:00 AM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  required
                  value={newClass.capacity}
                  onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newClass.status}
                  onChange={(e) => setNewClass({ ...newClass, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {showEditModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Class</h2>
            <form onSubmit={handleEditClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                <input
                  type="text"
                  required
                  value={selectedClass.name}
                  onChange={(e) => setSelectedClass({ ...selectedClass, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <input
                  type="text"
                  required
                  value={selectedClass.instructor}
                  onChange={(e) => setSelectedClass({ ...selectedClass, instructor: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                <input
                  type="text"
                  required
                  value={selectedClass.schedule}
                  onChange={(e) => setSelectedClass({ ...selectedClass, schedule: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="text"
                  required
                  value={selectedClass.time}
                  onChange={(e) => setSelectedClass({ ...selectedClass, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  required
                  value={selectedClass.capacity}
                  onChange={(e) => setSelectedClass({ ...selectedClass, capacity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedClass.status}
                  onChange={(e) => setSelectedClass({ ...selectedClass, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassManagement;