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
import { navigate } from "astro/virtual-modules/transitions-router.js";

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

  const formName = "developer-form";

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const URLData = Object.entries({ "form-name": formName, ...data });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(URLData).toString(),
    })
      .then(() => {
        void navigate("/thank-you/");
      })
      .catch(() => {
        void navigate("/oops/");
      });
  };

  watch("radio");

  const requiredMessage = "This field is required";

  return (
    <FormWrapper
      formName="developer-form"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleSubmit={handleSubmit(onSubmit)}
    >
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
        <Label htmlFor="description" text="Describe the position" />
        <textarea
          placeholder="Provide information about the role, recruitment process, project, company culture, etc."
          className="text-sm md:text-base  h-52 p-4 border-2 rounded-xl border-secondary-50"
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
            When I should start
          </legend>
          <div className="flex flex-wrap gap-2">
            <div>
              <RadioInput
                registerObject={register("radio", { required: true })}
                id="asap"
              />
              <RadioLabel htmlFor="asap" text="As soon as possible" />
            </div>
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
