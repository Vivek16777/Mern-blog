import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';
import Header from './Component/Header.jsx';
import Footer from './Component/Footercmp.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <div className='min-h-screen flex flex-col'>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

