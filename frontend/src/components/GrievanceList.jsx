import React from 'react';
import { FiEdit2, FiTrash2, FiClock, FiCheckCircle } from 'react-icons/fi';

const GrievanceList = ({ grievances, onEdit, onDelete }) => {
  if (grievances.length === 0) {
    return (
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="text-gray-400 text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Grievances Found</h3>
        <p className="text-gray-500">You haven't submitted any grievances yet or none match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {grievances.map((g) => (
        <div key={g._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className={`absolute top-0 left-0 w-2 h-full ${g.status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                {g.category}
              </span>
            </div>
            <span className={`flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
              g.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {g.status === 'Resolved' ? <FiCheckCircle className="mr-1" /> : <FiClock className="mr-1" />}
              {g.status}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{g.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{g.description}</p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
            <span className="text-xs text-gray-400 font-medium">
              {new Date(g.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit(g)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors tooltip"
                title="Edit"
              >
                <FiEdit2 />
              </button>
              <button 
                onClick={() => onDelete(g._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors tooltip"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrievanceList;
