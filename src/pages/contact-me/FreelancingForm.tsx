import { useForm, type SubmitHandler } from "react-hook-form";
import {
  ErrorMessage,
  Field,
  FormWrapper,
  Label,
  Input,
  SubmitButton,
  RadioLabel,
  RadioInput,
} from "./ContactForm";
import type { ReactElement } from "react";

interface Inputs {
  companyName: string;
  fullName: string;
  email: string;
  description: string;
  deadline: string;
  radio: string;
}

export default function Form(): ReactElement {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      companyName: "",
      fullName: "",
      email: "",
      description: "",
      radio: "",
    },
  });

  const formName = "freelancing-form";

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const URLData = Object.entries({ "form-name": formName, ...data });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(URLData).toString(),
    })
      // .then(() => navigate("/thank-you/"))
      .catch((error) => alert(error));
  };

  watch("radio");

  const requiredMessage = "This field is required";

  return (
    <FormWrapper formName={formName} handleSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Label htmlFor="companyName" text="Company name" />
        <Input
          placeholder="Provide your company name"
          registerObject={register("companyName", { required: true })}
        />
        {errors.companyName != null && (
          <ErrorMessage message={requiredMessage} />
        )}
      </Field>

      <Field>
        <Label htmlFor="fullName" text="Full name" />
        <Input
          placeholder="Provide your full name"
          registerObject={register("fullName", { required: true })}
        />
        {errors.fullName != null && <ErrorMessage message={requiredMessage} />}
      </Field>
      <Field>
        <Label htmlFor="email" text="Email" />
        <Input
          placeholder="Provide your name"
          registerObject={register("email", {
            required: requiredMessage,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />

        {errors.email?.message != null && (
          <ErrorMessage message={errors.email.message} />
        )}
      </Field>
      <Field>
        <Label htmlFor="description" text="Describe your website idea" />
        <textarea
          placeholder="Provide invormation about the business, website goal, the customer, and overall idea"
          className="text-sm md:text-base  h-52 p-4 border-2 rounded-xl border-secondary-50 "
          {...register("description", {
            required: requiredMessage,
            minLength: {
              value: 80,
              message: "Please provide description with at least 80 characters",
            },
          })}
        />
        {errors.description?.message != null && (
          <ErrorMessage message={errors.description.message} />
        )}
      </Field>
      <Field>
        <fieldset>
          <legend className="text-lg md:text-2xl pb-4">
            When you expect website to be ready
          </legend>
          <div className="flex flex-wrap gap-2">
            <div>
              <RadioInput
                registerObject={register("radio", { required: true })}
                id="twoWeeks"
              />
              <RadioLabel htmlFor="twoWeeks" text="Two weeks" />
            </div>
            <div>
              <RadioInput
                registerObject={register("radio", { required: true })}
                id="month"
              />
              <RadioLabel htmlFor="month" text="Month" />
            </div>
            <div>
              <RadioInput
                registerObject={register("radio", { required: true })}
                id="threeMonths"
              />
              <RadioLabel htmlFor="threeMonths" text="Three months" />
            </div>
            <div>
              <RadioInput
                registerObject={register("radio", { required: true })}
                id="noRush"
              />
              <RadioLabel htmlFor="noRush" text="No rush" />
            </div>
          </div>
          {errors.radio?.message != null && (
            <ErrorMessage message={requiredMessage} />
          )}
        </fieldset>
      </Field>
      <SubmitButton />
    </FormWrapper>
  );
}
