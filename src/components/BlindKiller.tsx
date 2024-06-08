import { log } from "console";
import "./BlindKiller.css";
import Board from "./Board";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
// import sound from "player-dead.mp3";
// import "player-dead.mp3";

// import sound from "../sounds/sound.mp3";

import Button from "./Button";
import { Link } from "react-router-dom";

export type PlayerType = {
  name: string;
  number: number;
  points: number;
};

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
  const [playUseSound] = useSound("../sounds/sound.mp3");

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
          // playSound();
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
    return "/";
  };

  // const audioRef = useRef<HTMLAudioElement>(null);

  // const playSound = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };

  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    setIsPlaying(true);
  };

  const handleSoundEnd = () => {
    setIsPlaying(false);
  };

  const audio = new Audio("./sound.mp3");

  // audio.play();

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
                <th>{aLive}</th>
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
        {winner && (
          <div className="blind-killer-end">
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
          </div>
        )}
        {/* <Button handleClick={playUseSound}>Play Sound</Button> */}
        {/* <audio autoPlay>
          <source src="player-dead.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio> */}
      </div>
    </div>
  );
}

export default BlindKiller;
