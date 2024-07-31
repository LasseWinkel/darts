import "./Board.css";
import Segment from "./Segment";
import Bull from "./Bull";
import { Lives } from "../types";

interface BoardProps {
  lives?: Lives[];
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
        liveCount={lives && lives[0].lives}
      />
      <Segment
        number={2}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[1].lives}
      />
      <Segment
        number={3}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[2].lives}
      />
      <Segment
        number={4}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[3].lives}
      />
      <Segment
        number={5}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[4].lives}
      />
      <Segment
        number={6}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[5].lives}
      />
      <Segment
        number={7}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[6].lives}
      />
      <Segment
        number={8}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[7].lives}
      />
      <Segment
        number={9}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[8].lives}
      />
      <Segment
        number={10}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[9].lives}
      />
      <Segment
        number={11}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[10].lives}
      />
      <Segment
        number={12}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[11].lives}
      />
      <Segment
        number={13}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[12].lives}
      />
      <Segment
        number={14}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[13].lives}
      />
      <Segment
        number={15}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[14].lives}
      />
      <Segment
        number={16}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[15].lives}
      />
      <Segment
        number={17}
        color="white"
        hitNumber={hitNumber}
        liveCount={lives && lives[16].lives}
      />
      <Segment
        number={18}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[17].lives}
      />
      <Segment
        number={19}
        color="white "
        hitNumber={hitNumber}
        liveCount={lives && lives[18].lives}
      />
      <Segment
        number={20}
        color="black"
        hitNumber={hitNumber}
        liveCount={lives && lives[19].lives}
      />
      <Bull hitNumber={hitNumber} />
    </div>
  );
}

export default Board;
