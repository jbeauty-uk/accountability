import React, { useState } from "react";
import Button, { ButtonType } from "../buttons/button";

enum ButtonState {
  READY,
  LOADING,
}

type Props = {
  className?: string;
  buttonLabel: string;
  secondaryButtonLabel?: string;
  onSubmit: () => Promise<any> | any;
  onSecondaryAction?: () => Promise<any> | any;
  children: JSX.Element;
};

const Form = ({
  className,
  buttonLabel,
  secondaryButtonLabel,
  onSubmit,
  onSecondaryAction,
  children,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <form
      className={`grid grid-col-1 gap-6 ${className}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      {children}
      {secondaryButtonLabel && onSecondaryAction ? (
        <div className="grid grid-cols-2 gap-4">
          <Button
            label={secondaryButtonLabel}
            onClick={onSecondaryAction}
            buttonType={ButtonType.SECONDARY}
          />
          <Button label={buttonLabel} loading={isLoading} submit={true} />
        </div>
      ) : (
        <Button label={buttonLabel} loading={isLoading} />
      )}
    </form>
  );
};

export default Form;
