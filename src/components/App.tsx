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
          <Route
            path="/blindkiller"
            element={
              <BlindKiller
                players={[
                  { name: "usr1", number: 3 },
                  { name: "usr2", number: 4 },
                ]}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
