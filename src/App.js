import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import Layout from './Components/Layout/Layout';
import Detail from './Components/Detail/Detail';
import Watch from './Components/Watch/Watch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/detail/:slug' element={<Detail />} />
        <Route path='/watch/:slug' element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;