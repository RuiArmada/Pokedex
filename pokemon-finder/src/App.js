// src/App.js
import React, { useState } from 'react';
import PokemonDisplay from './PokemonDisplay';
import PokemonSearch from './PokemonSearch';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [id, setId] = useState(1); // Starting Pokémon ID

  const fetchPokemon = async (identifier) => {
    let pokemonName;
  
    if (typeof identifier === 'number') {
      pokemonName = identifier; // Use the number directly if it's an ID
    } else if (typeof identifier === 'string') {
      pokemonName = identifier.toLowerCase(); // Convert to lowercase for name searches
    } else {
      console.error('identifier is not a string or number:', identifier);
      return;
    }
  
    const cachedPokemon = JSON.parse(localStorage.getItem(pokemonName));
    
    if (cachedPokemon) {
      setPokemon(cachedPokemon);
      setError('');
      setId(cachedPokemon.number);
      return;
    }
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      const newPokemon = {
        name: data.name,
        number: data.id,
        sprite: data.sprites.front_default,
        height: (data.height * 0.1).toFixed(2), // Convert decimetres to meters
        weight: (data.weight * 0.1).toFixed(2), // Convert hectograms to kilograms
        type: data.types.map(typeInfo => typeInfo.type.name).join(', '), // Multiple types
      };
      setPokemon(newPokemon);
      setError('');
      localStorage.setItem(pokemonName, JSON.stringify(newPokemon));
      setId(data.id);
    } catch (error) {
      setError('Pokemon not found');
      setPokemon(null);
    }
  };  

  const handleNext = () => {
    fetchPokemon(id + 1);
  };

  const handlePrevious = () => {
    if (id > 1) fetchPokemon(id - 1);
  };

  return (
    <div className="App">
      <h1 className="title">Pokémon Search</h1>
      <PokemonSearch onSearch={fetchPokemon} />
      {pokemon && <PokemonDisplay pokemon={pokemon} />}
      {error && <p className="error-message">{error}</p>}
      <div className="navigation">
        <button className="nav-button" onClick={handlePrevious} disabled={id <= 1}>Previous</button>
        <button className="nav-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
