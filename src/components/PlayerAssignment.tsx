import { Link } from "react-router-dom";
import { PlayerType } from "./BlindKiller";
import { useState } from "react";
import React from "react";
import Button from "./Button";
import "./PlayerAssignment.css";

interface PlayerAssignmentProps {
  setPlayers: (players: PlayerType[]) => void;
}

function PlayerAssignment(props: PlayerAssignmentProps) {
  const { setPlayers } = props;

  const [updatedPlayers, setUpdatedPlayers] = useState<PlayerType[]>([]);
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
          points: 0,
        },
      ]);
      setEnteredPlayerName("");
    }
  };

  return (
    <div className="player-assignment">
      <header>
        <h1 className="player-assignment-header">New Darts Game</h1>
      </header>
      <div className="content">
        {numberOfPlayers === undefined && (
          <React.Fragment>
            <input
              className="input-field"
              type="number"
              placeholder="Number of players"
              value={enteredNumberOfPlayers}
              onChange={(e) => {
                setEnteredNumberOfPlayers(parseInt(e.target.value));
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && setNumberOfPlayers(enteredNumberOfPlayers)
              }
              autoFocus
            />
            <Button
              styleName="button-confirm"
              disabled={!enteredNumberOfPlayers || enteredNumberOfPlayers < 1}
              handleClick={() => setNumberOfPlayers(enteredNumberOfPlayers)}
            >
              Confirm number of players
            </Button>
          </React.Fragment>
        )}
        {numberOfPlayers &&
          numberOfPlayers > 0 &&
          updatedPlayers.length < numberOfPlayers && (
            <React.Fragment>
              <input
                className="input-field"
                type="text"
                placeholder={`Name of player ${
                  updatedPlayers.length + 1
                }/${numberOfPlayers}`}
                value={enteredPlayerName}
                onChange={(e) => setEnteredPlayerName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && addPlayer(enteredPlayerName)
                }
                autoFocus
              />
              <Button
                styleName="button-confirm"
                handleClick={() => addPlayer(enteredPlayerName)}
                disabled={enteredPlayerName === ""}
              >
                Confirm player name
              </Button>
            </React.Fragment>
          )}

        {updatedPlayers.length === numberOfPlayers && (
          <div className="button-wrapper">
            <Button handleClick={() => setPlayers(updatedPlayers)}>
              <Link className="link-inside-button" to="/modi">
                Games
              </Link>
            </Button>
            <br />
            <Button styleName="button-cancel">
              <Link className="link-inside-button" to="/" reloadDocument>
                Back
              </Link>
            </Button>
          </div>
        )}
        <div className="players-overview">
          {numberOfPlayers !== undefined && (
            <div className="players-header">Players:</div>
          )}
          {updatedPlayers.map((aPlayer, aIndex) => (
            <div key={aIndex}>{aPlayer.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerAssignment;
