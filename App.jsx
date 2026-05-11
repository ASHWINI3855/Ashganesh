import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import Maldives from './pages/Maldives';
import Singapore from './pages/Singapore';
import About from './pages/About';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/maldives" element={<Maldives />} />
                        <Route path="/singapore" element={<Singapore />} />
                        {/* Safety redirect for removed Our Pillars page */}
                        <Route path="/our-pillars" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
                <Footer />
                <FloatingButtons />
            </div>
        </Router>
    );
}

export default App;
