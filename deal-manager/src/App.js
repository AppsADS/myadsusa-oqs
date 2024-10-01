import React from 'react';
import DealList from './components/DealList'; // Adjust path if necessary
import StageList from './components/StageList'; // Adjust path if necessary

function App() {
  return (
      <div className="App">
        <h1>Deal Manager</h1>
        <DealList /> {/* This will render the Deal List */}
        <StageList /> {/* This will render the Stage List */}
      </div>
  );
}

export default App;
