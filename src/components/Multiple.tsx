import "./Multiple.css";

interface MultipleProps {
  styleName: string;
  color: string;
}

function Multiple(props: MultipleProps) {
  const { styleName, color } = props;
  return <div className={`multiple ${styleName} m${color}`}></div>;
}

export default Multiple;
