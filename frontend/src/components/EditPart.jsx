import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState({
    name: '',
    partType: '',
    brand: '',
    quantityInStock: '',
    price: '',
    status: 'In Stock'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPart();
  }, [id]);

  const fetchPart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/parts/${id}`);
      setPart(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching part:', error);
      setError('Failed to fetch part details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      await axios.put(`http://localhost:5000/api/parts/${id}`, part);
      navigate('/view-parts');
    } catch (error) {
      console.error('Error updating part:', error);
      setError('Failed to update part. Please try again.');
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
        <h2>Edit Part</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/view-parts')}
        >
          Back to Parts List
        </button>
      </div>

      <div className="form-container">
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

          <button type="submit" className="btn btn-primary">Update Part</button>
        </form>
      </div>
    </div>
  );
};

export default EditPart; 