// src/PokemonDisplay.js
import React, { useEffect, useState } from 'react';
import './PokemonDisplay.css';

const PokemonDisplay = ({ pokemon }) => {
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.number}`);
        const data = await response.json();
        const evolutionChainUrl = data.evolution_chain.url;
        
        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();
        setEvolutions(extractEvolutions(evolutionData));
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      }
    };

    if (pokemon) {
      fetchEvolutions();
    }
  }, [pokemon]);

  const extractEvolutions = (data) => {
    const evolutions = [];
    let current = data.chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        id: current.species.url.split('/').slice(-2, -1)[0],
      });
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  return (
    <div className="pokemon-display">
      <h2 className="pokemon-name">{pokemon.name} #{pokemon.number}</h2>
      <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
      <div className="pokemon-info">
        <p><strong>Type:</strong> {pokemon.type}</p>
        <p><strong>Height:</strong> {pokemon.height} m</p>
        <p><strong>Weight:</strong> {pokemon.weight} kg</p>
      </div>
      <h3>Evolutions</h3>
      <div className="evolutions">
        {evolutions.map((evo, index) => (
          <div key={index} className="evolution">
            <p>{evo.name} #{evo.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDisplay;
