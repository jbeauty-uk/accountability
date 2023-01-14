import React, { ChangeEvent, useState } from "react";
import Button from "../buttons/button";

enum ButtonState {
  READY,
  LOADING,
}

type Props = {
  buttonLabel: string;
  onSubmit: () => Promise<any> | any;
  children: JSX.Element;
};

const Form = ({ buttonLabel, onSubmit, children }: Props) => {
  const [buttonState, setButtonState] = useState(ButtonState.READY);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonState(ButtonState.LOADING);
    await onSubmit();
    setButtonState(ButtonState.READY);
  };

  return (
    <form className="grid grid-col-1 gap-6" onSubmit={(e) => handleSubmit(e)}>
      {children}
      <Button
        label={buttonLabel}
        onClick={() => {}}
        loading={buttonState === ButtonState.LOADING}
      />
    </form>
  );
};

export default Form;
