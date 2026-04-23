import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GrievanceForm = ({ fetchGrievances, closeForm, editingGrievance }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic',
    status: 'Pending'
  });

  useEffect(() => {
    if (editingGrievance) {
      setFormData({
        title: editingGrievance.title,
        description: editingGrievance.description,
        category: editingGrievance.category,
        status: editingGrievance.status
      });
    }
  }, [editingGrievance]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGrievance) {
        await axios.put(`http://localhost:5000/api/grievances/${editingGrievance._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/grievances', formData);
      }
      fetchGrievances();
      closeForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to submit grievance');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
        {editingGrievance ? 'Edit Grievance' : 'Submit New Grievance'}
      </h3>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
        <input 
          type="text" name="title" value={formData.title} onChange={handleChange} required 
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          placeholder="Brief title of the issue"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea 
          name="description" value={formData.description} onChange={handleChange} required rows="4"
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
          placeholder="Provide detailed information about your grievance..."
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select 
            name="category" value={formData.category} onChange={handleChange} 
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          >
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {editingGrievance && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select 
              name="status" value={formData.status} onChange={handleChange} 
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={closeForm} className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium shadow-sm transition-colors">
          {editingGrievance ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default GrievanceForm;
