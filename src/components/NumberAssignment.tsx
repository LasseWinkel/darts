import BlindKiller, { PlayerType } from "./BlindKiller";
import { useState } from "react";
import Button from "./Button";
import "./NumberAssignment.css";
import React from "react";

interface NumberAssignmentProps {
  players: PlayerType[];
}

function NumberAssignment(props: NumberAssignmentProps) {
  const { players } = props;

  const [numberOfLives, setNumberOfLives] = useState<number | undefined>(
    undefined
  );
  const [enteredNumberOfLives, setEnteredNumberOfLives] = useState<
    number | undefined
  >(undefined);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [updatedPlayers, setUpdatedPlayers] = useState<PlayerType[]>([]);
  const [startGame, setStartGame] = useState(false);

  const drawRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 21) + 1;
    let numberAlreadyExists = updatedPlayers.find(
      (aPlayer) => aPlayer.number === randomNumber
    );
    while (numberAlreadyExists) {
      randomNumber = Math.floor(Math.random() * 21) + 1;
      numberAlreadyExists = updatedPlayers.find(
        (aPlayer) => aPlayer.number === randomNumber
      );
    }
    return randomNumber;
  };

  return (
    <div className="number-assignment">
      {numberOfLives === undefined && (
        <React.Fragment>
          <input
            className="input-field"
            type="number"
            placeholder="Number of lives"
            value={enteredNumberOfLives}
            onChange={(e) => {
              setEnteredNumberOfLives(parseInt(e.target.value));
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && setNumberOfLives(enteredNumberOfLives)
            }
            autoFocus
          />
          <Button
            styleName="button-confirm"
            disabled={!enteredNumberOfLives || enteredNumberOfLives < 1}
            handleClick={() => setNumberOfLives(enteredNumberOfLives)}
          >
            Confirm number of lives
          </Button>
        </React.Fragment>
      )}
      {numberOfLives !== undefined && !startGame && (
        <div className="name">
          {players[playerIndex].name}:{" "}
          {updatedPlayers[playerIndex]
            ? updatedPlayers[playerIndex].number === 21
              ? "Bull"
              : updatedPlayers[playerIndex].number
            : ""}
        </div>
      )}
      {numberOfLives !== undefined &&
        updatedPlayers[playerIndex] === undefined && (
          <Button
            styleName="show-button"
            handleClick={() =>
              setUpdatedPlayers([
                ...updatedPlayers,
                {
                  ...updatedPlayers[playerIndex],
                  name: players[playerIndex].name,
                  number: drawRandomNumber(),
                },
              ])
            }
          >
            Show number
          </Button>
        )}
      {updatedPlayers[playerIndex] !== undefined &&
        playerIndex < players.length - 1 && (
          <Button
            styleName="confirm-button"
            handleClick={() => setPlayerIndex(playerIndex + 1)}
          >
            Alright
          </Button>
        )}
      {playerIndex === players.length - 1 &&
        updatedPlayers[playerIndex] !== undefined &&
        !startGame && (
          <Button
            styleName="start-button"
            handleClick={() => setStartGame(true)}
          >
            Start the game
          </Button>
        )}
      {startGame && (
        <BlindKiller players={updatedPlayers} numberOfLives={numberOfLives} />
      )}
    </div>
  );
}

export default NumberAssignment;
