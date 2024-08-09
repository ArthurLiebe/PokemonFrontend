import React, { useState, useEffect } from "react";

const RosterPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  const fetchPokemons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL}/roster`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setPokemons(()=>data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackClick = () => {
    setSelectedPokemon(null);
  };

  const deleteRoster = async (pokemon)=>{
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL}/roster/${pokemon.name}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!res.ok) {
        throw new Error("Failed to add Pokémon");
      }
      fetchPokemons();

    } catch (error) {
      console.error('Error delete Pokémon data:', error);
    }
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container relative p-4 mx-auto">
      <div className="mb-4 text-3xl font-bold">
        <h1>My Roster</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemons.map((pokemon) => {
          const imageUrl =
            pokemon.image || "default-image-url";
          const hp =
            pokemon.hp ||
            "N/A";
          const attack =
            pokemon.attack || "N/A";
          const types =
            pokemon.type ||
            "Unknown";

          return (
            <div
              key={pokemon.id}
              className="p-4 border rounded shadow pokemon-card"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <div className="flex justify-between">
                <h2 className="mb-2 text-xl font-bold">
                  {capitalizeFirstLetter(pokemon.name)}
                </h2>
                <button className="btn" onClick={(e) => {
                  e.stopPropagation();
                  deleteRoster(pokemon);
                }}>X</button>
              </div>
              <img src={imageUrl} alt={pokemon.name} className="mb-2" />
              <p>HP: {hp}</p>
              <p>Attack: {attack}</p>
              <p>Type: {types}</p>
            </div>
          );
        })}
      </div>
      {selectedPokemon && (
        <div className="fixed inset-0 p-8 bg-white pokemon-details">
          <button 
            onClick={() => setSelectedPokemon(null)} 
            className="absolute text-2xl top-2 right-2"
          >
            &times;
          </button>
          <div className="p-4 border rounded shadow pokemon-detail">
            <h2 className="mb-4 text-3xl font-bold">{capitalizeFirstLetter(selectedPokemon.name)}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} className="mb-4" />
            <p><strong>Type:</strong> {selectedPokemon.type}</p>
            <p><strong>Height:</strong> {selectedPokemon.height}</p>
            <p><strong>Weight:</strong> {selectedPokemon.weight}</p>
            <p><strong>Ability:</strong> {selectedPokemon.ability}</p>
            <p><strong>Base Experience:</strong> {selectedPokemon.experience}</p>
            <p><strong>HP:</strong> {selectedPokemon.hp}</p>
            <p><strong>Attack:</strong> {selectedPokemon.attack}</p>
            <p><strong>Defense:</strong> {selectedPokemon.defense}</p>
            <p><strong>Special Attack:</strong> {selectedPokemon.specialAttack}</p>
            <p><strong>Special Defense:</strong> {selectedPokemon.specialDefense}</p>
            <p><strong>Speed:</strong> {selectedPokemon.speed}</p>
          
            <button onClick={handleBackClick} className="p-2 mb-4 text-white bg-red-500 rounded">
              Back
            </button>
          </div>
          

        </div>
      )}
    </div>
  );
};

export default RosterPage;