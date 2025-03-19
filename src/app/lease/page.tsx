"use client"

import LeaseView from "../components/lease/LeaseView"
import ActionButtons from "../components/lease/ActionButtons"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LeasePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Lease Management</h2>
        <LeaseView />
        <ActionButtons />
      </div>
      <Footer />
    </div>
  )
}