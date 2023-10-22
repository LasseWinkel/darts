import "./Segment.css";
import Multiple from "./Multiple";

interface SegmentProps {
  number: number;
  color: string;
  liveCount: number;
  hitNumber: (field: number, livesKilled: number) => void;
}

function Segment(props: SegmentProps) {
  const { number, color, liveCount, hitNumber } = props;
  return (
    <div className={`segment-wrapper n${number}`}>
      <div className="number-wrapper">
        <span className="number">{number}</span>
        <span className="liveCount">({liveCount})</span>
      </div>
      <div
        className={`segment ${color}`}
        onClick={() => hitNumber(number, 1)}
      />
      <Multiple
        styleName="double"
        color={color}
        multiplier={2}
        number={number}
        hitNumber={hitNumber}
      />
      <Multiple
        styleName="triple"
        color={color}
        multiplier={3}
        number={number}
        hitNumber={hitNumber}
      />
    </div>
  );
}

export default Segment;
