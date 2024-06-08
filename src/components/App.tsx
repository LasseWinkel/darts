import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Modi from "./Modi";
import NumberAssignment from "./NumberAssignment";
import { useState } from "react";
import { PlayerType } from "./BlindKiller";
import PlayerAssignment from "./PlayerAssignment";
import Points from "./Points";

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const handleSetPlayers = (players: PlayerType[]) => {
    setPlayers(players);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<PlayerAssignment setPlayers={handleSetPlayers} />}
          />
          <Route path="/modi" element={<Modi />} />
          <Route
            path="/blindkiller"
            element={<NumberAssignment players={players} />}
          />
          <Route path="/points" element={<Points players={players} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
