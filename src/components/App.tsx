import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Modi from "./Modi";
import NumberAssignment from "./NumberAssignment";
import PlayerAssignment from "./PlayerAssignment";
import Points from "./Points";
import { usePreventRefresh } from "../hooks/usePreventRefresh";

function App() {
  usePreventRefresh(true);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PlayerAssignment />} />
          <Route path="/modi" element={<Modi />} />
          <Route path="/blindkiller" element={<NumberAssignment />} />
          <Route path="/points" element={<Points players={[]} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
