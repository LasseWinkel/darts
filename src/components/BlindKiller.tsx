import "./BlindKiller.css";
import Board from "./Board";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import { Link } from "react-router-dom";

// @ts-ignore
import failureSound from "../sounds/fail-sound.mp3";
// @ts-ignore
import drumRoll from "../sounds/drum-roll.mp3";
// @ts-ignore
import dartThrow from "../sounds/dart-throw.mp3";
import { Lives, LivesMock, PlayerType } from "../types";
import { BlindKillerService } from "../services/blindkillerservice";
import { PlayerService } from "../services/playerservice";

interface BlindKillerLog {
  field: number;
  livesKilled: number;
}

function BlindKiller() {
  const [numberOfLives, setNumberOfLives] = useState<number>(0);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [lives, setLives] = useState<Lives[]>(Array(21).fill(LivesMock));

  const [deadPlayers, setDeadPlayers] = useState<PlayerType[]>([]);
  const [playersAlive, setAlivePlayers] = useState<PlayerType[]>(players);
  const [winner, setWinner] = useState<PlayerType | undefined>(undefined);
  const [log, setLog] = useState<BlindKillerLog[]>([]);

  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    BlindKillerService.fetchNumberOfLives().then((numOfLives) =>
      setNumberOfLives(numOfLives)
    );
    PlayerService.fetchPlayers().then((aPlayers) => setPlayers(aPlayers));
    PlayerService.fetchPlayers().then((aPlayers) => setAlivePlayers(aPlayers));
    BlindKillerService.getCurrentLives().then((lives) => setLives(lives));
  }, []);

  useEffect(() => {
    const currentTime = Date.now();
    if (currentTime - mountTimeRef.current >= 2000) {
      if (playersAlive.length === 1) {
        setWinner(playersAlive[0]);
      } else {
        setWinner(undefined);
      }
    }
  }, [playersAlive]);

  const stepBack = () => {
    const { field, livesKilled } = { ...log[log.length - 1] };
    reverseLastLog(field, livesKilled);
  };

  const reverseLastLog = (field: number, livesKilled: number) => {
    const newLives = [...lives];

    BlindKillerService.setLives({
      ...lives[field - 1],
      lives: newLives[field - 1].lives + livesKilled,
    }).then((updatedLives) => setLives(updatedLives));

    for (const player of players) {
      if (player.number === field && newLives[field - 1].lives > 0) {
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
    const audio = new Audio(dartThrow);
    audio.play();

    let newLives = [...lives];

    const substractLive = () => {
      BlindKillerService.setLives({
        ...lives[field - 1],
        lives: newLives[field - 1].lives - livesKilled,
      }).then((updatedLives) => setLives(updatedLives));
      newLives[field - 1].lives = newLives[field - 1].lives - livesKilled;

      for (const player of players) {
        if (player.number === field && newLives[field - 1].lives <= 0) {
          const playerIsAlreadyDead = deadPlayers.find(
            (aPlayer) => aPlayer.name === player.name
          );
          if (!playerIsAlreadyDead) {
            setDeadPlayers([...deadPlayers, player]);

            const newAlivePlayers = playersAlive.filter(
              (aPlayer) => aPlayer.name !== player.name
            );
            setAlivePlayers(newAlivePlayers);
            const audio = new Audio(failureSound);
            audio.play();
          }
        }
      }
      setLog([...log, { field, livesKilled }]);
    };

    if (
      newLives[field - 1].lives > 0 &&
      newLives[field - 1].lives - livesKilled <= 0
    ) {
      const audio = new Audio(drumRoll);
      audio.play();
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
          <thead>
            <tr>
              <th>Field</th>
              <th>Lives</th>
              <th>Player</th>
            </tr>
          </thead>
          <tbody>
            {lives.map((aLives) => {
              return (
                <tr
                  className={
                    winner && winner.number === aLives.field + 1
                      ? "winner-row"
                      : ""
                  }
                  key={Math.random()}
                >
                  <th>{aLives.field === 20 ? "Bull" : aLives.field + 1}</th>
                  <th>{aLives.lives < 0 ? 0 : aLives.lives}</th>
                  <th>
                    {winner
                      ? checkIfPlayerHasNumber(aLives.field + 1)
                      : aLives.lives <= 0
                      ? checkIfPlayerHasNumber(aLives.field + 1)
                      : ""}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="blind-killer-end">
          {winner && (
            <>
              <div className="winner">Winner: {winner && winner.name}</div>
              <Button
                handleClick={BlindKillerService.resetBlindKiller}
                styleName="button-confirm"
              >
                <Link className="link-inside-button" to="/modi">
                  New game <br /> (same players)
                </Link>
              </Button>
              <Button
                handleClick={BlindKillerService.resetBlindKiller}
                styleName="button-confirm"
              >
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
