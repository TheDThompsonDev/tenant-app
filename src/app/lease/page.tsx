"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import GenerateLeaseForm from "../components/lease/GenerateLeaseForm"
import LeaseView from "../components/lease/LeaseView"
import { FileText, PlusCircle, Loader2 } from "lucide-react"
import { getCurrentUser } from "@/lib/appwrite"
import { Models } from "appwrite"

type UserType = Models.User<Models.Preferences>;

export default function LeasePage() {
  const [activeTab, setActiveTab] = useState<'view' | 'generate'>('view')
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data as UserType);
        } else {
          console.error("Failed to get user:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAdmin = user?.name === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Lease Management</h1>
          <p className="text-gray-600 mt-2">View and manage your lease agreements {isAdmin && 'or generate a new one'}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            {isAdmin ? (
              <>
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('view')}
                    className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'view' 
                      ? 'text-primary-green border-b-2 border-primary-green bg-primary-green/5' 
                      : 'text-gray-600 hover:text-primary-green hover:bg-gray-50'}`}
                  >
                    <FileText size={18} className="mr-2" />
                    View Leases
                  </button>
                  <button
                    onClick={() => setActiveTab('generate')}
                    className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'generate' 
                      ? 'text-primary-green border-b-2 border-primary-green bg-primary-green/5' 
                      : 'text-gray-600 hover:text-primary-green hover:bg-gray-50'}`}
                  >
                    <PlusCircle size={18} className="mr-2" />
                    Generate New Lease
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'view' ? (
                    <LeaseView isAdmin={true} />
                  ) : (
                    <div className="max-w-4xl mx-auto">
                      <GenerateLeaseForm />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6">
                <LeaseView isAdmin={false} />
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}