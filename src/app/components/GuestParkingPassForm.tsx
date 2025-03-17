"use client";

import React, { useState, useRef } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import LABELS from "@/app/constants/labels";
import { useStore } from "@tanstack/react-form";
import { getCurrentUser } from "@/lib/appwrite";

type GuestParkingFormValues = {
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  parkingPassNumber: string;
  expirationDate: Date;
  user?: string;
};

export default function GuestParkingPassForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        expirationDate: new Date(expireDate),
      },
      onSubmit: async (values) => {
        const user = await getCurrentUser();
        if (user?.data?.$id) {
          await saveOnDB({ ...values, user: user.data.$id });
          setIsSubmitted(true);
        } else {
          console.error("User data is undefined");
        }
        return { status: "success" };
      },
    })
  );

  const generateParkingPassNumber = async () => {
    const number = Math.floor(Math.random() * 1000000);
    return number.toString();
  };

  const saveOnDB = async (values: GuestParkingFormValues) => {
    const response = await fetch("/api/parking", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const form = formRef.current;
  const make = useStore(form.store, (state) => state.values.make);
  const model = useStore(form.store, (state) => state.values.model);
  const color = useStore(form.store, (state) => state.values.color);
  const licensePlate = useStore(
    form.store,
    (state) => state.values.licensePlate
  );

  // const apartmentNumber = useStore(
  //   form.store,
  //   (state) => state.values.apartmentNumber
  // );

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex justify-center p-4 bg-white text-black">
        <section className="w-full max-w-md mt-24 space-y-6">
          <header>
            <h1 className="text-2xl font-bold text-center">
              {LABELS.GuestParkingPassForm.parkingPassId}
            </h1>
          </header>
          <article className="bg-secondary-blue p-6 rounded-md shadow-md text-white text-center">
            <p className="mb-2">{LABELS.GuestParkingPassForm.created}</p>
            <p className="font-bold mb-2">
              {form.state.values.make}, {form.state.values.model} -{" "}
              {form.state.values.licensePlate}
            </p>
            <p>{form.state.values.parkingPassNumber}</p>
            <p>
              {LABELS.GuestParkingPassForm.expires} {expireDate}
            </p>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center p-4 bg-white text-black">
      <section className="w-full max-w-md mt-24 space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-center">
            {LABELS.GuestParkingPassForm.title}
          </h1>
        </header>

        <article className="bg-gray-100 p-6 rounded-md shadow-md">
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
              <div>
                <label htmlFor="make" className="sr-only">
                  {LABELS.GuestParkingPassForm.vehicleMake}
                </label>
                <input
                  id="make"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.vehicleMake}
                  value={make}
                  onChange={(e) => form.setFieldValue("make", e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 
                             bg-white text-black 
                             focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                />
              </div>
              <div>
                <label htmlFor="model" className="sr-only">
                  {LABELS.GuestParkingPassForm.vehicleModel}
                </label>
                <input
                  id="model"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.vehicleModel}
                  value={model}
                  onChange={(e) => form.setFieldValue("model", e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 
                             bg-white text-black
                             focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                />
              </div>
              <div>
                <label htmlFor="color" className="sr-only">
                  {LABELS.GuestParkingPassForm.vehicleColor}
                </label>
                <input
                  id="color"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.vehicleColor}
                  value={color}
                  onChange={(e) => form.setFieldValue("color", e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 
                             bg-white text-black
                             focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                />
              </div>
              <div>
                <label htmlFor="licensePlate" className="sr-only">
                  {LABELS.GuestParkingPassForm.licensePlate}
                </label>
                <input
                  id="licensePlate"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.licensePlate}
                  value={licensePlate}
                  onChange={(e) =>
                    form.setFieldValue("licensePlate", e.target.value)
                  }
                  className="w-full p-2 rounded border border-gray-300 
                             bg-white text-black
                             focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                />
              </div>
              <div>
                <label htmlFor="apartmentNumber" className="sr-only">
                  {LABELS.GuestParkingPassForm.apartmentNumber}
                </label>
                {/* <input
                  id="apartmentNumber"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.apartmentNumber}
                  value={apartmentNumber}
                  onChange={(e) =>
                    form.setFieldValue("apartmentNumber", e.target.value)
                  }
                  className="w-full p-2 rounded border border-gray-300 
                             bg-white text-black
                             focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                /> */}
              </div>
              <button
                type="submit"
                className="w-full bg-secondary-blue text-white font-semibold 
                           py-2 px-4 rounded hover:bg-secondary-blue/80 transition-colors"
              >
                {LABELS.GuestParkingPassForm.submitButton}
              </button>
            </fieldset>
          </form>
        </article>
      </section>
    </main>
  );
}
