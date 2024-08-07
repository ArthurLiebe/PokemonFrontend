import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

const BattlePage = () => {
  const initialPokemons1 = [
    { name: 'Pikachu', hp: 100, attack: 15, sprites: { front_default: 'pikachu_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'electric' } }] },
    { name: 'Pikachu', hp: 100, attack: 15, sprites: { front_default: 'pikachu_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'electric' } }] },
    { name: 'Pikachu', hp: 100, attack: 15, sprites: { front_default: 'pikachu_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'electric' } }] },
    { name: 'Pikachu', hp: 100, attack: 15, sprites: { front_default: 'pikachu_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'electric' } }] },
    { name: 'Pikachu', hp: 100, attack: 15, sprites: { front_default: 'pikachu_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'electric' } }] },
  ];

  const [pokemons1, setPokemons1] = useState(initialPokemons1);
  const [pokemons2, setPokemons2] = useState([]);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const randomIds = Array.from({ length: 5 }, () => Math.floor(Math.random() * 898) + 1);
        const pokemonDetails = await Promise.all(
          randomIds.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return res.json();
          })
        );
        setPokemons2(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const fight = (pokemon1, pokemon2) => {
    let p1 = { ...pokemon1 };
    let p2 = { ...pokemon2 };
    let turn = Math.random() < 0.5 ? 'p1' : 'p2';

    while (p1.hp > 0 && p2.hp > 0) {
      if (turn === 'p1') {
        p2.hp -= p1.attack;
        if (p2.hp <= 0) {
          return 'player1';
        }
        turn = 'p2';
      } else {
        p1.hp -= p2.attack;
        if (p1.hp <= 0) {
          return 'player2';
        }
        turn = 'p1';
      }
    }
  };

  const startBattle = () => {
    let newScore = { player1: 0, player2: 0 };

    for (let i = 0; i < 5; i++) {
      const result = fight(pokemons1[i], pokemons2[i]);
      if (result === 'player1') {
        newScore.player1 += 1;
      } else {
        newScore.player2 += 1;
      }
    }

    setScore(newScore);
    setWinner(newScore.player1 > newScore.player2 ? 'Player 1' : 'Player 2');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Battle Page</h1>
      <p></p>
      <div className="flex flex-col items-center space-y-4">
        {pokemons1.map((pokemon1, index) => (
          <div key={index} className="flex items-center space-x-4">
            <PokemonCard pokemon={pokemon1} className="w-36" />
            <div className="text-xl font-bold">VS</div>
            {pokemons2[index] && <PokemonCard pokemon={pokemons2[index]} className="w-36" />}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        <button onClick={startBattle} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Start Battle
        </button>
        {winner && <h2 className="mt-4 text-xl font-bold">{winner} wins!</h2>}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold">Score</h3>
          <p>Player 1: {score.player1}</p>
          <p>Player 2: {score.player2}</p>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;