import BlindKiller from "./BlindKiller";
import { useEffect, useState } from "react";
import Button from "./Button";
import "./NumberAssignment.css";
import React from "react";
import { PlayerType, PlayerTypeMock } from "../types";
import { PlayerService } from "../services/playerservice";
import { BlindKillerService } from "../services/blindkillerservice";

function NumberAssignment() {
  const [players, setPlayers] = useState<PlayerType[]>([PlayerTypeMock]);
  const [enteredNumberOfLives, setEnteredNumberOfLives] = useState<number>(0);
  const [numberOfLives, setNumberOfLives] = useState<number>(0);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    PlayerService.fetchPlayers().then((newPlayers) => setPlayers(newPlayers));

    BlindKillerService.fetchNumberOfLives().then((numberOfLives) =>
      setNumberOfLives(numberOfLives)
    );
    BlindKillerService.getGameStarted().then((newGameStarted) =>
      setGameStarted(newGameStarted)
    );
  }, []);

  const drawRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 21) + 1;
    let numberAlreadyExists = players.find(
      (aPlayer) => aPlayer.number === randomNumber
    );
    while (numberAlreadyExists) {
      randomNumber = Math.floor(Math.random() * 21) + 1;
      numberAlreadyExists = players.find(
        (aPlayer) => aPlayer.number === randomNumber
      );
    }
    return randomNumber;
  };

  const numberOfLivesIsInvalid =
    !enteredNumberOfLives || enteredNumberOfLives < 1;

  return (
    <div className="number-assignment">
      {!gameStarted && numberOfLives === 0 && (
        <React.Fragment>
          <input
            className="input-field"
            type="number"
            placeholder="Number of lives"
            value={enteredNumberOfLives <= 0 ? "" : enteredNumberOfLives}
            min={1}
            onChange={(e) => {
              setEnteredNumberOfLives(parseInt(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !numberOfLivesIsInvalid) {
                BlindKillerService.setNumberOfLives(enteredNumberOfLives).then(
                  (newNumberOfLives) => setNumberOfLives(newNumberOfLives)
                );
                for (let i = 0; i < 21; i++) {
                  BlindKillerService.setLives({
                    field: i,
                    lives: enteredNumberOfLives,
                  });
                }
              }
            }}
            autoFocus
          />
          <Button
            styleName="button-confirm"
            disabled={numberOfLivesIsInvalid}
            handleClick={() => {
              if (enteredNumberOfLives) {
                BlindKillerService.setNumberOfLives(enteredNumberOfLives).then(
                  (newNumberOfLives) => setNumberOfLives(newNumberOfLives)
                );
                for (let i = 0; i < 21; i++) {
                  BlindKillerService.setLives({
                    field: i,
                    lives: enteredNumberOfLives,
                  });
                }
              }
            }}
          >
            Confirm number of lives
          </Button>
        </React.Fragment>
      )}
      {!gameStarted && numberOfLives > 0 && (
        <div className="name">
          {players[playerIndex].name}:{" "}
          {players[playerIndex].number === 0
            ? ""
            : players[playerIndex].number === 21
            ? "Bull"
            : players[playerIndex].number}
        </div>
      )}
      {!gameStarted &&
        numberOfLives > 0 &&
        players[playerIndex].number === 0 && (
          <Button
            styleName="show-button"
            handleClick={() => {
              const newPlayer = {
                ...players[playerIndex],
                number: drawRandomNumber(),
              };
              PlayerService.updatePlayer(newPlayer).then((newPlayers) =>
                setPlayers(newPlayers)
              );
            }}
          >
            Show number
          </Button>
        )}
      {!gameStarted &&
        players[playerIndex].number !== 0 &&
        playerIndex < players.length - 1 && (
          <Button
            styleName="confirm-button"
            handleClick={() => setPlayerIndex(playerIndex + 1)}
          >
            Alright
          </Button>
        )}
      {!gameStarted &&
        playerIndex === players.length - 1 &&
        players[playerIndex].number !== 0 && (
          <Button
            styleName="start-button"
            handleClick={() =>
              BlindKillerService.setGameStarted(true).then((newGameStarted) =>
                setGameStarted(newGameStarted)
              )
            }
          >
            Start the game
          </Button>
        )}
      {gameStarted && <BlindKiller />}
    </div>
  );
}

export default NumberAssignment;
