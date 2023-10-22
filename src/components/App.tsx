import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Modi from "./Modi";
import NumberAssignment from "./NumberAssignment";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Modi />} />
          <Route
            path="/blindkiller"
            element={
              <NumberAssignment
                players={[
                  { name: "usr1", number: 0 },
                  { name: "usr2", number: 0 },
                  { name: "usr3", number: 0 },
                  { name: "usr4", number: 0 },
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
