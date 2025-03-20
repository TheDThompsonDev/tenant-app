'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LeaseForm() {

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-black">Generate Lease Agreement</h1>

            {submitMessage && (
                <div className={`p-4 mb-6 rounded-md ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {submitMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b-2 pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-3 text-black ">Property and Lease Details</h2>
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
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 rounded-md text-white font-medium ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? 'Processing...' : 'Generate Lease Agreement'}
                    </button>
                </div>
            </form>
        </div>
    )
}