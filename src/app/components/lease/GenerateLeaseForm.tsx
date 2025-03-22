"use client"

import LABELS from "../../constants/labels";
import { useForm } from "@tanstack/react-form";
import { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react"
import { useRouter } from "next/navigation"

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="text-sm mt-1 ml-2 min-h-[20px] transition-all duration-300 ease-in-out">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-red-500 font-semibold rounded-md">
          {field.state.meta.errors.join(", ")}
        </span>
      ) : (
        <span className="invisible">{LABELS.generateLease.noErrorTitle}</span>
      )}
    </p>
  );
}

export default function GenerateLeaseForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      tenantEmail: "",
      phone: "",
      securityDeposit: "",
      apartmentNumber: "",
      leaseStartDate: "",
      leaseEndDate: "",
      monthlyRent: "",
      landlordFirstName: "",
      landlordLastName: "",
      landlordEmail: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      setSubmitMessage("Generating lease and sending for signature...")

      const leaseData = {
        tenantName: `${value.firstName} ${value.lastName}`,
        tenantEmail: value.tenantEmail,
        landlordName: `${value.landlordFirstName} ${value.landlordLastName}`,
        landlordEmail: value.landlordEmail,
        propertyAddress: `Apartment ${value.apartmentNumber}`,
        leaseStartDate: value.leaseStartDate,
        leaseEndDate: value.leaseEndDate,
        monthlyRent: value.monthlyRent,
        securityDeposit: value.securityDeposit,
      }

      try {
        const response = await fetch("/api/generate-and-send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaseData),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || "Failed to generate lease")
        }

        setSubmitMessage("Lease successfully generated and sent!")
setTimeout(() => {
  router.push(
    `/confirmation?id=${data.documentId}&email=${encodeURIComponent(leaseData.tenantEmail)}&name=${encodeURIComponent(leaseData.tenantName)}`
  )
}, 300)
      } catch (error) {
        console.error("Error:", error)
        setSubmitMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`)
      } finally {
        setIsSubmitting(false);
      }
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col max-w-4xl m-auto shadow-lg p-4 rounded-xl">
        <h2 className="text-2xl font-semibold text-black text-center mb-6">
          {LABELS.generateLease.title}
        </h2>

        {submitMessage && (
          <div
            className={`p-4 mb-6 rounded-md ${
              submitMessage.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {submitMessage}
          </div>
        )}

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
            >
              {(field) => (
                <div className="w-full">
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.firstNameTitle}
                  </label>
                  <input
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    placeholder="Tenant's first name"
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
                </div>
              )}
            </form.Field>
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
            >
              {(field) => (
                <>
                  <label htmlFor={field.name} className="p-1">
                    {LABELS.generateLease.lastNameTitle}
                  </label>
                  <input
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500 focus:outline-nonee"
                    id={field.name}
                    name={field.name}
                    placeholder="Tenant's last name"
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
            <form.Field name="tenantEmail">
              {(field) => (
                <>
                  <label htmlFor="tenantEmail" className="p-1">
                    {LABELS.generateLease.tenantEmail}
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500"
                    id="tenantEmail"
                    name="tenantEmail"
                    placeholder="Tenant's email address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>

          <div className="w-full py-2">
            <form.Field name="landlordFirstName">
              {(field) => (
                <>
                  <label htmlFor="landlordFirstName" className="p-1">
                    {LABELS.generateLease.landlordFirstName}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500"
                    id="landlordFirstName"
                    name="landlordFirstName"
                    placeholder="Landlord's first name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>

          <div className="w-full py-2">
            <form.Field name="landlordLastName">
              {(field) => (
                <>
                  <label htmlFor="landlordLastName" className="p-1">
                    {LABELS.generateLease.landlordLastName}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500"
                    id="landlordLastName"
                    name="landlordLastName"
                    placeholder="Landlord's last name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>

          <div className="w-full py-2">
            <form.Field name="landlordEmail">
              {(field) => (
                <>
                  <label htmlFor="landlordEmail" className="p-1">
                    {LABELS.generateLease.landlordEmail}
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500"
                    id="landlordEmail"
                    name="landlordEmail"
                    placeholder="Landlord's email address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
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
                    placeholder="Apartment number"
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
                    placeholder="Monthly rent amount"
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
            <form.Field name="securityDeposit">
              {(field) => (
                <>
                  <label htmlFor="securityDeposit" className="p-1">
                    {LABELS.generateLease.securityDepositTitle || "Security Deposit"}
                  </label>
                  <input
                    type="number"
                    min={500}
                    step={100}
                    className="w-full p-3 bg-gray-200 rounded-md text-gray-500"
                    id="securityDeposit"
                    name="securityDeposit"
                    placeholder="Security deposit amount"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                className="hover:translate-0.5 hover:cursor-pointer bg-secondary-blue text-white p-2 rounded-md disabled:opacity-40 w-full my-2"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting 
                  ? `${LABELS.createTenant.sumbit.loading}`
                  : `${LABELS.generateLease.submitTitle}`}
              </button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
