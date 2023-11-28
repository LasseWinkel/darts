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

  const checkIfPlayerHasNumber = (number: number) => {
    const foundPlayer = players.find((aPlayer) => aPlayer.number === number);
    if (foundPlayer) {
      return foundPlayer.name;
    }
    return "-";
  };

  return (
    <div className="blind-killer">
      <header className="blind-killer-header">
        <h1>Blind Killer</h1>
      </header>
      <div className="vertical">
        <Board hitNumber={hitNumber} lives={lives} />
        <table className="count-table">
          <tr>
            <th>Field</th>
            <th>Lives</th>
            <th>Player</th>
          </tr>
          {lives.map((aLive, aIndex) => {
            return (
              <tr>
                <th>{aIndex === 20 ? "Bull" : aIndex + 1}</th>
                <th>{aLive}</th>
                <th>{aLive <= 0 ? checkIfPlayerHasNumber(aIndex + 1) : "-"}</th>
              </tr>
            );
          })}
        </table>
        <div className="winner">Winner: {winner && winner.name}</div>
      </div>
    </div>
  );
}

export default BlindKiller;
