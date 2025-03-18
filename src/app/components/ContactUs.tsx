"use client";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import LABELS from "../constants/labels";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="text-red-400 text-sm font-thin ml-2">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </p>
  );
}

export default function ContactUs() {
  const form = useForm({
    defaultValues: {
      fullName: "Full Name",
      phoneNumber: "Phone",
      email: "Email",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      createContactUsForm(value);
      form.reset();
    },
  });

  const createContactUsForm = async (value: unknown) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  return (
    <section
      id="contact"
      className="flex flex-col justify-center items-center bg-white text-black p-6 font-bold "
    >
      <section className="max-w-lg flex flex-col items-center">
        <h2 className="text-3xl p-4 mt-8">{LABELS.contactUs.title}</h2>
        <p className="p-4 text-center text-md">
          {LABELS.contactUs.description}
        </p>

        <form
          className="flex flex-col justify-items items-center p-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A name is required"
                  : value.length < 3
                  ? "Name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 100,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
          >
            {(field) => {
              return (
                <div className="w-full py-1">
                  <label htmlFor={field.name} />
                  <input
                    className="rounded-md py-2 px-3 placeholder-black my-2 w-full font-bold focus:placeholder-transparent border border-secondary-dark-gray"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onFocus={(e) => {
                      if (!field.state.meta.isTouched) {
                        field.handleChange("");
                      }
                    }}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="phoneNumber"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A phone number is required"
                  : value.replace(/\D/g, "").length !== 10
                  ? "Phone number must be 10 digits"
                  : undefined,
              onChangeAsyncDebounceMs: 100,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return value.includes("error") && 'No "error" allowed in phone';
              },
            }}
          >
            {(field) => {
              return (
                <div className="w-full py-1">
                  <label htmlFor={field.name} />
                  <input
                    className="border border-secondary-dark-gray rounded-md py-2 px-3 placeholder-black my-2 w-full font-bold focus:placeholder-transparent"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onFocus={(e) => {
                      if (!field.state.meta.isTouched) {
                        field.handleChange("");
                      }
                    }}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "An email is required"
                  : !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
                  ? "Invalid email format"
                  : undefined,
              onChangeAsyncDebounceMs: 100,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return value.includes("error") && 'No "error" allowed in email';
              },
            }}
          >
            {(field) => {
              return (
                <div className="w-full py-1">
                  <label htmlFor={field.name} />
                  <input
                    className="border border-secondary-dark-gray rounded-md py-2 px-3 placeholder-black my-2 w-full font-bold focus:placeholder-transparent"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onFocus={(e) => {
                      if (!field.state.meta.isTouched) {
                        field.handleChange("");
                      }
                    }}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                className="hover:translate-0.5 hover:cursor-pointer bg-secondary-blue text-white p-2 rounded-md disabled:opacity-40 w-full my-2"
                disabled={!canSubmit}
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          </form.Subscribe>
        </form>
      </section>
    </section>
  );
}
