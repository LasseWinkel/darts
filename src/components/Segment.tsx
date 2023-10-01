import "./Segment.css";
import Multiple from "./Multiple";

interface SegmentProps {
  number: number;
  color: string;
}

function Segment(props: SegmentProps) {
  const { number, color } = props;
  return (
    <div className={`segment-wrapper n${number}`}>
      <div className="number-wrapper">
        <span className="number">{number}</span>
      </div>
      <div className={`segment ${color}`} />
      <Multiple styleName="double" color={color} />
      <Multiple styleName="triple" color={color} />
    </div>
  );
}

export default Segment;
