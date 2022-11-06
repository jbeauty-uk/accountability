import Button from "../buttons/button";

type Props = {
  buttonLabel: string;
  children: JSX.Element;
};

const Form = ({ buttonLabel, children }: Props) => (
  <form className="grid grid-col-1 gap-6">
    {children}
    <Button label={buttonLabel} onClick={() => {}} />
  </form>
);

export default Form;
