import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BlindKiller from "./BlindKiller";
import Modi from "./Modi";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Modi />} />
          <Route path="/blinderkiller" element={<BlindKiller />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
