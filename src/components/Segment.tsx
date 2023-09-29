import "./Segment.css";

interface SegmentProps {
  number: number;
  color: string;
}

function Segment(props: SegmentProps) {
  const { number, color } = props;
  return (
    <div className={`segment ${color} n${number}`}>
      <span className="number">{number}</span>
    </div>
  );
}

export default Segment;
