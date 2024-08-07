import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';

const RoasterPage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {

    const fetchPokemons = async () => { 
      try {
        const response = await fetch('postgresql://Pokemon_owner:SpsUIOd3aJ2M@ep-odd-haze-a2ggjief.eu-central-1.aws.neon.tech/Pokemon?sslmode=require');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  },  []);  

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">My Roaster</h1>
      <div>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={handlePokemonClick} />
        ))}
      </div>
    </div>
  );
};

export default RoasterPage;