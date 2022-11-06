type Props = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: Props) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
