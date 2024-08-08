import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const randomIds = Array.from(
          { length: 15 },
          () => Math.floor(Math.random() * 898) + 1,
        );
        const pokemonDetails = await Promise.all(
          randomIds.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return res.json();
          }),
        );
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`,
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setSearchResult(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setSearchResult(null);
      setErrorMessage("Pokémon not found");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackClick = () => {
    setSelectedPokemon(null);
  };

  const getAllRoster = async () => {
    try {
      const response = await fetch("http://localhost:3000/roster");
      if (response.status !== 200) throw Error("something went wrong");
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const addToRoster = async (pokemon) => {
    const rosterData = await getAllRoster();
    console.log(pokemon);
    if (!Array.isArray(rosterData)) {
      throw new Error("Roster data is not an array");
    }
  
    const pokemonData = {
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      type: pokemon.types.map((type) => type.type.name).join(", "),
      height: pokemon.height,
      weight: pokemon.weight,
      ability: pokemon.abilities.map(a => a.ability.name).join(', '),
      experience: pokemon.base_experience,
      hp: pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat,
      attack: pokemon.stats.find((stat) => stat.stat.name === "attack")
        ?.base_stat,
      defense: pokemon.stats.find((stat) => stat.stat.name === "defense")
        ?.base_stat,
      specialAttack: pokemon.stats.find(
        (stat) => stat.stat.name === "special-attack",
      )?.base_stat,
      specialDefense: pokemon.stats.find(
        (stat) => stat.stat.name === "special-defense",
      )?.base_stat,
      speed: pokemon.stats.find((stat) => stat.stat.name === "speed")
        ?.base_stat,
    };
console.log(pokemonData);
    const existingPokemon = rosterData.find((p) => p.name === pokemonData.name);
    if (existingPokemon) {
      alert("pokemon exitiert");
      return;
    }
    if (rosterData.length >= 5) {
      alert("You can only add up to 5 Pokémon.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/roster", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(pokemonData),
      });
      if (!response.ok) {
        throw new Error("Failed to add Pokémon");
      }

      alert("Pokémon added successfully.");
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container relative p-4 mx-auto">
      {errorMessage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 text-3xl font-bold text-black bg-white rounded shadow">
            {errorMessage}
          </div>
        </div>
      )}
      <h1 className="mb-4 text-3xl font-bold">Home Page</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pokémon"
          className="p-2 mr-2 border rounded"
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Submit
        </button>
      </form>
      {selectedPokemon ? (
        <div className="p-4 border rounded shadow pokemon-detail">
          <h2 className="mb-2 text-xl font-bold">
            {capitalizeFirstLetter(selectedPokemon.name)}
          </h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className="mb-2"
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>
            Type:{" "}
            {selectedPokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>Base Experience: {selectedPokemon.base_experience}</p>
          <p>
            Abilities:{" "}
            {selectedPokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>Stats:</p>
          <ul>
            {selectedPokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <button
            onClick={handleBackClick}
            className="p-2 mb-4 text-white bg-red-500 rounded"
          >
            Back
          </button>
          <button
            onClick={() => addToRoster(selectedPokemon)}
            className="p-2 mt-4 text-white bg-green-500 rounded"
          >
            Add to Roster
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResult ? (
            <PokemonCard pokemon={searchResult} onClick={handlePokemonClick} />
          ) : (
            pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handlePokemonClick}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
