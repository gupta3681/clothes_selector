import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClothesList from './ClothesList';
import AddCloth from './AddCloth';

function App() {
  return (
    <Router>
      <div>
        <Route path="/aaa" exact component={ClothesList} />
        <Route path="/addaaa" component={AddCloth} />
      </div>
    </Router>
  );
}

export default App;
