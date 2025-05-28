import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartsFilter = () => {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartType, setSelectedPartType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [partTypes, setPartTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParts();
  }, []);

  useEffect(() => {
    // Extract unique part types when parts data is loaded
    if (parts.length > 0) {
      const uniquePartTypes = [...new Set(parts.map(part => part.partType))];
      setPartTypes(uniquePartTypes);
    }
  }, [parts]);

  useEffect(() => {
    // Filter parts whenever searchTerm, selectedPartType, or selectedStatus changes
    let filtered = parts;

    // Filter by part type
    if (selectedPartType !== 'all') {
      filtered = filtered.filter(part => part.partType === selectedPartType);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(part => part.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(part =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredParts(filtered);
  }, [searchTerm, selectedPartType, selectedStatus, parts]);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/parts');
      setParts(response.data);
      setFilteredParts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching parts:', error);
      setError('Failed to fetch parts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePartTypeChange = (e) => {
    setSelectedPartType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
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
        <h2>Search Parts</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/view-parts')}
        >
          Manage Parts
        </button>
      </div>

      <div className="filters-section">
        <div className="search-section">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by part name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-dropdown">
          <select
            className="form-control"
            value={selectedPartType}
            onChange={handlePartTypeChange}
          >
            <option value="all">All Part Types</option>
            {partTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown">
          <select
            className="form-control"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="all">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
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
              <th>Price(Rs)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map((part) => (
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
        {filteredParts.length === 0 && (
          <div className="no-results">
            No parts found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsFilter; 