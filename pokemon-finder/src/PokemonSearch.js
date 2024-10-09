import React, { useState, useEffect } from 'react';
import './PokemonSearch.css';

const PokemonSearch = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);

  // Fetch or load Pokémon names from localStorage when the component mounts
  useEffect(() => {
    const cachedNames = localStorage.getItem('pokemonNames');

    if (cachedNames) {
      // Use cached names if available
      setAllPokemonNames(JSON.parse(cachedNames));
    } else {
      // Fetch Pokémon names if not cached
      const fetchPokemonNames = async () => {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
          const data = await response.json();
          const names = data.results.map(pokemon => pokemon.name);

          // Cache the names in localStorage
          localStorage.setItem('pokemonNames', JSON.stringify(names));
          setAllPokemonNames(names);
        } catch (error) {
          console.error("Error fetching Pokémon names:", error);
        }
      };

      fetchPokemonNames();
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    if (value.length > 0) {
      // Filter Pokémon names based on input
      const filteredSuggestions = allPokemonNames.filter(pokemonName => 
        pokemonName.toLowerCase().startsWith(value)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);  // Hide suggestions after selection
    onSearch(suggestion);  // Trigger search with the selected suggestion
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput('');  // Clear input after submission
    setSuggestions([]);  // Clear suggestions
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Pokémon name"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Display suggestions if there are any */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonSearch;
