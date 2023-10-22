import "./BlindKiller.css";
import Board from "./Board";
import { useState } from "react";

type PlayerType = {
  name: string;
  number: number;
};

interface BlindKillerProps {
  players: PlayerType[];
}

function BlindKiller(props: BlindKillerProps) {
  const { players } = props;

  const [lives, setLives] = useState<number[]>(Array(21).fill(3));
  const [deadPlayers, setDeadPlayers] = useState<PlayerType[]>([]);

  const hitNumber = (field: number, livesKilled: number) => {
    const newLives = [...lives];

    newLives[field - 1] = newLives[field - 1] - livesKilled;
    if (newLives[field - 1] < 0) {
      newLives[field - 1] = 0;
    }

    for (const player of players) {
      if (player.number === field && newLives[field - 1] === 0) {
        const playerIsAlreadyDead = deadPlayers.find(
          (aPlayer) => aPlayer.name === player.name
        );
        if (!playerIsAlreadyDead) {
          setDeadPlayers([...deadPlayers, player]);
        }
      }
    }
    setLives(newLives);
  };

  return (
    <div className="blind-killer">
      <header className="blind-killer-header">
        <h1>Blinder Killer</h1>
      </header>
      <Board hitNumber={hitNumber} lives={lives} />
      <div className="lives">
        <span>{lives[20]}</span>
      </div>
      <div className="dead-players">
        <span>{deadPlayers.map((aPlayer) => aPlayer.name)}</span>
      </div>
    </div>
  );
}

export default BlindKiller;
