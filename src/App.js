import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import FlightsPage from './features/flight/FlightsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FlightsPage />
      </header>
    </div>
  );
}

export default App;
