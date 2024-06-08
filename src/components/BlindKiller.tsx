import "./BlindKiller.css";
import Board from "./Board";
import { useEffect, useState } from "react";

import Button from "./Button";
import { Link } from "react-router-dom";

export type PlayerType = {
  name: string;
  number: number;
  points: number;
};

interface BlindKillerLog {
  field: number;
  livesKilled: number;
}

interface BlindKillerProps {
  players: PlayerType[];
  numberOfLives?: number;
}

function BlindKiller(props: BlindKillerProps) {
  const { players, numberOfLives } = props;

  const [lives, setLives] = useState<number[]>(Array(21).fill(numberOfLives));
  const [deadPlayers, setDeadPlayers] = useState<PlayerType[]>([]);
  const [playersAlive, setAlivePlayers] = useState<PlayerType[]>(players);
  const [winner, setWinner] = useState<PlayerType | undefined>(undefined);
  const [log, setLog] = useState<BlindKillerLog[]>([]);

  useEffect(() => {
    if (playersAlive.length === 1) {
      setWinner(playersAlive[0]);
    }
  }, [playersAlive]);

  const stepBack = () => {
    const { field, livesKilled } = { ...log[log.length - 1] };
    reverseLastLog(field, livesKilled);
  };

  const reverseLastLog = (field: number, livesKilled: number) => {
    const newLives = [...lives];

    newLives[field - 1] = newLives[field - 1] + livesKilled;
    setLives(newLives);

    for (const player of players) {
      if (player.number === field && newLives[field - 1] > 0) {
        const playerIsAlreadyDead = deadPlayers.find(
          (aPlayer) => aPlayer.name === player.name
        );
        if (playerIsAlreadyDead) {
          const newDeadPlayers = deadPlayers.filter(
            (aPlayer) => aPlayer.name !== player.name
          );
          setDeadPlayers(newDeadPlayers);
          const newAlivePlayers = playersAlive.filter(
            (aPlayer) => aPlayer.name === player.name
          );
          setAlivePlayers(newAlivePlayers);
        }
      }
    }
    setLog(log.slice(0, -1));
  };

  const hitNumber = (field: number, livesKilled: number) => {
    const newLives = [...lives];

    newLives[field - 1] = newLives[field - 1] - livesKilled;
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
    setLog([...log, { field, livesKilled }]);
  };

  const checkIfPlayerHasNumber = (number: number) => {
    const foundPlayer = players.find((aPlayer) => aPlayer.number === number);
    if (foundPlayer) {
      return foundPlayer.name;
    }
    return "/";
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
              <tr
                className={
                  winner && winner.number === aIndex + 1 ? "winner-row" : ""
                }
              >
                <th>{aIndex === 20 ? "Bull" : aIndex + 1}</th>
                <th>{aLive < 0 ? 0 : aLive}</th>
                <th>
                  {winner
                    ? checkIfPlayerHasNumber(aIndex + 1)
                    : aLive <= 0
                    ? checkIfPlayerHasNumber(aIndex + 1)
                    : ""}
                </th>
              </tr>
            );
          })}
        </table>
        <div className="blind-killer-end">
          {winner && (
            <>
              <div className="winner">Winner: {winner && winner.name}</div>
              <Button styleName="button-confirm">
                <Link className="link-inside-button" to="/modi">
                  New game <br /> (same players)
                </Link>
              </Button>
              <Button styleName="button-confirm">
                <Link className="link-inside-button" to="/">
                  New game <br /> (new players)
                </Link>
              </Button>
            </>
          )}
          <Button
            disabled={log.length === 0}
            styleName="button-cancel"
            handleClick={stepBack}
          >
            Undo Last Hit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlindKiller;
