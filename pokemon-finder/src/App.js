import React, { useState, useEffect } from 'react';
import PokemonDisplay from './PokemonDisplay';
import PokemonSearch from './PokemonSearch';
import LoadingScreen from './LoadingScreen';  // Import the new loading screen
import './App.css';
import pokemonIcon from './assets/pokemon-icon.png';

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Start loading screen initially
  const [id, setId] = useState(1);

  // Fetch first 50 Pokémon when the app loads
  useEffect(() => {
    const fetchFirstFiftyPokemon = async () => {
      setLoading(true);
      const firstFiftyPokemon = [];

      try {
        for (let i = 1; i <= 50; i++) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          if (!response.ok) {
            throw new Error('Failed to fetch Pokémon');
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
          firstFiftyPokemon.push(newPokemon);
        }
        setSelectedPokemon(firstFiftyPokemon[0]);  // Automatically select the first Pokémon
      } catch (error) {
        console.error(error);
        setError('Failed to load Pokémon');
      } finally {
        setLoading(false);  // Stop loading once all 50 are fetched
      }
    };

    fetchFirstFiftyPokemon();
  }, []);

  const fetchPokemon = async (identifier) => {
    setLoading(true);  // Start loading when fetching a new Pokémon

    let pokemonName;

    if (typeof identifier === 'number') {
      pokemonName = identifier;
    } else if (typeof identifier === 'string') {
      pokemonName = identifier.toLowerCase();
    } else {
      console.error('identifier is not a string or number:', identifier);
      setLoading(false);  // Stop loading screen in case of error
      return;
    }

    const cachedPokemon = JSON.parse(localStorage.getItem(pokemonName));

    if (cachedPokemon) {
      setSelectedPokemon(cachedPokemon);
      setError('');
      setId(cachedPokemon.number);
      setLoading(false);  // Stop loading once Pokémon is fetched
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
      setSelectedPokemon(newPokemon);
      setError('');
      localStorage.setItem(pokemonName, JSON.stringify(newPokemon));
      setId(data.id);
    } catch (error) {
      setError('Pokemon not found');
      setSelectedPokemon(null);
    } finally {
      setLoading(false);  // Ensure loading is set to false after data is fetched
    }
  };

  const handleNext = () => {
    fetchPokemon(id + 1);
  };

  const handlePrevious = () => {
    if (id > 1) {
      fetchPokemon(id - 1);
    } else {
      fetchPokemon(898);  // Loop to the last Pokémon in the National Pokédex
    }
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
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="app-header">
            <img src={pokemonIcon} alt="Pokémon Icon" className="app-icon" />
            <h1 className="title">Pokémon Search</h1>
          </div>
          <PokemonSearch onSearch={fetchPokemon} />
          <button className="random-button" onClick={handleRandomPokemon}>Random Pokémon</button>

          {selectedPokemon && <PokemonDisplay pokemon={selectedPokemon} onEvolutionClick={handleEvolutionClick} />}
          {error && <p className="error-message">{error}</p>}
          <div className="navigation">
            <button className="nav-button" onClick={handlePrevious} disabled={id <= 0}>Previous</button>
            <button className="nav-button" onClick={handleNext}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
