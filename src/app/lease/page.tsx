"use client"

import ActionButtons from "../components/lease/ActionButtons"
import Header from "../components/Header"
import Footer from "../components/Footer"
import GenerateLeaseForm from "../components/lease/GenerateLeaseForm"

export default function LeasePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <GenerateLeaseForm />
        <ActionButtons />
      </div>
      <Footer />
    </div>
  )
}