import React, { useState, useEffect } from "react";
import { setBattleResult } from "../components/BattleResults.js";
import BattleDialog from "../components/BattleDialog.jsx";

const BattlePage = () => {
  const [pokemons1, setPokemons1] = useState([]);
  const [pokemons2, setPokemons2] = useState([]);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    const fetchPokemons1 = async () => {
      try {
        const response = await fetch("http://localhost:3000/roster");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        const data = await response.json();

        console.log("Fetched Pokemons1:", data);

        if (Array.isArray(data)) {
          const formattedData = data.map((pokemon) => ({
            name: pokemon.name,
            sprites: { front_default: pokemon.image },
            stats: [
              { base_stat: pokemon.hp, stat: { name: "hp" } },
              { base_stat: pokemon.attack, stat: { name: "attack" } },
              { base_stat: pokemon.defense, stat: { name: "defense" } },
              {
                base_stat: pokemon.specialAttack,
                stat: { name: "special-attack" },
              },
              {
                base_stat: pokemon.specialDefense,
                stat: { name: "special-defense" },
              },
              { base_stat: pokemon.speed, stat: { name: "speed" } },
            ],
            types: [{ type: { name: pokemon.type } }],
          }));
          setPokemons1(formattedData);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    const fetchPokemons2 = async () => {
      try {
        const randomIds = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 898) + 1,
        );
        const pokemonDetails = await Promise.all(
          randomIds.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return res.json();
          }),
        );

        console.log("Fetched Pokemons2:", pokemonDetails);

        setPokemons2(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data from API:", error);
      }
    };

    fetchPokemons1();
    fetchPokemons2();
  }, []);

  const fight = (pokemon1, pokemon2) => {
    let p1 = { ...pokemon1 };
    let p2 = { ...pokemon2 };
    let turn = Math.random() < 0.5 ? "p1" : "p2";

    while (p1.hp > 0 && p2.hp > 0) {
      if (turn === "p1") {
        p2.hp -= p1.attack;
        if (p2.hp <= 0) {
          return "player1";
        }
        turn = "p2";
      } else {
        p1.hp -= p2.attack;
        if (p1.hp <= 0) {
          return "player2";
        }
        turn = "p1";
      }
    }
  };

  const startBattle = () => {
    let newScore = { player1: 0, player2: 0 };

    for (let i = 0; i < 5; i++) {
      const result = fight(pokemons1[i], pokemons2[i]);
      if (result === "player1") {
        newScore.player1 += 1;
      } else {
        newScore.player2 += 1;
      }
    }

    setScore(newScore);
    const winner =
      newScore.player1 > newScore.player2 ? "Player 1" : "Player 2";
    setWinner(winner);
    const resultString = `${winner} wins ${newScore.player1}:${newScore.player2}`;
    setBattleResult(resultString);
    document.getElementById("my_modal_1").showModal();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold text-center">Battle Page</h1>
        <div className="flex flex-col items-center space-y-4">
          {pokemons1.map((pokemon1, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="p-4 border rounded shadow pokemon-card w-36">
                {pokemon1.sprites ? (
                  <>
                    <h2 className="mb-2 text-xl font-bold">
                      {capitalizeFirstLetter(pokemon1.name)}
                    </h2>
                    <img
                      src={pokemon1.sprites.front_default}
                      alt={pokemon1.name}
                      className="mb-2"
                    />
                    <p>
                      HP:{" "}
                      {
                        pokemon1.stats.find((stat) => stat.stat.name === "hp")
                          .base_stat
                      }
                    </p>
                    <p>
                      Attack:{" "}
                      {
                        pokemon1.stats.find(
                          (stat) => stat.stat.name === "attack",
                        ).base_stat
                      }
                    </p>
                    <p>
                      Type:{" "}
                      {pokemon1.types.map((type) => type.type.name).join(", ")}
                    </p>
                  </>
                ) : (
                  <p>n/a</p>
                )}
              </div>
              <div className="text-xl font-bold">VS</div>
              {pokemons2[index] && pokemons2[index].sprites ? (
                <div className="p-4 border rounded shadow pokemon-card w-36">
                  <h2 className="mb-2 text-xl font-bold">
                    {capitalizeFirstLetter(pokemons2[index].name)}
                  </h2>
                  <img
                    src={pokemons2[index].sprites.front_default}
                    alt={pokemons2[index].name}
                    className="mb-2"
                  />
                  <p>
                    HP:{" "}
                    {
                      pokemons2[index].stats.find(
                        (stat) => stat.stat.name === "hp",
                      ).base_stat
                    }
                  </p>
                  <p>
                    Attack:{" "}
                    {
                      pokemons2[index].stats.find(
                        (stat) => stat.stat.name === "attack",
                      ).base_stat
                    }
                  </p>
                  <p>
                    Type:{" "}
                    {pokemons2[index].types
                      .map((type) => type.type.name)
                      .join(", ")}
                  </p>
                </div>
              ) : (
                <p>n/a</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={startBattle}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          >
            Start Battle
          </button>
          {winner && (
            <h2 className="mt-4 text-xl font-bold">
              {winner} wins {score.player1}:{score.player2}
            </h2>
          )}
        </div>
        <BattleDialog />
      </div>
    </>
  );
};

export default BattlePage;
