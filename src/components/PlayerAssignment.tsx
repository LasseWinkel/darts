import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Button from "./Button";
import "./PlayerAssignment.css";
import { PlayerType } from "../types";
import { PlayerService } from "../services/playerservice";
import { BlindKillerService } from "../services/blindkillerservice";

function PlayerAssignment() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [enteredPlayerName, setEnteredPlayerName] = useState<string>("");

  useEffect(() => {
    PlayerService.fetchPlayers().then((newPlayers) => setPlayers(newPlayers));
  }, []);

  const addPlayer = (playerName: string) => {
    if (playerName.length > 0) {
      const newPlayer: PlayerType = {
        id: players.length,
        name: playerName,
        number: 0,
        points: 0,
      };

      PlayerService.addPlayer(newPlayer).then((newPlayers) =>
        setPlayers(newPlayers)
      );

      setEnteredPlayerName("");
    }
  };

  const nameIsInvalid =
    enteredPlayerName === "" ||
    players.some((aPlayer) => aPlayer.name === enteredPlayerName) ||
    players.length >= 21;

  return (
    <div className="player-assignment">
      <header>
        <h1 className="player-assignment-header">New Darts Game</h1>
      </header>
      <div className="content">
        <div className="players-overview">
          {<div className="players-header">Players:</div>}
          {players.map((aPlayer, aIndex) => (
            <div key={aIndex}>
              {aPlayer.id + 1}. {aPlayer.name}
            </div>
          ))}
        </div>
        <div className="players-creation">
          {
            <React.Fragment>
              <input
                className="input-field"
                type="text"
                placeholder={`Name of ${players.length + 1}. Player`}
                maxLength={10}
                value={enteredPlayerName}
                onChange={(e) => setEnteredPlayerName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !nameIsInvalid &&
                  addPlayer(enteredPlayerName)
                }
                autoFocus
              />
              <Button
                styleName="button-confirm"
                handleClick={() => addPlayer(enteredPlayerName)}
                disabled={nameIsInvalid}
              >
                Confirm player name
              </Button>
            </React.Fragment>
          }

          {players.length > 0 && (
            <div className="button-wrapper">
              <Button
                handleClick={() => {
                  BlindKillerService.resetBlindKiller();
                  for (const player of players) {
                    PlayerService.updatePlayer({ ...player, number: 0 });
                  }
                }}
              >
                <Link className="link-inside-button" to="/modi">
                  Proceed
                </Link>
              </Button>
              <br />
              <Button
                styleName="button-cancel"
                handleClick={() => {
                  PlayerService.deletePlayer(players[players.length - 1]).then(
                    (newPlayers) => setPlayers(newPlayers)
                  );
                }}
              >
                Delete Last Player
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerAssignment;
