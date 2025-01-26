import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Popular from './pages/Popular';
import VisaFree from './pages/VisaFree';
import Cheap from './pages/Cheap';
import DestinationDetails from './pages/DestinationDetails';
import VisaApplication from './pages/VisaApplication';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/visa-free" element={<VisaFree />} />
          <Route path="/cheap" element={<Cheap />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/visa-application/:id" element={<VisaApplication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;