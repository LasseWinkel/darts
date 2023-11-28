import { Link } from "react-router-dom";
import { PlayerType } from "./BlindKiller";
import { useState } from "react";
import React from "react";

interface PlayerAssignmentProps {
  setPlayers: (players: PlayerType[]) => void;
}

function PlayerAssignment(props: PlayerAssignmentProps) {
  const { setPlayers } = props;

  const [updatedPlayers, setUpdatedPlayers] = useState<PlayerType[]>([]);
  const [playersConfirmed, setPlayersConfirmed] = useState<boolean>(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number | undefined>(
    undefined
  );
  const [enteredNumberOfPlayers, setEnteredNumberOfPlayers] = useState<
    number | undefined
  >(undefined);
  const [enteredPlayerName, setEnteredPlayerName] = useState<string>("");

  const addPlayer = (playerName: string) => {
    if (playerName.length > 0) {
      setUpdatedPlayers([
        ...updatedPlayers,
        {
          name: playerName,
          number: 0,
        },
      ]);
      setEnteredPlayerName("");
    }
  };

  return (
    <div className="player-assignment">
      {numberOfPlayers === undefined && (
        <React.Fragment>
          <input
            type="number"
            placeholder="Number of players"
            value={enteredNumberOfPlayers}
            onChange={(e) => {
              setEnteredNumberOfPlayers(parseInt(e.target.value));
            }}
          />
          <button onClick={() => setNumberOfPlayers(enteredNumberOfPlayers)}>
            Confirm number of players
          </button>
        </React.Fragment>
      )}
      {numberOfPlayers &&
        numberOfPlayers > 0 &&
        updatedPlayers.length < numberOfPlayers && (
          <React.Fragment>
            <input
              type="text"
              placeholder="Name of player"
              value={enteredPlayerName}
              onChange={(e) => setEnteredPlayerName(e.target.value)}
            />
            <button onClick={() => addPlayer(enteredPlayerName)}>
              Confirm player name
            </button>
          </React.Fragment>
        )}

      {updatedPlayers.length === numberOfPlayers && !playersConfirmed && (
        <button
          onClick={() => {
            setPlayersConfirmed(true);
            setPlayers(updatedPlayers);
          }}
        >
          Confirm players
        </button>
      )}
      {updatedPlayers.length === numberOfPlayers && playersConfirmed && (
        <Link to="/modi">Spielmodi</Link>
      )}
      {updatedPlayers.map((aPlayer) => (
        <div>{aPlayer.name}</div>
      ))}
    </div>
  );
}

export default PlayerAssignment;
