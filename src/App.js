import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;