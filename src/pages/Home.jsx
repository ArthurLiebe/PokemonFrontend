import React, { useState, useEffect } from 'react';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      setSearchResult(data);
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setSearchResult(null);
      setErrorMessage('Pokémon not found');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000); // Clear the error message after 4 seconds
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      {errorMessage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-bold text-black bg-white p-4 rounded shadow">
            {errorMessage}
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pokémon"
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResult ? (
          <div className="pokemon-card border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{searchResult.name}</h2>
            <img src={searchResult.sprites.front_default} alt={searchResult.name} className="mb-2" />
            <p>Height: {searchResult.height}</p>
            <p>Weight: {searchResult.weight}</p>
            <p>Type: {searchResult.types.map((type) => type.type.name).join(', ')}</p>
          </div>
        ) : (
          pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-2" />
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;