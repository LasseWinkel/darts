import { Link } from "react-router-dom";
import "./Modi.css";

function Modi() {
  return (
    <div className="modi">
      <header className="modi-header">
        <h1>Spielmodi</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/blindkiller">Blinder Killer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Modi;
