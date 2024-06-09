import "./BlindKiller.css";
import Board from "./Board";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import { Link } from "react-router-dom";

// @ts-ignore
import sound from "../sounds/fail-sound.mp3";

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

  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    const currentTime = Date.now();
    if (currentTime - mountTimeRef.current >= 2000) {
      if (playersAlive.length === 1) {
        setWinner(playersAlive[0]);
      } else {
        setWinner(undefined);
      }
      const audio = new Audio(sound);
      audio.play();
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
          setAlivePlayers([...playersAlive, player]);
        }
      }
    }
    setLog(log.slice(0, -1));
  };

  const hitNumber = (field: number, livesKilled: number) => {
    const newLives = [...lives];

    const substractLive = () => {
      newLives[field - 1] = newLives[field - 1] - livesKilled;
      setLives(newLives);

      for (const player of players) {
        if (player.number === field && newLives[field - 1] <= 0) {
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

    if (newLives[field - 1] - livesKilled <= 0) {
      setTimeout(() => {
        substractLive();
      }, 1000);
    } else {
      substractLive();
    }
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
                key={aIndex}
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
            <svg
              width="3rem"
              height="3rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10L3.64645 10.3536L3.29289 10L3.64645 9.64645L4 10ZM20.5 18C20.5 18.2761 20.2761 18.5 20 18.5C19.7239 18.5 19.5 18.2761 19.5 18L20.5 18ZM8.64645 15.3536L3.64645 10.3536L4.35355 9.64645L9.35355 14.6464L8.64645 15.3536ZM3.64645 9.64645L8.64645 4.64645L9.35355 5.35355L4.35355 10.3536L3.64645 9.64645ZM4 9.5L14 9.5L14 10.5L4 10.5L4 9.5ZM20.5 16L20.5 18L19.5 18L19.5 16L20.5 16ZM14 9.5C17.5898 9.5 20.5 12.4101 20.5 16L19.5 16C19.5 12.9624 17.0376 10.5 14 10.5L14 9.5Z"
                fill="#222222"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlindKiller;
