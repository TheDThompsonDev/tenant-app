"use client";

import LABELS from "../../constants/labels";
import { useForm } from "@tanstack/react-form";
import { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  User,
  Home,
  Mail,
  DollarSign,
  Clock,
  FileText,
} from "lucide-react";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="text-sm mt-1 min-h-[20px] transition-all duration-300 ease-in-out">
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

interface FormFieldProps {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
}

function FormField({
  field,
  label,
  placeholder,
  icon,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
        <input
          className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all duration-200 ease-in-out shadow-sm"
          id={field.name}
          name={field.name}
          placeholder={placeholder}
          type={type}
          value={field.state.value}
          onFocus={() => {
            if (!field.state.meta.isTouched) {
              field.handleChange("");
            }
          }}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <FieldInfo field={field} />
    </div>
  );
}

export default function GenerateLeaseForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      tenantEmail: "",
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
      setIsSubmitting(true);
      setSubmitMessage("Generating lease and sending for signature...");

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
      };

      const saveOnDB = async (leaseData: {
        firstName: string;
        lastName: string;
        tenantEmail: string;
        securityDeposit: string;
        apartmentNumber: string;
        leaseStartDate: string;
        leaseEndDate: string;
        monthlyRent: string;
        landlordEmail: string;
      }) => {
        const response = await fetch("/api/admin/lease", {
          method: "POST",
          body: JSON.stringify(leaseData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Failed to save lease data");
        }
        console.log("Lease data saved to DB:", data);
      };

      try {
        const response = await fetch("/api/generate-and-send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaseData),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to generate lease");
        }

        if (data.success) {
          saveOnDB({
            firstName: value.firstName,
            lastName: value.lastName,
            tenantEmail: value.tenantEmail,
            securityDeposit: value.securityDeposit,
            apartmentNumber: value.apartmentNumber,
            leaseStartDate: value.leaseStartDate,
            leaseEndDate: value.leaseEndDate,
            monthlyRent: value.monthlyRent,
            landlordEmail: value.landlordEmail,
          });
        }

        setSubmitMessage("Lease successfully generated and sent!");
        setTimeout(() => {
          router.push(
            `/confirmation?id=${data.documentId}&email=${encodeURIComponent(
              leaseData.tenantEmail
            )}&name=${encodeURIComponent(leaseData.tenantName)}`
          );
        }, 300);
      } catch (error) {
        console.error("Error:", error);
        setSubmitMessage(
          `Error: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col max-w-4xl m-auto p-0 rounded-xl overflow-hidden bg-white shadow-lg">
        <div className="bg-gradient-to-r from-primary-green to-secondary-blue p-6 text-white">
          <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
            <FileText size={24} />
            {LABELS.generateLease.title}
          </h2>
          <p className="text-center mt-2 opacity-90">
            Fill out the form below to generate a new lease agreement
          </p>
        </div>

        {submitMessage && (
          <div
            className={`p-4 mx-6 mt-4 rounded-md shadow-md ${
              submitMessage.includes("Error")
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form
          className="flex flex-col justify-items items-center w-full p-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="w-full mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <User size={18} className="text-primary-green" />
              Tenant Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormField
                    field={field}
                    label={LABELS.generateLease.firstNameTitle}
                    placeholder="Tenant's first name"
                    icon={<User size={16} />}
                  />
                )}
              </form.Field>

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
                  <FormField
                    field={field}
                    label={LABELS.generateLease.lastNameTitle}
                    placeholder="Tenant's last name"
                    icon={<User size={16} />}
                  />
                )}
              </form.Field>

              <form.Field
                name="tenantEmail"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${LABELS.generateLease.validateMessages.tenantEmailRequired}`
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? `${LABELS.generateLease.validateMessages.tenantEmailInvalid}`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={LABELS.generateLease.emailTitle || "Email"}
                    placeholder="Tenant's email address"
                    icon={<Mail size={16} />}
                    type="email"
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="w-full mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <Home size={18} className="text-primary-green" />
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="apartmentNumber"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .apartmentNumRequired ||
                          "Apartment number is required"
                        }`
                      : value.length < 2
                      ? `${
                          LABELS.generateLease.validateMessages
                            .apartmentNumLength ||
                          "Apartment number must be at least 2 characters"
                        }`
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      `${
                        LABELS.generateLease.validateMessages
                          .apartmentNumberNoError ||
                        "Apartment number cannot contain 'error'"
                      }`
                    );
                  },
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.apartmentTitle || "Apartment Number"
                    }
                    placeholder="Apartment number"
                    icon={<Home size={16} />}
                  />
                )}
              </form.Field>

              <form.Field
                name="monthlyRent"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .monthlyRentRequired || "Monthly rent is required"
                        }`
                      : isNaN(Number(value))
                      ? `${
                          LABELS.generateLease.validateMessages
                            .monthlyRentFormat ||
                          "Monthly rent must be a number"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.monthlyRentTitle || "Monthly Rent"
                    }
                    placeholder="Monthly rent amount"
                    icon={<DollarSign size={16} />}
                    type="number"
                  />
                )}
              </form.Field>

              <form.Field
                name="securityDeposit"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .securityDepositRequired ||
                          "Security deposit is required"
                        }`
                      : isNaN(Number(value))
                      ? `${
                          LABELS.generateLease.validateMessages
                            .securityDepositNoError ||
                          "Security deposit must be a number"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.securityDepositTitle ||
                      "Security Deposit"
                    }
                    placeholder="Security deposit amount"
                    icon={<DollarSign size={16} />}
                    type="number"
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="w-full mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <CalendarIcon size={18} className="text-primary-green" />
              Lease Period
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="leaseStartDate"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .leaseStartRequired ||
                          "Lease start date is required"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.leaseStartTitle || "Lease Start Date"
                    }
                    placeholder="Lease start date"
                    icon={<CalendarIcon size={16} />}
                    type="date"
                  />
                )}
              </form.Field>

              <form.Field
                name="leaseEndDate"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .leaseEndDateRequired ||
                          "Lease end date is required"
                        }`
                      : new Date(value) <=
                        new Date(form.getFieldValue("leaseStartDate"))
                      ? `${
                          LABELS.generateLease.validateMessages
                            .leaseEndDateInvalid ||
                          "Lease end date must be after start date"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.leaseEndTitle || "Lease End Date"
                    }
                    placeholder="Lease end date"
                    icon={<CalendarIcon size={16} />}
                    type="date"
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="w-full mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <User size={18} className="text-primary-green" />
              Landlord Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="landlordFirstName"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .landlordFirstNameRequired ||
                          "Landlord first name is required"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.landlordFirstNameTitle ||
                      "Landlord First Name"
                    }
                    placeholder="Landlord's first name"
                    icon={<User size={16} />}
                  />
                )}
              </form.Field>

              <form.Field
                name="landlordLastName"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .landlordLastNameRequired ||
                          "Landlord last name is required"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.landlordLastNameTitle ||
                      "Landlord Last Name"
                    }
                    placeholder="Landlord's last name"
                    icon={<User size={16} />}
                  />
                )}
              </form.Field>

              <form.Field
                name="landlordEmail"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? `${
                          LABELS.generateLease.validateMessages
                            .landlordEmailRequired ||
                          "Landlord email is required"
                        }`
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? `${
                          LABELS.generateLease.validateMessages
                            .landlordEmailInvalid || "Landlord email is invalid"
                        }`
                      : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label={
                      LABELS.generateLease.landlordEmailTitle ||
                      "Landlord Email"
                    }
                    placeholder="Landlord's email address"
                    icon={<Mail size={16} />}
                    type="email"
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="w-full mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-green hover:bg-primary-green/90 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-200 ease-in-out flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Clock className="animate-spin" size={20} />
                  {LABELS.createTenant.sumbit?.loading || "Processing..."}
                </>
              ) : (
                LABELS.generateLease.submitTitle || "Generate Lease"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
