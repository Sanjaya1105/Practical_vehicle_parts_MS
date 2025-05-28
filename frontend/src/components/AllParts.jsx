import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllParts = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/parts');
      setParts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching parts:', error);
      setError('Failed to fetch parts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container text-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="header-section">
        <h2>All Vehicle Parts</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/view-parts')}
        >
          Add or Edit Parts
        </button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Part Type</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParts; 