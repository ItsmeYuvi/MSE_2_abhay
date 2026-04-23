import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GrievanceForm from '../components/GrievanceForm';
import GrievanceList from '../components/GrievanceList';
import { FiSearch, FiPlus } from 'react-icons/fi';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGrievance, setEditingGrievance] = useState(null);

  const fetchGrievances = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/grievances`);
      setGrievances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchGrievances();
      return;
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/grievances/search?title=${searchTerm}`);
      setGrievances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (grievance) => {
    setEditingGrievance(grievance);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this grievance?')) {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await axios.delete(`${API_URL}/api/grievances/${id}`);
        fetchGrievances();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Search grievances by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner"
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-400 text-lg" />
          <button type="submit" className="hidden">Search</button>
        </form>

        <button 
          onClick={() => { setEditingGrievance(null); setIsFormOpen(!isFormOpen); }}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-all shadow-md hover:shadow-lg"
        >
          {isFormOpen ? 'Close Form' : <><FiPlus className="mr-2 text-lg" /> File New Grievance</>}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all">
          <GrievanceForm 
            fetchGrievances={fetchGrievances} 
            closeForm={() => setIsFormOpen(false)} 
            editingGrievance={editingGrievance} 
          />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">
            📋
          </span>
          Your Grievances
        </h2>
        <GrievanceList grievances={grievances} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
