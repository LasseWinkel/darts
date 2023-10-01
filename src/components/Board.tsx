import "./Board.css";
import Segment from "./Segment";
import Bull from "./Bull";

function Board() {
  return (
    <div className="board">
      <Segment number={1} color="white" />
      <Segment number={2} color="black" />
      <Segment number={3} color="black" />
      <Segment number={4} color="white" />
      <Segment number={5} color="white" />
      <Segment number={6} color="white" />
      <Segment number={7} color="black" />
      <Segment number={8} color="black" />
      <Segment number={9} color="white" />
      <Segment number={10} color="black" />
      <Segment number={11} color="white" />
      <Segment number={12} color="black" />
      <Segment number={13} color="black" />
      <Segment number={14} color="black" />
      <Segment number={15} color="white" />
      <Segment number={16} color="white" />
      <Segment number={17} color="white" />
      <Segment number={18} color="black" />
      <Segment number={19} color="white " />
      <Segment number={20} color="black" />
      <Bull />
    </div>
  );
}

export default Board;
