import React, { useState } from 'react';
import PokemonDisplay from './PokemonDisplay';
import PokemonSearch from './PokemonSearch';
import './App.css';
import pokemonIcon from './assets/pokemon-icon.png';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [id, setId] = useState(1);

  const fetchPokemon = async (identifier) => {
    let pokemonName;

    if (typeof identifier === 'number') {
      pokemonName = identifier;
    } else if (typeof identifier === 'string') {
      pokemonName = identifier.toLowerCase();
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
        shiny: data.sprites.front_shiny,
        height: (data.height * 0.1).toFixed(2),
        weight: (data.weight * 0.1).toFixed(2),
        type: data.types.map(typeInfo => typeInfo.type.name).join(', '),
        types: data.types.map(typeInfo => typeInfo.type.name),
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

  const handleEvolutionClick = (evolutionId) => {
    fetchPokemon(evolutionId);
  };

  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(randomId);
  };

  return (
    <div className="App">
      <div className="app-header">
        <img src={pokemonIcon} alt="Pokémon Icon" className="app-icon" />
        <h1 className="title">Pokémon Search</h1>
      </div>
      <PokemonSearch onSearch={fetchPokemon} />
      <button className="random-button" onClick={handleRandomPokemon}>Random Pokémon</button>
      
      
      {pokemon && <PokemonDisplay pokemon={pokemon} onEvolutionClick={handleEvolutionClick} />}
      {error && <p className="error-message">{error}</p>}
      <div className="navigation">
        <button className="nav-button" onClick={handlePrevious} disabled={id <= 1}>Previous</button>
        <button className="nav-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;