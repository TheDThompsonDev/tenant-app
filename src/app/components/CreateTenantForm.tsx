import LABELS from "../constants/labels";
import { useForm } from "@tanstack/react-form";
import { AnyFieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="text-sm mt-1 ml-2 min-h-[20px] transition-all duration-300 ease-in-out">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-red-500 font-semibold rounded-md">
          {field.state.meta.errors.join(", ")}
        </span>
      ) : (
        <span className="invisible">
          {LABELS.createTenant.fieldInfo.noErrorTitle}
        </span>
      )}
    </p>
  );
}

export default function CreateTenantForm() {
  const form = useForm({
    defaultValues: {
      firstName: `${LABELS.createTenant.placeholders.firstName}`,
      lastName: `${LABELS.createTenant.placeholders.lastName}`,
      email: `${LABELS.createTenant.placeholders.email}`,
      apartmentNum: `${LABELS.createTenant.placeholders.apartmentNumber}`,
    },

    onSubmit: async ({ value }) => {
      {
        /*TODO: send form data to server endpoiunt */
      }
      console.log(value);
    },
  });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-black text-center mb-6">
        {LABELS.createTenant.title}
      </h2>

      <form
        className="flex flex-col justify-items items-center w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="w-full">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? `${LABELS.createTenant.validateMessages.firstNameRequired}`
                  : value.length < 3
                  ? `${LABELS.createTenant.validateMessages.firstNameLength}`
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  `${LABELS.createTenant.validateMessages.firstNameNoError}`
                );
              },
            }}
            children={(field) => {
              return (
                <div className="w-full">
                  <label htmlFor={field.name} />
                  <input
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onFocus={(e) => {
                      if (!field.state.meta.isTouched) {
                        field.handleChange("");
                      }
                    }}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        <div className="w-full py-2">
          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? `${LABELS.createTenant.validateMessages.lastNameRequired}`
                  : value.length < 3
                  ? `${LABELS.createTenant.validateMessages.lastNameLength}`
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  `${LABELS.createTenant.validateMessages.lastNameNoError}`
                );
              },
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} />
                <input
                  className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onFocus={(e) => {
                    if (!field.state.meta.isTouched) {
                      field.handleChange("");
                    }
                  }}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div className="w-full">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? `${LABELS.createTenant.validateMessages.emailRequired}`
                  : !value.includes("@")
                  ? `${LABELS.createTenant.validateMessages.emailFormat}`
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  `${LABELS.createTenant.validateMessages.emailNoError}`
                );
              },
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} />
                <input
                  className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onFocus={(e) => {
                    if (!field.state.meta.isTouched) {
                      field.handleChange("");
                    }
                  }}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="w-full py-2">
          <form.Field
            name="apartmentNum"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? `${LABELS.createTenant.validateMessages.apartmentNumRequired}`
                  : value.length < 2
                  ? `${LABELS.createTenant.validateMessages.apartmentNumLength}`
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  `${LABELS.createTenant.validateMessages.apartmentNumberNoError}`
                );
              },
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name} />
                <input
                  className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onFocus={(e) => {
                    if (!field.state.meta.isTouched) {
                      field.handleChange("");
                    }
                  }}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              className="hover:translate-0.5 hover:cursor-pointer bg-secondary-blue text-white p-2 rounded-md disabled:opacity-40 w-full my-2"
              disabled={!canSubmit}
            >
              {isSubmitting
                ? `${LABELS.createTenant.sumbit.loading}`
                : `${LABELS.createTenant.sumbit.title}`}
            </button>
          )}
        />
      </form>
    </div>
  );
}
