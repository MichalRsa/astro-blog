import type { ReactElement, ReactNode } from "react";

export const FormWrapper = ({
  handleSubmit,
  children,
  formName,
}: {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  formName: string;
}): ReactElement => (
  <div className="lg:w-2/4 mx-auto">
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      className="rounded-3xl bg-ternary-50 shadow-secondary-200 shadow-xl p-3 md:p-8 flex flex-col"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={formName} />
      {children}
    </form>
  </div>
);
export const Field = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="relative flex flex-col w-full pb-10">{children}</div>;
};

export const ErrorMessage = ({
  message,
}: {
  message: string;
}): ReactElement => (
  <p className="absolute bottom-3 left-0 text-danger-500 text-base md:text-lg">
    {message}
  </p>
);
export const Input = ({
  registerObject,
  placeholder,
}: {
  registerObject: any;
  placeholder?: string;
}): ReactElement => {
  return (
    <input
      className="text-sm md:text-base rounded-xl p-4 border-2 border-secondary-50"
      {...registerObject}
      placeholder={placeholder}
    />
  );
};

export const RadioInput = ({
  registerObject,
  id,
}: {
  registerObject: any;
  id: string;
}): ReactElement => {
  return (
    <input
      {...registerObject}
      type="radio"
      id={id}
      value={id}
      className="hidden peer"
    />
  );
};

export const Label = ({
  htmlFor,
  text,
}: {
  htmlFor: string;
  text: string;
}): ReactElement => {
  return (
    <label className="text-lg md:text-2xl pb-4" htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export const RadioLabel = ({
  htmlFor,
  text,
}: {
  htmlFor: string;
  text: string;
}): ReactElement => {
  return (
    <label
      className="hover:bg-secondary-50 cursor-pointer block peer-checked:bg-secondary-500 peer-checked:text-ternary-200 peer-checked:border-none rounded-xl font-roboto border-2 py-2 px-3 border-secondary-50"
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
};

export const SubmitButton = (): ReactElement => (
  <input
    className="!bg-primary-500 hover:!bg-primary-600 rounded-xl text-xl md:text-3xl w-fit py-2 px-8 mt-2 cursor-pointer"
    type="submit"
    value="Submit"
  />
);
