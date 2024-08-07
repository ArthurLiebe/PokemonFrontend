import React, { useState, useEffect } from "react";

const RosterPage = () => {
  const [pokemons, setPokemons] = useState([]);
  
  const fetchPokemons = async () => {
    try {
      const response = await fetch("http://localhost:3000/roster");
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setPokemons(data);
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
    console.log("Pokemon clicked:", pokemon);
  };

  const deleteRoster = async (pokemon)=>{
    try {
      const res = await fetch(`http://localhost:3000/roster/${pokemon.name}`, {
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
            pokemon.sprites?.front_default || "default-image-url";
          const hp =
            pokemon.stats?.find((stat) => stat.stat.name === "hp")?.base_stat ||
            "N/A";
          const attack =
            pokemon.stats?.find((stat) => stat.stat.name === "attack")
              ?.base_stat || "N/A";
          const types =
            pokemon.types?.map((type) => type.type.name).join(", ") ||
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
                <button className="btn" onClick={() => deleteRoster(pokemon)}>X</button>
              </div>
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
