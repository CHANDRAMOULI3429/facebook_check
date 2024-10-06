import React from 'react';
import logo from './logo.svg';
import './App.css';
import FacebookLogin from './components/FacebookLogin';
import FacebookCallback from './components/FacebookCallback';
// Import React Router components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        
        <h1>Facebook Authentication</h1>
        <FacebookLogin />
        
        {/* Add routing for FacebookCallback */}
        <Routes>
          <Route path="/facebook/callback" element={<FacebookCallback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
