"use client";

import React, { useState, useRef } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import LABELS from "@/app/constants/labels";
import { useStore } from "@tanstack/react-form";
import { getCurrentUser } from "@/lib/appwrite";
import { Car, Calendar, Clock, CheckCircle, CreditCard } from "lucide-react";

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

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex justify-center p-4 bg-gray-50 text-black">
        <section className="w-full max-w-md mt-10 space-y-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-secondary-blue mb-2">
              {LABELS.GuestParkingPassForm.parkingPassId}
            </h1>
            <p className="text-gray-600">{LABELS.GuestParkingPassForm.successMessage}</p>
          </header>
          
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary-blue to-primary-green"></div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-secondary-blue p-6 text-white">
                <h2 className="text-xl font-bold text-center">{LABELS.GuestParkingPassForm.passHeaderTitle}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-1">{LABELS.GuestParkingPassForm.created}</p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Car className="text-secondary-blue" size={20} />
                    <p className="font-bold text-lg text-gray-800">
                      {form.state.values.make}, {form.state.values.model} - {form.state.values.licensePlate}
                    </p>
                  </div>
                  <div className="bg-gray-100 py-3 px-4 rounded-md mb-4">
                    <p className="text-2xl font-mono font-bold text-secondary-blue">{form.state.values.parkingPassNumber}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-700">
                    <Clock className="text-primary-green" size={18} />
                    <p>
                      <span className="font-medium">{LABELS.GuestParkingPassForm.expires}</span> {expireDate}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center justify-center space-x-2 text-primary-green">
                    <CheckCircle size={20} />
                    <p className="font-medium">{LABELS.GuestParkingPassForm.validityMessage}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200 inline-block">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <p className="text-xs text-gray-500">{LABELS.GuestParkingPassForm.qrPlaceholder}</p>
                </div>
                <p className="text-xs text-center mt-2 text-gray-600">{LABELS.GuestParkingPassForm.qrScanMessage}</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => window.print()} 
                className="bg-primary-green hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors inline-flex items-center"
              >
                <CreditCard className="mr-2" size={18} />
                {LABELS.GuestParkingPassForm.savePassButton}
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center p-4 bg-gray-50 text-black">
      <section className="w-full max-w-md mt-10 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-secondary-blue mb-2">
            {LABELS.GuestParkingPassForm.title}
          </h1>
          <p className="text-gray-600">{LABELS.GuestParkingPassForm.formDescription}</p>
        </header>

        <article className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-secondary-blue bg-opacity-10 rounded-full flex items-center justify-center">
              <Car size={32} className="text-secondary-blue" />
            </div>
          </div>
          
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
                <label htmlFor="make" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                  {LABELS.GuestParkingPassForm.licensePlate}
                </label>
                <input
                  id="licensePlate"
                  type="text"
                  placeholder={LABELS.GuestParkingPassForm.placeholders.licensePlate}
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
                  className="w-full bg-secondary-blue text-white font-medium 
                            py-3 px-4 rounded-md hover:bg-blue-800 transition-colors
                            flex items-center justify-center"
                >
                  <Calendar className="mr-2" size={18} />
                  {LABELS.GuestParkingPassForm.submitButton}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                {LABELS.GuestParkingPassForm.validityFooter}
              </p>
            </fieldset>
          </form>
        </article>
      </section>
    </main>
  );
}
