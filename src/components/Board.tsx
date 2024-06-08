import "./Board.css";
import Segment from "./Segment";
import Bull from "./Bull";

interface BoardProps {
  lives?: number[];
  hitNumber: (field: number, amount: number) => void;
}

function Board(props: BoardProps) {
  const { lives, hitNumber } = props;

  return (
    <div className="board">
      <Segment
        number={1}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[0]}
      />
      <Segment
        number={2}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[1]}
      />
      <Segment
        number={3}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[2]}
      />
      <Segment
        number={4}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[3]}
      />
      <Segment
        number={5}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[4]}
      />
      <Segment
        number={6}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[5]}
      />
      <Segment
        number={7}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[6]}
      />
      <Segment
        number={8}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[7]}
      />
      <Segment
        number={9}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[8]}
      />
      <Segment
        number={10}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[9]}
      />
      <Segment
        number={11}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[10]}
      />
      <Segment
        number={12}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[11]}
      />
      <Segment
        number={13}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[12]}
      />
      <Segment
        number={14}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[13]}
      />
      <Segment
        number={15}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[14]}
      />
      <Segment
        number={16}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[15]}
      />
      <Segment
        number={17}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[16]}
      />
      <Segment
        number={18}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[17]}
      />
      <Segment
        number={19}
        color="white "
        hitNumber={hitNumber}
        liveCount={lives && lives[18]}
      />
      <Segment
        number={20}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[19]}
      />
      <Bull hitNumber={hitNumber} />
    </div>
  );
}

export default Board;
