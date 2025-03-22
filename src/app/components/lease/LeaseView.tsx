"use client";

import { useState } from 'react';
import { FileText, Download, Upload, Check, Clock } from 'lucide-react';

type LeaseDocument = {
  id: string;
  title: string;
  date: string;
  status: 'active' | 'expired' | 'pending';
  downloadUrl?: string;
};

// Mock data for demonstration
const mockLeases: LeaseDocument[] = [
  {
    id: 'lease-2025-001',
    title: 'Residential Lease Agreement',
    date: '2025-01-15',
    status: 'active',
    downloadUrl: '#',
  },
  {
    id: 'lease-2024-002',
    title: 'Previous Lease Agreement',
    date: '2024-01-15',
    status: 'expired',
    downloadUrl: '#',
  },
  {
    id: 'lease-2025-003',
    title: 'Lease Renewal',
    date: '2025-03-10',
    status: 'pending',
  },
];

interface LeaseViewProps {
  isAdmin?: boolean;
}

export default function LeaseView({ isAdmin = false }: LeaseViewProps) {
  const [leases] = useState<LeaseDocument[]>(mockLeases);
  const [selectedLease, setSelectedLease] = useState<LeaseDocument | null>(isAdmin ? null : mockLeases[0]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
            <Check size={14} className="mr-1" />
            Active
          </span>
        );
      case 'expired':
        return (
          <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={14} className="mr-1" />
            Expired
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={14} className="mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const handleLeaseSelect = (lease: LeaseDocument) => {
    setSelectedLease(lease);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // For non-admin users, show a simplified view with just their active lease
  if (!isAdmin) {
    const activeLease = mockLeases.find(lease => lease.status === 'active') || mockLeases[0];
    
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-green to-secondary-blue p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <FileText className="mr-3" size={24} />
            Your Lease Agreement
          </h2>
          <p className="mt-2 opacity-90">View and download your current lease</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{activeLease.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Issued on {formatDate(activeLease.date)}</p>
            </div>
            {getStatusBadge(activeLease.status)}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 border border-gray-300 mb-6">
              <FileText size={64} className="text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-700 mb-2">Lease Document</h4>
              <p className="text-gray-500 text-center mb-6">Your official lease agreement for the property</p>
            </div>

            {activeLease.status === 'pending' ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-700 w-full max-w-md text-center">
                <Clock size={18} className="inline-block mr-2" />
                This lease is pending signature. You&apos;ll be notified when it&apos;s ready.
              </div>
            ) : (
              <button 
                disabled={!activeLease.downloadUrl}
                className="flex items-center gap-2 bg-secondary-blue text-white px-6 py-3 rounded-md hover:bg-secondary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Download size={20} />
                Download Lease Agreement
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin view with full functionality
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="mr-3" size={24} />
          Lease Documents
        </h2>
        <p className="mt-2 opacity-90">View and manage your lease agreements</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border-r border-gray-200 pr-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Leases</h3>
            <div className="space-y-3">
              {leases.map((lease) => (
                <div
                  key={lease.id}
                  onClick={() => handleLeaseSelect(lease)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${selectedLease?.id === lease.id
                    ? 'bg-primary-green/10 border-l-4 border-primary-green'
                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{lease.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(lease.date)}</p>
                    </div>
                    {getStatusBadge(lease.status)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 bg-primary-green text-white px-4 py-3 rounded-lg hover:bg-primary-green/90 transition-colors">
                <Upload size={18} />
                Upload New Lease
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedLease ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedLease.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Issued on {formatDate(selectedLease.date)}</p>
                  </div>
                  {getStatusBadge(selectedLease.status)}
                </div>

                <div className="flex-grow bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                  <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 border border-gray-300">
                    <FileText size={64} className="text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center mb-6">Preview not available</p>
                    {selectedLease.status === 'pending' ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-700 w-full text-center">
                        This lease is pending signature
                      </div>
                    ) : (
                      <button 
                        disabled={!selectedLease.downloadUrl}
                        className="flex items-center gap-2 bg-secondary-blue text-white px-4 py-2 rounded-md hover:bg-secondary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <Download size={18} />
                        Download PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-8">
                <div className="text-center">
                  <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No lease selected</h3>
                  <p className="text-gray-500 max-w-md">Select a lease from the list to view its details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
