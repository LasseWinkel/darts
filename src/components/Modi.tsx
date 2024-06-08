import { Link } from "react-router-dom";
import "./Modi.css";
import Button from "./Button";

function Modi() {
  return (
    <div className="modi">
      <header className="modi-header">
        <h1>Games</h1>
      </header>
      <nav>
        <Button>
          <Link className="link-inside-button" to="/blindkiller">
            Blind Killer
          </Link>
        </Button>
        <br />
        <Button>
          <Link className="link-inside-button" to="/points">
            Points
          </Link>
        </Button>
      </nav>
    </div>
  );
}

export default Modi;
