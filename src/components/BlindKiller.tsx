import "./BlindKiller.css";
import Board from "./Board";
import { useEffect, useState } from "react";

export type PlayerType = {
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
  const [playersAlive, setAlivePlayers] = useState<PlayerType[]>(players);
  const [winner, setWinner] = useState<PlayerType>({} as PlayerType);

  useEffect(() => {
    if (playersAlive.length === 1) {
      setWinner(playersAlive[0]);
    }
  }, [playersAlive]);

  const hitNumber = (field: number, livesKilled: number) => {
    const newLives = [...lives];

    newLives[field - 1] = newLives[field - 1] - livesKilled;
    if (newLives[field - 1] < 0) {
      newLives[field - 1] = 0;
    }
    setLives(newLives);

    for (const player of players) {
      if (player.number === field && newLives[field - 1] === 0) {
        const playerIsAlreadyDead = deadPlayers.find(
          (aPlayer) => aPlayer.name === player.name
        );
        if (!playerIsAlreadyDead) {
          setDeadPlayers([...deadPlayers, player]);
          const newAlivePlayers = playersAlive.filter(
            (aPlayer) => aPlayer.name !== player.name
          );
          setAlivePlayers(newAlivePlayers);
        }
      }
    }
  };

  return (
    <div className="blind-killer">
      <header className="blind-killer-header">
        <h1>Blind Killer</h1>
      </header>
      <div className="vertical">
        <Board hitNumber={hitNumber} lives={lives} />
        <div className="winner">{winner && winner.name}</div>
      </div>
      <div className="bull-count">
        Bull: <span>{lives[20]}</span>
      </div>
      <div className="dead-players">
        Dead:{" "}
        {deadPlayers.map((aPlayer) => (
          <span>{aPlayer.name} </span>
        ))}
      </div>
    </div>
  );
}

export default BlindKiller;
