
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return await res.json();
        })
      );
      setPokemon(pokemonDetails);
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="pokemon-list">
        {filteredPokemon.map((p) => (
          <div className="pokemon-card" key={p.id}>
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
            <p>Height: {p.height}</p>
            <p>Weight: {p.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
