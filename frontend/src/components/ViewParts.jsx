import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewParts = () => {
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/parts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this part?')) {
      try {
        await axios.delete(`http://localhost:5000/api/parts/${id}`);
        fetchParts();
      } catch (error) {
        console.error('Error deleting part:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-part/${id}`);
  };

  return (
    <div className="container">
      <h2>Parts List</h2>
      <button 
        className="btn btn-primary"
        onClick={() => navigate('/add-part')}
      >
        Add New Part
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Part Type</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price(Rs)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td>{part.id}</td>
              <td>{part.name}</td>
              <td>{part.partType}</td>
              <td>{part.brand}</td>
              <td>{part.quantityInStock}</td>
              <td>{part.price}</td>
              <td>{part.status}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(part.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(part.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewParts; 