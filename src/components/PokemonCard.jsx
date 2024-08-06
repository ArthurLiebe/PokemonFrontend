import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="pokemon-card border p-4 rounded shadow" onClick={() => onClick(pokemon)}>
      <h2 className="text-xl font-bold mb-2">{capitalizeFirstLetter(pokemon.name)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-2" />
      <p>HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
      <p>Attack: {pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonCard;