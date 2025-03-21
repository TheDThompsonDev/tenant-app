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

export default function GenerateLeaseForm() {
  const form = useForm({
    defaultValues: {
      firstName: "Tenants first name",
      lastName: "Tenants last name",
      phone: "Tenants phone",
      securityDeposit: "Security Deposit",
      apartmentNumber: "Tenants new apartment number",
      leaseStartDate: "Lease Start Date",
      leaseEndDate: "Lease End Date",
      monthlyRent: "Monthly Rent",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  return (
    <div className="w-full">
      <div className="flex flex-col max-w-4xl m-auto shadow-lg p-4 rounded-xl">
        <h2 className="text-2xl font-semibold text-black text-center mb-6">
          {LABELS.generateLease.title}
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
                    ? `${LABELS.generateLease.validateMessages.firstNameRequired}`
                    : value.length < 3
                    ? `${LABELS.generateLease.validateMessages.firstNameLength}`
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    `${LABELS.generateLease.validateMessages.firstNameNoError}`
                  );
                },
              }}
              children={(field) => {
                return (
                  <div className="w-full">
                    <label htmlFor={field.name} className="p-1">
                      {LABELS.generateLease.firstNameTitle}
                    </label>
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
                    ? `${LABELS.generateLease.validateMessages.lastNameRequired}`
                    : value.length < 3
                    ? `${LABELS.generateLease.validateMessages.lastNameLength}`
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    `${LABELS.generateLease.validateMessages.lastNameNoError}`
                  );
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.lastNameTitle}
                  </label>
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
              name="phone"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? LABELS.generateLease.validateMessages.phoneRequired
                    : value
                        .split("")
                        .filter((char) => !isNaN(Number(char)) || char === "+")
                        .join("").length < 10 ||
                      value
                        .split("")
                        .filter((char) => !isNaN(Number(char)) || char === "+")
                        .join("").length > 10
                    ? LABELS.generateLease.validateMessages.phoneFormat
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    `${LABELS.generateLease.validateMessages.phoneNoError}`
                  );
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.phoneTitle}
                  </label>
                  <input
                    type="tel"
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
              name="securityDeposit"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? `${LABELS.generateLease.validateMessages.securityDepositRequired}`
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    `${LABELS.generateLease.validateMessages.securityDepositNoError}`
                  );
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.securityDepositTitle}
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={100}
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
              name="apartmentNumber"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? `${LABELS.generateLease.validateMessages.apartmentNumRequired}`
                    : value.length < 2
                    ? `${LABELS.generateLease.validateMessages.apartmentNumLength}`
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    `${LABELS.generateLease.validateMessages.apartmentNumberNoError}`
                  );
                },
              }}
            >
              {(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.apartmentTitle}
                  </label>
                  <input
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onFocus={() => {
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
            </form.Field>
          </div>

          <div className="w-full py-2">
            <form.Field
              name="leaseStartDate"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? `${LABELS.generateLease.validateMessages.leaseStartRequired}`
                    : undefined,
              }}
            >
              {(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.leaseStartTitle}
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onFocus={() => {
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
            </form.Field>
          </div>

          <div className="w-full py-2">
            <form.Field
              name="leaseEndDate"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? `${LABELS.generateLease.validateMessages.leaseEndDateRequired}`
                    : undefined,
              }}
            >
              {(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.leaseEndTitle}
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onFocus={() => {
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
            </form.Field>
          </div>

          <div className="w-full py-2">
            <form.Field
              name="monthlyRent"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? `${LABELS.generateLease.validateMessages.monthlyRentRequired}`
                    : undefined,
              }}
            >
              {(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.monthlyRentTitle}
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={100}
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onFocus={() => {
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
            </form.Field>
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
                  : `${LABELS.generateLease.submitTitle}`}
              </button>
            )}
          />
        </form>
      </div>
    </div>
  );
}
