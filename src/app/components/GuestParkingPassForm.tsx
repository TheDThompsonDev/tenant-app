"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import LABELS from "@/app/constants/labels";
import { useStore } from "@tanstack/react-form";
import { getCurrentUser } from "@/lib/appwrite";
import {
  Car,
  Calendar,
  Clock,
  CheckCircle,
  CreditCard,
  User,
  Home,
  Copy,
  Shield,
  Clock3,
} from "lucide-react";

type GuestParkingFormValues = {
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  parkingPassNumber: string;
  expirationDate: Date;
  lastName: string;
  apartmentNumber: string;
  user?: string;
};

export default function GuestParkingPassForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formError, setFormError] = useState<{
    field?: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const get24HoursFromNow = () =>
    new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString("en-US");

  const expireDate = get24HoursFromNow();

  const formRef = useRef(
    useTanstackForm<GuestParkingFormValues>({
      defaultValues: {
        make: "",
        model: "",
        color: "",
        licensePlate: "",
        parkingPassNumber: "",
        lastName: "",
        apartmentNumber: "",
        expirationDate: new Date(expireDate),
      },
      onSubmit: async (values) => {
        setFormError(null);

        try {
          const res = await saveOnDB({ ...values });

          if (!res.ok) {
            const errorData = await res.json();

            if (res.status === 404) {
              setFormError({
                field: "general",
                message:
                  "User not found. Please check Tenant Last Name and Resident Apartment Number.",
              });
            } else if (res.status === 400) {
              setFormError({ field: "general", message: errorData.error });
            } else {
              setFormError({
                field: "general",
                message: "An unexpected error occurred. Please try again.",
              });
            }

            return { status: "error" };
          }

          setIsSubmitted(true);
          return { status: "success" };
        } catch (error) {
          setFormError({
            field: "general",
            message: "Network error. Please try again later.",
          });
          return { status: "error" };
        }
      },
    })
  );

  const generateParkingPassNumber = async () => {
    const number = Math.floor(Math.random() * 1000000);
    return number.toString();
  };

  const saveOnDB = async (values: GuestParkingFormValues) => {
    return await fetch("/api/parking", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(form.state.values.parkingPassNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const form = formRef.current;
  const make = useStore(form.store, (state) => state.values.make);
  const model = useStore(form.store, (state) => state.values.model);
  const color = useStore(form.store, (state) => state.values.color);
  const licensePlate = useStore(
    form.store,
    (state) => state.values.licensePlate
  );
  const lastName = useStore(form.store, (state) => state.values.lastName);
  const apartmentNumber = useStore(
    form.store,
    (state) => state.values.apartmentNumber
  );

  if (isSubmitted) {
    const passNumber = form.state.values.parkingPassNumber;

    return (
      <main className="min-h-screen flex justify-center p-4 bg-gradient-to-b from-gray-50 to-white text-black">
        <section
          className={`w-full max-w-md mt-10 space-y-6 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <header className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-secondary-blue/10 p-3 rounded-full">
                <Car size={28} className="text-secondary-blue" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary-black mb-2">
              {LABELS.GuestParkingPassForm.parkingPassId}
            </h1>
            <p className="text-gray-600">
              {LABELS.GuestParkingPassForm.successMessage}
            </p>
          </header>

          <div className="bg-white rounded-xl shadow-xl text-black border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-blue via-primary-green to-secondary-blue"></div>
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-primary-green/5 rounded-full"></div>
            <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-secondary-blue/5 rounded-full"></div>

            <div className="flex justify-center pt-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 shadow-sm">
                <CheckCircle size={16} className="mr-2" />
                <span className="text-sm font-medium">
                  {LABELS.GuestParkingPassForm.validityMessage}
                </span>
              </div>
            </div>

            <div className="p-6 pt-4">
              <div className="mb-8 pb-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold mb-3 text-primary-black text-center">
                  {form.state.values.lastName}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  {LABELS.GuestParkingPassForm.created}
                </p>
                <div className="flex justify-center space-x-6">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2 text-primary-green" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-2 text-secondary-blue" />
                    <span>{LABELS.GuestParkingPassForm.hoursAccess}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Car size={18} className="mr-2 text-secondary-blue" />
                  <h3 className="text-xl font-bold text-secondary-blue">
                    {form.state.values.make}, {form.state.values.model} -{" "}
                    {form.state.values.licensePlate}
                  </h3>
                </div>

                <div className="text-center mb-6">
                  <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <p className="text-3xl font-bold text-primary-black">
                      {passNumber}
                    </p>
                  </div>

                  <div className="flex items-center justify-center text-gray-600 text-sm">
                    <Clock size={16} className="mr-2 text-green-500" />
                    <span>
                      {LABELS.GuestParkingPassForm.expires} {expireDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-300 hover:shadow-md group"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={18} className="mr-2 text-green-600" />
                      <span>{LABELS.GuestParkingPassForm.copiedMessage}</span>
                    </>
                  ) : (
                    <>
                      <Copy
                        size={18}
                        className="mr-2 group-hover:text-primary-green transition-colors"
                      />
                      <span>{LABELS.GuestParkingPassForm.copyCodeButton}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center px-5 py-3 bg-secondary-blue hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                >
                  <CreditCard size={18} className="mr-2" />
                  <span>{LABELS.GuestParkingPassForm.savePassButton}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400 flex items-center justify-center">
            <Shield size={12} className="mr-1" />
            <span>{LABELS.GuestParkingPassForm.secureAccessMessage}</span>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center p-4 bg-gradient-to-b from-gray-50 to-white text-black">
      <section className="w-full max-w-md mt-10 space-y-6">
        <header className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-secondary-blue/10 p-3 rounded-full">
              <Car size={28} className="text-secondary-blue" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary-black mb-2">
            {LABELS.GuestParkingPassForm.title}
          </h1>
          <p className="text-gray-600">
            {LABELS.GuestParkingPassForm.formDescription}
          </p>
        </header>

        <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-blue via-primary-green to-secondary-blue"></div>

          {formError?.field === "general" && (
            <p className="text-red-500 text-sm text-center">
              {formError.message}
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateParkingPassNumber().then((number) => {
                form.setFieldValue("parkingPassNumber", number);
                void form.handleSubmit();
              });
            }}
          >
            <fieldset className="space-y-4">
              <legend className="sr-only">
                {LABELS.GuestParkingPassForm.title}
              </legend>

              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  {LABELS.GuestParkingPassForm.lastName}
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    placeholder={
                      LABELS.GuestParkingPassForm.placeholders.lastName
                    }
                    value={lastName}
                    onChange={(e) =>
                      form.setFieldValue("lastName", e.target.value)
                    }
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 
                              bg-white text-black 
                              focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="apartmentNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  {LABELS.GuestParkingPassForm.apartmentNumber}
                </label>
                <div className="relative">
                  <input
                    id="apartmentNumber"
                    type="text"
                    placeholder={
                      LABELS.GuestParkingPassForm.placeholders.apartmentNumber
                    }
                    value={apartmentNumber}
                    onChange={(e) =>
                      form.setFieldValue("apartmentNumber", e.target.value)
                    }
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 
                              bg-white text-black 
                              focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="make"
                  className="block text-sm font-medium text-gray-700"
                >
                  {LABELS.GuestParkingPassForm.vehicleMake}
                </label>
                <div className="relative">
                  <input
                    id="make"
                    type="text"
                    placeholder={LABELS.GuestParkingPassForm.placeholders.make}
                    value={make}
                    onChange={(e) => form.setFieldValue("make", e.target.value)}
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 
                              bg-white text-black 
                              focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Car size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700"
                >
                  {LABELS.GuestParkingPassForm.vehicleModel}
                </label>
                <input
                  id="model"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.placeholders.model}
                  value={model}
                  onChange={(e) => form.setFieldValue("model", e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 
                            bg-white text-black
                            focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  {LABELS.GuestParkingPassForm.vehicleColor}
                </label>
                <input
                  id="color"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.placeholders.color}
                  value={color}
                  onChange={(e) => form.setFieldValue("color", e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 
                            bg-white text-black
                            focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="licensePlate"
                  className="block text-sm font-medium text-gray-700"
                >
                  {LABELS.GuestParkingPassForm.licensePlate}
                </label>
                <input
                  id="licensePlate"
                  type="text"
                  placeholder={
                    LABELS.GuestParkingPassForm.placeholders.licensePlate
                  }
                  value={licensePlate}
                  onChange={(e) =>
                    form.setFieldValue("licensePlate", e.target.value)
                  }
                  className="w-full p-3 rounded-md border border-gray-300 
                            bg-white text-black
                            focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary-green text-white font-medium 
                            py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300
                            flex items-center justify-center hover:shadow-md"
                >
                  <Calendar className="mr-2" size={18} />
                  {LABELS.GuestParkingPassForm.submitButton}
                </button>
              </div>

              <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                <Clock3 size={14} className="mr-1 text-secondary-blue" />
                <p>{LABELS.GuestParkingPassForm.validityFooter}</p>
              </div>
            </fieldset>
          </form>
        </article>
      </section>
    </main>
  );
}
