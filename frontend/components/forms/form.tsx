type Props = {
  children: JSX.Element;
};

const Form = ({ children }: Props) => (
  <form className="grid grid-col-1 gap-6">{children}</form>
);

export default Form;
