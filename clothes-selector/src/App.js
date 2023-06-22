import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClothesList from './ClothesList';
import AddCloth from './AddCloth';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ClothesList />} />
          <Route path="/add" element={<AddCloth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
