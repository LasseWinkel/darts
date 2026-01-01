import "./Multiple.css";

interface MultipleProps {
  styleName: string;
  color: string;
  isDead: boolean;
  multiplier: number;
  number: number;
  hitNumber: (field: number, amount: number) => void;
}

function Multiple(props: MultipleProps) {
  const { styleName, color, isDead, number, multiplier, hitNumber } = props;
  return (
    <div
      className={`multiple ${styleName} m${color} ${isDead && "dead"}`}
      onClick={() => hitNumber(number, multiplier)}
    ></div>
  );
}

export default Multiple;
