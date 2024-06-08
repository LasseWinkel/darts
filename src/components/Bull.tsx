import "./Bull.css";

interface BullProps {
  hitNumber: (field: number, livesKilled: number) => void;
}

function Bull(props: BullProps) {
  const { hitNumber } = props;

  return (
    <div className="bull-wrapper">
      <div className="single-bull" onClick={() => hitNumber(21, 1)}></div>
      <div className="bulls-eye" onClick={() => hitNumber(21, 3)}></div>
    </div>
  );
}

export default Bull;
