import "./Bull.css";

interface BullProps {
  liveCount?: number;
  hitNumber: (field: number, livesKilled: number) => void;
}

function Bull(props: BullProps) {
  const { liveCount, hitNumber } = props;

  const isDead = liveCount !== undefined && liveCount <= 0;

  return (
    <div className={`bull-wrapper ${isDead ? "dead" : ""}`}>
      <div
        className={`single-bull ${isDead ? "dead" : ""}`}
        onClick={() => hitNumber(21, 2)}
      ></div>
      <div
        className={`bulls-eye ${isDead ? "dead" : ""}`}
        onClick={() => hitNumber(21, 3)}
      ></div>
    </div>
  );
}

export default Bull;
