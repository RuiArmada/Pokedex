// LoadingScreen.js
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="pokeball-container">
        <div className="pokeball">
          <div className="pokeball-top"></div>
          <div className="pokeball-bottom"></div>
          <div className="pokeball-center"></div>
        </div>
      </div>
      <h2>Loading Pokedex...</h2>
    </div>
  );
};

export default LoadingScreen;
