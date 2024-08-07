import React, { useState, useEffect } from 'react';

const RosterPage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('http://localhost:3000/roster');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setPokemons(data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handlePokemonClick = (pokemon) => {
    console.log('Pokemon clicked:', pokemon);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="text-3xl font-bold mb-4">
        <h1>My Roster</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => {
  
          const imageUrl = pokemon.sprites?.front_default || 'default-image-url';
          const hp = pokemon.stats?.find(stat => stat.stat.name === 'hp')?.base_stat || 'N/A';
          const attack = pokemon.stats?.find(stat => stat.stat.name === 'attack')?.base_stat || 'N/A';
          const types = pokemon.types?.map(type => type.type.name).join(', ') || 'Unknown';
  
          return (
            <div
              key={pokemon.id}
              className="pokemon-card border p-4 rounded shadow"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <h2 className="text-xl font-bold mb-2">{capitalizeFirstLetter(pokemon.name)}</h2>
              <img src={imageUrl} alt={pokemon.name} className="mb-2" />
              <p>HP: {hp}</p>
              <p>Attack: {attack}</p>
              <p>Type: {types}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 

export default RosterPage;