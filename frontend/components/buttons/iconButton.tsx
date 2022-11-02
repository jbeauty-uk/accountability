export enum ButtonType {
  PRIMARY,
  SECONDARY,
  DANGER,
}

type Props = {
  icon: JSX.Element;
  onClick: () => void;
};

const IconButton = ({ icon, onClick }: Props) => (
  <div onClick={onClick}>{icon}</div>
);

export default IconButton;
