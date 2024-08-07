import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';



const BattlePage = () => {
  // Hier habe ich nur Platzhalter für den Nutzer und Computer eingefügt um zu testen
  const [pokemon1, setPokemon1] = useState({ name: 'Pikachu', hp: 100, attack: 15, sprites: { front_default: 'pikachu_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'electric' } }] });
  const [pokemon2, setPokemon2] = useState({ name: 'Charmander', hp: 100, attack: 15, sprites: { front_default: 'charmander_image_url' }, stats: [{ stat: { name: 'hp' }, base_stat: 100 }, { stat: { name: 'attack' }, base_stat: 15 }], types: [{ type: { name: 'fire' } }] });
  const [winner, setWinner] = useState(null); 

  const fight = () => {
    let p1 = { ...pokemon1 };
    let p2 = { ...pokemon2 };
    let turn = Math.random() < 0.5 ? 'p1' : 'p2';

    while (p1.hp > 0 && p2.hp > 0) {
      if (turn === 'p1') {
        p2.hp -= p1.attack;
        if (p2.hp <= 0) {
          setWinner(p1.name);
          break;
        }
        turn = 'p2';
      } else {
        p1.hp -= p2.attack;
        if (p1.hp <= 0) {
          setWinner(p2.name);
          break;
        }
        turn = 'p1';
      }
    }
  };

  return (
    <div>
      <h1>Battle Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PokemonCard pokemon={pokemon1} onClick={() => {}} />
        <PokemonCard pokemon={pokemon2} onClick={() => {}} />
      </div>
      <button onClick={fight}>Fight</button>
      {winner && <h2>{winner} wins!</h2>}
    </div>
  );
};

export default BattlePage;