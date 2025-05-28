import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPart = () => {
  const [part, setPart] = useState({
    name: '',
    partType: '',
    brand: '',
    quantityInStock: '',
    price: '',
    status: 'In Stock'
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart(prevPart => ({
      ...prevPart,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/parts', part);
      navigate('/view-parts');
    } catch (error) {
      console.error('Error adding part:', error);
      setError('Failed to add part. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="header-section">
        <h2>Add New Part</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/view-parts')}
        >
          Back to Parts List
        </button>
      </div>

      <div className="form-container">
        {error && <div className="text-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Part Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={part.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="partType">Part Type</label>
            <input
              type="text"
              className="form-control"
              id="partType"
              name="partType"
              value={part.partType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={part.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="quantityInStock">Quantity in Stock</label>
            <input
              type="number"
              className="form-control"
              id="quantityInStock"
              name="quantityInStock"
              value={part.quantityInStock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="price">Price (Rs)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={part.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={part.status}
              onChange={handleChange}
              required
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Add Part</button>
        </form>
      </div>
    </div>
  );
};

export default AddPart; 