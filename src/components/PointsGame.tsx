import "./PointsGame.css";
import Board from "./Board";
import { useState } from "react";

import Button from "./Button";
import { Link } from "react-router-dom";
import { PlayerType } from "./BlindKiller";
import { Games } from "./Points";

interface PointsGameProps {
  players: PlayerType[];
  game?: Games;
}

function PointsGame(props: PointsGameProps) {
  const { players, game } = props;

  const [finishedPlayers, setFinishedPlayers] = useState<PlayerType[]>([]);
  const [allPlayers, setAllPlayers] = useState<PlayerType[]>(players);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(players[0]);
  const [winner, setWinner] = useState<PlayerType | undefined>(undefined);
  const [throwNumber, setThrowNumber] = useState<number>(1);
  const [pointsBeforeThrow, setPointsBeforeThrow] = useState<number>(
    currentPlayer.points
  );

  const setNextPlayer = (currentPlayerIndex: number) => {
    let i = currentPlayerIndex + 1;
    let playerFound = false;
    while (!playerFound && i < allPlayers.length) {
      if (allPlayers[i].points > 1) {
        playerFound = true;
      } else {
        i += 1;
      }
    }
    if (!playerFound) {
      i = 0;
      while (!playerFound && i < currentPlayerIndex) {
        if (allPlayers[i].points > 1) {
          playerFound = true;
        } else {
          i += 1;
        }
      }
    }
    if (!playerFound) {
      setWinner(finishedPlayers[0]);
    } else {
      setCurrentPlayer(allPlayers[i]);
    }
  };

  const hitNumber = (field: number, amount: number) => {
    const isDoubleField = amount === 2 || (field === 21 && amount === 3);
    const currentPlayerIndex = allPlayers.findIndex(
      (aPlayer) => aPlayer.name === currentPlayer.name
    );
    if (throwNumber === 1) {
      setPointsBeforeThrow(currentPlayer.points);
    }

    const valueAfterThrow = currentPlayer.points - amount * field;

    if (
      (game === Games.DOUBLE_OUT && valueAfterThrow > 1) ||
      (game === Games.SINGLE_OUT && valueAfterThrow > 0)
    ) {
      const newPlayers = allPlayers.map((aPlayer) =>
        aPlayer.name === currentPlayer.name
          ? { ...aPlayer, points: valueAfterThrow }
          : aPlayer
      );
      setAllPlayers(newPlayers);
      setCurrentPlayer(newPlayers[currentPlayerIndex]);
      setThrowNumber(throwNumber + 1);
      if (throwNumber > 2) {
        setNextPlayer(currentPlayerIndex);
        setThrowNumber(1);
      }
    } else if (
      (valueAfterThrow === 0 && game === Games.DOUBLE_OUT && isDoubleField) ||
      (valueAfterThrow === 0 && game === Games.SINGLE_OUT)
    ) {
      const newPlayers = allPlayers.map((aPlayer) =>
        aPlayer.name === currentPlayer.name
          ? { ...aPlayer, points: valueAfterThrow }
          : aPlayer
      );
      setAllPlayers(newPlayers);
      setFinishedPlayers([...finishedPlayers, currentPlayer]);
      setNextPlayer(currentPlayerIndex);
      setThrowNumber(1);
    } else {
      const newPlayers = allPlayers.map((aPlayer) =>
        aPlayer.name === currentPlayer.name
          ? {
              ...aPlayer,
              points:
                throwNumber === 1 ? currentPlayer.points : pointsBeforeThrow,
            }
          : aPlayer
      );
      setAllPlayers(newPlayers);
      setNextPlayer(currentPlayerIndex);
      setThrowNumber(1);
    }
  };

  return (
    <div className="points-game">
      <header className="points-game-header">
        <h1>Points Game</h1>
      </header>
      <div className="vertical">
        <Board hitNumber={hitNumber} />
        <table className="count-table">
          <tbody>
            <tr>
              <th>Player</th>
              <th>Points</th>
            </tr>
            {allPlayers.map((aPlayer, aIndex) => {
              return (
                <tr key={aIndex}>
                  {currentPlayer.name === aPlayer.name ? (
                    <th className="current-player">
                      {aPlayer.name} ({4 - throwNumber})
                    </th>
                  ) : (
                    <th>{aPlayer.name}</th>
                  )}
                  <th>{aPlayer.points}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
        {winner !== undefined && (
          <div className="points-game-end">
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
      </div>
    </div>
  );
}

export default PointsGame;
