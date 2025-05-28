import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddPart from './components/AddPart';
import ViewParts from './components/ViewParts';
import EditPart from './components/EditPart';
import AllParts from './components/AllParts';
import PartsFilter from './components/PartsFilter';
import './index.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">Vehicle Parts Management</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/all-parts">View All Parts</Link>
              <Link className="nav-link" to="/parts-filter">Search Parts</Link>
              <Link className="nav-link" to="/view-parts">Manage Parts</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AllParts />} />
          <Route path="/all-parts" element={<AllParts />} />
          <Route path="/parts-filter" element={<PartsFilter />} />
          <Route path="/view-parts" element={<ViewParts />} />
          <Route path="/add-part" element={<AddPart />} />
          <Route path="/edit-part/:id" element={<EditPart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
