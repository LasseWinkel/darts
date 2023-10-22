import "./Multiple.css";

interface MultipleProps {
  styleName: string;
  color: string;
  multiplier: number;
  number: number;
  hitNumber: (field: number, livesKilled: number) => void;
}

function Multiple(props: MultipleProps) {
  const { styleName, color, number, multiplier, hitNumber } = props;
  return (
    <div
      className={`multiple ${styleName} m${color}`}
      onClick={() => hitNumber(number, multiplier)}
    ></div>
  );
}

export default Multiple;
