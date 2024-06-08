import "./Points.css";
import Button from "./Button";
import { PlayerType } from "./BlindKiller";
import { useState } from "react";
import React from "react";
import PointsGame from "./PointsGame";

interface PointsProps {
  players: PlayerType[];
}

export enum Games {
  DOUBLE_OUT = "Double-Out",
  SINGLE_OUT = "Single-Out",
}

const GAMES = [Games.DOUBLE_OUT, Games.SINGLE_OUT];

function Points(props: PointsProps) {
  const { players } = props;

  const [game, setGame] = useState<Games | undefined>(undefined);
  const [points, setPoints] = useState<number | undefined>(undefined);
  const [enteredPoints, setEnteredPoints] = useState<number | undefined>(
    undefined
  );
  const [updatedPlayers, setUpdatedPlayers] = useState<PlayerType[]>([]);

  return (
    <div className="points">
      {game === undefined &&
        GAMES.map((aGame) => (
          <React.Fragment>
            <Button handleClick={() => setGame(aGame)}>{aGame}</Button>
            <br />
          </React.Fragment>
        ))}
      {game !== undefined && points === undefined && (
        <React.Fragment>
          <input
            className="input-field"
            type="number"
            placeholder="Number of points"
            value={enteredPoints}
            onChange={(e) => {
              setEnteredPoints(parseInt(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPoints(enteredPoints);
                enteredPoints &&
                  players.forEach(
                    (aPlayer) => (aPlayer.points = enteredPoints)
                  );
                setUpdatedPlayers(players);
              }
            }}
            autoFocus
          />
          <Button
            disabled={
              !enteredPoints ||
              (game === Games.DOUBLE_OUT && enteredPoints < 2) ||
              (game === Games.SINGLE_OUT && enteredPoints < 1)
            }
            handleClick={() => {
              setPoints(enteredPoints);
              enteredPoints &&
                players.forEach((aPlayer) => (aPlayer.points = enteredPoints));
              setUpdatedPlayers(players);
            }}
          >
            Confirm number of points
          </Button>
        </React.Fragment>
      )}
      {points !== undefined && (
        <PointsGame players={updatedPlayers} game={game} />
      )}
    </div>
  );
}

export default Points;
