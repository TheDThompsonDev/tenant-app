'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/appwrite'
import { Models } from "appwrite"

export default function LeaseForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
    const [loading, setLoading] = useState(true)

    const [formData, setFormData] = useState({
        landlordName: '',
        landlordEmail: '',
        tenantName: '',
        tenantEmail: '',
        propertyAddress: '',
        leaseStartDate: '',
        leaseEndDate: '',
        monthlyRent: '',
    })

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getCurrentUser()
                if (response.success && response.data) {
                    setUser(response.data)
                } else {
                    console.error('Failed to get user:', response.error)
                }
            } catch (error) {
                console.error('Error fetching user:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('Generating PDF and sending to Documenso...')

        try {
            const response = await fetch('/api/generate-and-send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.error || 'Failed to generate and send PDF')
            }

            setSubmitMessage('Success! Lease agreement sent to tenant for signing.')

            if (data.redirectUrl) {
                router.push(data.redirectUrl);
            } else {
                const documentId = data.documentId || (data.documensoData && data.documensoData.id)
                router.push(`/confirmation?id=${documentId}&email=${encodeURIComponent(formData.tenantEmail)}&name=${encodeURIComponent(formData.tenantName)}`)
            }
        } catch (error) {
            console.error('Error:', error)
            setSubmitMessage(`Error: ${error.message}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-black">Lease Agreement</h1>
    
            {user?.name.toLowerCase() === "admin" ? (
                // Admin Section: Lease Generation Form
                <>
                    {submitMessage && (
                        <div className={`p-4 mb-6 rounded-md ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {submitMessage}
                        </div>
                    )}
    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Landlord Information */}
                        <div className="border-b-2 pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-3 text-black">Landlord Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Landlord Name
                                    </label>
                                    <input
                                        type="text"
                                        id="landlordName"
                                        name="landlordName"
                                        value={formData.landlordName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="landlordEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                        Landlord Email
                                    </label>
                                    <input
                                        type="email"
                                        id="landlordEmail"
                                        name="landlordEmail"
                                        value={formData.landlordEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
    
                        {/* Tenant Information */}
                        <div className="border-b-2 pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-3 text-black">Tenant Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tenant Name
                                    </label>
                                    <input
                                        type="text"
                                        id="tenantName"
                                        name="tenantName"
                                        value={formData.tenantName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tenantEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tenant Email
                                    </label>
                                    <input
                                        type="email"
                                        id="tenantEmail"
                                        name="tenantEmail"
                                        value={formData.tenantEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
    
                        {/* Lease Details */}
                        <div className="border-b-2 pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-3 text-black">Property and Lease Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                        Property Address
                                    </label>
                                    <textarea
                                        id="propertyAddress"
                                        name="propertyAddress"
                                        value={formData.propertyAddress}
                                        onChange={handleChange}
                                        required
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
    
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="leaseStartDate" className="block text-sm font-medium text-black mb-1">
                                            Lease Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="leaseStartDate"
                                            name="leaseStartDate"
                                            value={formData.leaseStartDate}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="leaseEndDate" className="block text-sm font-medium text-black mb-1">
                                            Lease End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="leaseEndDate"
                                            name="leaseEndDate"
                                            value={formData.leaseEndDate}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="monthlyRent" className="block text-sm font-medium text-black mb-1">
                                            Monthly Rent ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="monthlyRent"
                                            name="monthlyRent"
                                            value={formData.monthlyRent}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <button type="submit" className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Generate Lease Agreement
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-center p-6 bg-gray-100 rounded-md">
                    <p className="text-lg text-gray-600">Your lease agreement will appear here once it has been generated.</p>
                </div>
            )}
        </div>
    )
    
}