import React, { useState, useEffect, useRef } from "react";
import { setBattleResult } from "../components/BattleResults.js";
import BattleDialog from "../components/BattleDialog.jsx";

const BattlePage = () => {
  const [pokemons1, setPokemons1] = useState([]);
  const [pokemons2, setPokemons2] = useState([]);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [logs, setLogs] = useState([]); // State to store logs
  const logsEndRef = useRef(null); // Reference to the end of the logs container

  useEffect(() => {
    const fetchPokemons1 = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL}/roster`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        const data = await response.json();

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

        setPokemons2(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data from API:", error);
      }
    };

    fetchPokemons1();
    fetchPokemons2();
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const fight = (pokemon1, pokemon2) => {
    let p1 = { ...pokemon1 };
    let p2 = { ...pokemon2 };
  
    p1.hp = p1.stats.find(stat => stat.stat.name === "hp").base_stat;
    p2.hp = p2.stats.find(stat => stat.stat.name === "hp").base_stat;
  
    p1.attack = p1.stats.find(stat => stat.stat.name === "attack").base_stat;
    p2.attack = p2.stats.find(stat => stat.stat.name === "attack").base_stat;
  
    let turn = Math.random() < 0.5 ? "p1" : "p2";
  
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    const p1Name = capitalizeFirstLetter(p1.name);
    const p2Name = capitalizeFirstLetter(p2.name);

    const newLogs = [
      `**Starting fight between ${p1Name} and ${p2Name}!**`,
      `Initial HP: ${p1Name} (${p1.hp}), ${p2Name} (${p2.hp})`
    ];
  
    while (p1.hp > 0 && p2.hp > 0) {
      if (turn === "p1") {
        p2.hp -= p1.attack;
        newLogs.push(`${p1Name} attacks ${p2Name}, ${p2Name} HP: ${p2.hp}`);
        if (p2.hp <= 0) {
          setLogs(prevLogs => [...prevLogs, ...newLogs]);
          return "player1";
        }
        turn = "p2";
      } else {
        p1.hp -= p2.attack;
        newLogs.push(`${p2Name} attacks ${p1Name}, ${p1Name} HP: ${p1.hp}`);
        if (p1.hp <= 0) {
          setLogs(prevLogs => [...prevLogs, ...newLogs]);
          return "player2";
        }
        turn = "p1";
      }
    }
  };

  const startBattle = async () => {
    let newScore = { player1: 0, player2: 0 };
    setLogs([]); 
  
    for (let i = 0; i < 5; i++) {
      const result = fight(pokemons1[i], pokemons2[i]);
      if (result === "player1") {
        newScore.player1 += 1;
      } else {
        newScore.player2 += 1;
      }
      await new Promise(resolve => setTimeout(resolve, 3000)); 
    }
  
    setScore(newScore);
    const winner =
      newScore.player1 > newScore.player2 ? "Player 1" : "Player 2";
    setWinner(winner);
    const resultString = `${winner} wins ${newScore.player1}:${newScore.player2}`;
    setBattleResult(resultString);
    setLogs(prevLogs => [...prevLogs, `**${resultString}**`]);
    document.getElementById("my_modal_1").showModal();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold text-center font-press-start">Battle Page</h1>
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
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={startBattle}
            className="px-4 py-2 mt-4 btn bg-transparent bg-yellow-300 hover:bg-yellow-600 font-press-start"
          >
            Start Battle
          </button>
        </div>
        <div className="mt-4 p-4 border rounded shadow ">
          <h2 className="text-xl font-bold text-center font-press-start">Battle Logs</h2>
          <div className="mt-2 font-bold text-center ">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
        <BattleDialog score={score}/>
      </div>
    </>
  );
};

export default BattlePage;