"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import LABELS from "@/app/constants/labels";
import { useRouter } from "next/navigation";
import { getCurrentUser, updateUserProfile } from "@/lib/appwrite";
import { Models } from "appwrite";

type UserType = Models.User<Models.Preferences>;

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="h-4 text-alternate-light-gray text-sm font-thin ml-2">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

interface EditProfileFormProps {
  displayChangePassword: () => void;
}

export default function EditProfileForm({
  displayChangePassword,
}: EditProfileFormProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      passwordCheck: "",
    },
    onSubmit: async ({ value }) => {
      const { name, email, passwordCheck } = value;
      const success = await updateUserProfile(name, email, passwordCheck);
      if (success) {
        const response = await updateDB(name, email);
        if (response.ok) {
          router.push("/dashboard");
        } else {
          setError(new Error("Failed to update user profile"));
        }
      }
      router.push("/dashboard");
    },
  });

  const updateDB = async (name: string, email: string) => {
    const response = await fetch(`/api/users/${user?.$id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
    return response;
  };

  const handleChangePasswordClick = () => {
    displayChangePassword();
  };

  const handleCancelClick = () => {
    router.back();
  };

  const labelClasses = "text-white text-xl";
  const inputClasses =
    "w-full p-3 bg-[#0F3645] text-white rounded-md focus:outline-none";
  const btnClasses =
    "w-full bg-primary-green text-white text-sm lg:text-lg p-3 rounded-md";

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const { data: user } = await getCurrentUser();
        setUser(user ?? null);
        form.reset({
          name: user?.name ?? "",
          email: user?.email ?? "",
          passwordCheck: "",
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [form]);

  if (isLoading) {
    return <div className="flex flex-row justify-center">Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="w-full relative bottom-40 px-6 lg:static">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="space-y-4 max-w-[400px] mx-auto"
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value ? "A name is required" : undefined,
            onChangeAsyncDebounceMs: 100,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return value.includes("error") && 'No "error" allowed in name';
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className={labelClasses}>
                {LABELS.editProfile.formLabels.name}
              </label>
              <input
                className={inputClasses}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
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
              if (value !== user?.email) {
                setIsEmailChanged(true);
              } else {
                setIsEmailChanged(false);
              }
              return value.includes("error") && 'No "error" allowed in email';
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className={labelClasses}>
                {LABELS.editProfile.formLabels.email}
              </label>
              <input
                className={inputClasses}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {isEmailChanged && (
          <form.Field
            name="passwordCheck"
            validators={{
              onChange: ({ value }) =>
                !value ? "Your password is required" : null,
              onChangeAsyncDebounceMs: 100,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return (
                  value.includes("error") &&
                  'No "error" allowed in password check'
                );
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col items-center gap-2">
                <label htmlFor={field.name} className="text-white text-md">
                  {LABELS.editProfile.formLabels.passwordCheck}
                </label>
                <input
                  className={inputClasses}
                  id={field.name}
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        )}

        <div className="flex flex-col">
          <button
            type="button"
            className={btnClasses}
            onClick={handleChangePasswordClick}
          >
            {LABELS.editProfile.formBtns.changePasswordBtn}
          </button>
          <div className="flex flex-row gap-4 lg:gap-12 pt-8">
            <button
              type="button"
              className={btnClasses}
              onClick={handleCancelClick}
            >
              {LABELS.editProfile.formBtns.cancelBtn}
            </button>
            <button type="submit" className={btnClasses}>
              {LABELS.editProfile.formBtns.saveBtn}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
