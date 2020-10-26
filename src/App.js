import React from 'react';
import './App.css';

import Main from './components/Main.js';
import Info from './components/Info.js';

function App() {
  return (
    <>
    <section>
      <div className="container">
        <h2>John Conway's</h2>
        <br/>
        <h3>Game of Life</h3>
        <Main />
        <Info />
      </div>
      
    </section>
    </>
  );
}

export default App;
