import BlindKiller, { PlayerType } from "./BlindKiller";
import { useState } from "react";

interface NumberAssignmentProps {
  players: PlayerType[];
}

function NumberAssignment(props: NumberAssignmentProps) {
  const { players } = props;

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
      {!startGame && (
        <div className="name">
          {players[playerIndex].name}:{" "}
          {updatedPlayers[playerIndex]
            ? updatedPlayers[playerIndex].number
            : ""}
        </div>
      )}
      {updatedPlayers[playerIndex] === undefined && (
        <button
          className="show-button"
          onClick={() =>
            setUpdatedPlayers([
              ...updatedPlayers,
              {
                name: players[playerIndex].name,
                number: drawRandomNumber(),
              },
            ])
          }
        >
          Show number
        </button>
      )}
      {updatedPlayers[playerIndex] !== undefined &&
        playerIndex < players.length - 1 && (
          <button
            className="confirm-button"
            onClick={() => setPlayerIndex(playerIndex + 1)}
          >
            Alright
          </button>
        )}
      {playerIndex === players.length - 1 &&
        updatedPlayers[playerIndex] !== undefined &&
        !startGame && (
          <button className="start-button" onClick={() => setStartGame(true)}>
            Start the game
          </button>
        )}
      {startGame && <BlindKiller players={updatedPlayers} />}
    </div>
  );
}

export default NumberAssignment;
