import "./Segment.css";

interface SegmentProps {
  number: number;
  color: string;
}

function Segment(props: SegmentProps) {
  const { number, color } = props;
  return (
    <div className={`segment-wrapper ${color} n${number}`}>
      <div className="number-wrapper">
        <span className="number">{number}</span>
      </div>
      <div className="segment" />
    </div>
  );
}

export default Segment;
