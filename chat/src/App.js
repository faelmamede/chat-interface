import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Nav from './components/template/Nav'
import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
        <Nav />
      </div>
    </BrowserRouter>
  );
}

export default App;
