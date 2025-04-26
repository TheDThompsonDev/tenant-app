'use client';

import { useState, useEffect } from 'react';
import { FileText, Check, Clock } from 'lucide-react';
import LABELS from '../../constants/labels';
import { getCurrentUser } from '@/lib/appwrite';

type LeaseDocument = {
  id: string;
  title: string;
  date: string;
  leaseStatus: 'ACTIVE' | 'EXPIRED' | 'PENDING';
};

interface LeaseSummary {
  id: string;
  title: string;
  leaseStatus: string;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  securityDeposit: string;
  paymentDueDate: string;
  lateFee: string;
  createdAt: string;
}

interface LeaseViewProps {
  isAdmin?: boolean;
}

const fetchLease = async () => {
  const response = await fetch('/api/lease/summary?all=true');
  const data = await response.json();
  return data;
};

const defaultLeaseSummary: LeaseSummary = {
  id: 'lease-mock-001',
  title: 'Residential Lease Agreement',
  leaseStatus: 'PENDING',
  startDate: 'January 1, 2025',
  endDate: 'December 31, 2025',
  monthlyRent: '$1,200.00',
  securityDeposit: '$1,200.00',
  paymentDueDate: '1st of each month',
  lateFee: '$50 after the 5th of each month',
  createdAt: new Date().toISOString(),
};

const fetchLeaseSummary = async (
  apartmentNumber: string
): Promise<LeaseSummary> => {
  try {
    const response = await fetch(
      `/api/lease/summary?apartmentNumber=${apartmentNumber}`
    );

    if (!response.ok) {
      console.log('Error fetching lease summary:', response.statusText);
      return defaultLeaseSummary;
    }

    const data = await response.json();
    return data.data || defaultLeaseSummary;
  } catch (error) {
    console.log('Error fetching lease summary:', error);
    return defaultLeaseSummary;
  }
};

export default function LeaseView({ isAdmin = false }: LeaseViewProps) {
  const [leases, setLeases] = useState<LeaseDocument[]>([]);
  const [selectedLease, setSelectedLease] = useState<LeaseDocument | null>(
    null
  );
  const [leaseSummary, setLeaseSummary] = useState<LeaseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apartmentNumber, setApartmentNumber] = useState<string>('');

  useEffect(() => {
    const fetchUserApartment = async () => {
      try {
        const userResponse = await getCurrentUser();

        if (userResponse.success && userResponse.data) {
          const userId = userResponse.data.$id;

          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const userDetails = await response.json();
            if (userDetails) {
              const apt = userDetails.apartmentNumber || '';
              setApartmentNumber(apt);
              return apt;
            }
          }
        }
        return '';
      } catch (error) {
        console.error('Error fetching user apartment:', error);
        return '';
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        if (isAdmin) {
          const data = await fetchLease();
          const transformedData = transformLeaseData(data);
          setLeases(transformedData);
          if (transformedData.length > 0) {
            setSelectedLease(transformedData[0]);
          }
        } else {
          const apt = await fetchUserApartment();
          try {
            const summary = await fetchLeaseSummary(apt);
            setLeaseSummary(summary);

            if (summary) {
              const simpleLease: LeaseDocument = {
                id: summary.id,
                title: summary.title,
                date: summary.createdAt,
                leaseStatus: summary.leaseStatus as
                  | 'ACTIVE'
                  | 'EXPIRED'
                  | 'PENDING',
              };

              setLeases([simpleLease]);
              setSelectedLease(simpleLease);
            }
          } catch (error) {
            console.error('Error fetching lease summary:', error);
            setError(LABELS.leaseManagement.updateError);
          }
        }
      } catch (error) {
        console.error('Error fetching lease data:', error);
        setError(LABELS.leaseManagement.updateError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  useEffect(() => {
    console.log('Lease summary state updated:', leaseSummary);
  }, [leaseSummary]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className='flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium'>
            <Check size={14} className='mr-1' />
            {LABELS.leaseManagement.activeStatus}
          </span>
        );
      case 'EXPIRED':
        return (
          <span className='flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium'>
            <Clock size={14} className='mr-1' />
            {LABELS.leaseManagement.expiredStatus}
          </span>
        );
      case 'PENDING':
        return (
          <span className='flex items-center text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium'>
            <Clock size={14} className='mr-1' />
            {LABELS.leaseManagement.pendingStatus}
          </span>
        );
      default:
        return null;
    }
  };

  const handleLeaseSelect = (lease: LeaseDocument) => {
    setSelectedLease(lease);
  };

  const transformLeaseData = (
    data: {
      id: string;
      firstName: string;
      lastName: string;
      apartmentNumber: string;
      createdAt: string;
      leaseStatus: 'ACTIVE' | 'EXPIRED' | 'PENDING';
    }[]
  ): LeaseDocument[] => {
    return data.map((item) => ({
      id: item.id,
      title: `${item.firstName} ${item.lastName} ${item.apartmentNumber}`,
      date: item.createdAt,
      leaseStatus: item.leaseStatus,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const updateLeaseStatus = async (id: string, newStatus: string) => {
    try {
      setIsUpdating(true);
      const response = await fetch('/api/lease/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, leaseStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error(LABELS.leaseManagement.updateError);
      }

      console.log('Lease status updated successfully to:', newStatus);

      const updatedLeases = leases.map((lease) =>
        lease.id === id
          ? {
              ...lease,
              leaseStatus: newStatus as 'ACTIVE' | 'EXPIRED' | 'PENDING',
            }
          : lease
      );

      setLeases(updatedLeases);

      if (selectedLease && selectedLease.id === id) {
        setSelectedLease({
          ...selectedLease,
          leaseStatus: newStatus as 'ACTIVE' | 'EXPIRED' | 'PENDING',
        });
      }

      if (apartmentNumber) {
        const updatedSummary = await fetchLeaseSummary(apartmentNumber);
        console.log(
          'Updated lease summary after status change:',
          updatedSummary
        );
        setLeaseSummary(updatedSummary);
      }
    } catch (error) {
      console.error('Error updating lease status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-8 text-center'>
        <div className='animate-pulse flex flex-col items-center'>
          <div className='h-12 w-12 bg-gray-200 rounded-full mb-4'></div>
          <div className='h-6 w-48 bg-gray-200 rounded mb-4'></div>
          <div className='h-4 w-64 bg-gray-200 rounded'></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    const activeLease = leases[0];

    if (!activeLease || !leaseSummary) {
      return <div>Loading lease information...</div>;
    }

    return (
      <div className='w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='bg-gradient-to-r from-primary-green to-secondary-blue p-6 text-white'>
          <h2 className='text-2xl font-bold flex items-center'>
            <FileText className='mr-3' size={24} />
            {LABELS.leaseManagement.yourLeaseAgreement}
          </h2>
          <p className='mt-2 opacity-90'>
            {LABELS.leaseManagement.viewAndManageLease}
          </p>
        </div>

        <div className='p-8'>
          <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                {activeLease.title}
              </h3>
              <p className='text-sm text-gray-500 mt-1'>
                {LABELS.leaseManagement.issuedOn} {formatDate(activeLease.date)}
              </p>
            </div>
            {getStatusBadge(activeLease.leaseStatus)}
          </div>

          <div className='bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center mb-8'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 border border-gray-300 mb-6'>
              <FileText size={64} className='text-gray-400 mb-4' />
              <h4 className='text-lg font-medium text-gray-700 mb-2'>
                {LABELS.leaseManagement.leaseSummary}
              </h4>

              <div className='w-full space-y-4 mt-4'>
                <div className='border-b border-gray-200 pb-3'>
                  <h5 className='text-sm font-medium text-gray-500'>
                    {LABELS.leaseManagement.leaseTerm}
                  </h5>
                  <p className='text-gray-800'>
                    {leaseSummary.startDate} - {leaseSummary.endDate}
                  </p>
                </div>

                <div className='border-b border-gray-200 pb-3'>
                  <h5 className='text-sm font-medium text-gray-500'>
                    {LABELS.leaseManagement.monthlyRent}
                  </h5>
                  <p className='text-gray-800'>{leaseSummary.monthlyRent}</p>
                </div>

                <div className='border-b border-gray-200 pb-3'>
                  <h5 className='text-sm font-medium text-gray-500'>
                    {LABELS.leaseManagement.securityDeposit}
                  </h5>
                  <p className='text-gray-800'>
                    {leaseSummary.securityDeposit}
                  </p>
                </div>

                <div className='border-b border-gray-200 pb-3'>
                  <h5 className='text-sm font-medium text-gray-500'>
                    {LABELS.leaseManagement.paymentDueDate}
                  </h5>
                  <p className='text-gray-800'>{leaseSummary.paymentDueDate}</p>
                </div>

                <div className='border-b border-gray-200 pb-3'>
                  <h5 className='text-sm font-medium text-gray-500'>
                    {LABELS.leaseManagement.lateFee}
                  </h5>
                  <p className='text-gray-800'>{leaseSummary.lateFee}</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full max-w-md'>
              {leaseSummary.leaseStatus === 'PENDING' ? (
                <div className='bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-700 w-full text-center'>
                  <Clock size={18} className='inline-block mr-2' />
                  {LABELS.leaseManagement.leasePending}
                </div>
              ) : (
                <div className='bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-700 w-full text-center'>
                  <Clock size={18} className='inline-block mr-2' />
                  {LABELS.leaseManagement.leaseExpires} {leaseSummary.endDate}
                  <p className='mt-2 text-xs text-blue-600'>
                    {LABELS.leaseManagement.signedLeaseMessage}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='w-full'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              {LABELS.leaseManagement.leaseFAQ}
            </h3>

            <div className='space-y-4'>
              <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                <h4 className='font-medium text-gray-800 mb-2'>
                  {LABELS.leaseManagement.howToRequestMaintenance}
                </h4>
                <p className='text-gray-600'>
                  {LABELS.leaseManagement.requestMaintenanceInstructions}
                </p>
              </div>

              <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                <h4 className='font-medium text-gray-800 mb-2'>
                  {LABELS.leaseManagement.whatHappensWhenLeaseExpires}
                </h4>
                <p className='text-gray-600'>
                  {LABELS.leaseManagement.leaseExpirationInstructions}
                </p>
              </div>

              <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                <h4 className='font-medium text-gray-800 mb-2'>
                  {LABELS.leaseManagement.canAddRoommate}
                </h4>
                <p className='text-gray-600'>
                  {LABELS.leaseManagement.addRoommateInstructions}
                </p>
              </div>

              <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                <h4 className='font-medium text-gray-800 mb-2'>
                  {LABELS.leaseManagement.howToPayRent}
                </h4>
                <p className='text-gray-600'>
                  {LABELS.leaseManagement.payRentInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
      <div className='bg-gradient-to-r from-primary-green to-secondary-blue p-6 text-white'>
        <h2 className='text-2xl font-bold flex items-center'>
          <FileText className='mr-3' size={24} />
          {LABELS.leaseManagement.leaseDocuments}
        </h2>
        <p className='mt-2 opacity-90'>
          {LABELS.leaseManagement.viewAndManageLeaseAgreements}
        </p>
      </div>

      <div className='p-6'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : error ? (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
            {error}
          </div>
        ) : leases.length === 0 ? (
          <div className='h-full flex items-center justify-center bg-gray-50 rounded-lg p-8'>
            <div className='text-center'>
              <FileText size={48} className='text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-700 mb-2'>
                {LABELS.leaseManagement.noLeases}
              </h3>
              <p className='text-gray-500 max-w-md'>
                {LABELS.leaseManagement.selectLeasePrompt}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col md:flex-row gap-6 min-h-[600px]'>
            <div className='md:w-1/3 relative'>
              <h3 className='text-lg text-black font-semibold mb-3'>
                {LABELS.leaseManagement.yourLeases}
              </h3>
              <div className='space-y-2 overflow-auto pb-20'>
                {leases.map((lease) => (
                  <div
                    key={lease.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedLease?.id === lease.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => handleLeaseSelect(lease)}
                  >
                    <div className='flex justify-between items-start'>
                      <div>
                        <h4 className='font-medium text-gray-800'>
                          {lease.title}
                        </h4>
                        <p className='text-xs text-gray-500 mt-1'>
                          {formatDate(lease.date)}
                        </p>
                      </div>
                      <div className='flex items-center'>
                        {getStatusBadge(lease.leaseStatus)}
                        {isAdmin && (
                          <div className='ml-2'>
                            <label className='relative inline-flex items-center cursor-pointer'>
                              <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={lease.leaseStatus === 'ACTIVE'}
                                onChange={() => {
                                  const newStatus =
                                    lease.leaseStatus === 'ACTIVE'
                                      ? 'PENDING'
                                      : 'ACTIVE';
                                  updateLeaseStatus(lease.id, newStatus);
                                }}
                                disabled={isUpdating}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              <span className='ml-2 text-xs font-medium text-gray-700'>
                                {lease.leaseStatus === 'ACTIVE'
                                  ? 'Active'
                                  : 'Pending'}
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isAdmin && (
                <div className='absolute bottom-0 left-0 right-0 pt-4 pb-2 px-4 border-t border-gray-200 bg-white'>
                  <a
                    href='/generateLease'
                    className='flex items-center justify-center gap-2 bg-primary-green text-white px-4 py-3 rounded-lg hover:bg-primary-green/90 transition-colors'
                  >
                    <FileText size={18} />
                    {LABELS.leaseManagement.generateNewLease}
                  </a>
                </div>
              )}
            </div>

            <div className='md:w-2/3'>
              {selectedLease ? (
                <div>
                  <div className='mb-4'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                      {selectedLease.title}
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                      {LABELS.leaseManagement.issuedOn}{' '}
                      {formatDate(selectedLease.date)}
                    </p>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-8 flex items-center justify-center'>
                    <div className='w-full max-w-md aspect-[3/4] bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 border border-gray-300'>
                      <FileText size={64} className='text-gray-400 mb-4' />
                      <p className='text-gray-500 text-center mb-6'>
                        {LABELS.leaseManagement.leaseDocumentDetails}
                      </p>
                      {selectedLease.leaseStatus === 'PENDING' ? (
                        <div className='bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-700 w-full text-center'>
                          {LABELS.leaseManagement.leasePending}
                        </div>
                      ) : (
                        <a
                          href='/generateLease'
                          className='flex items-center gap-2 bg-secondary-blue text-white px-4 py-2 rounded-md hover:bg-secondary-blue/90 transition-colors'
                        >
                          <FileText size={18} />
                          {LABELS.leaseManagement.viewDetails}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='h-full flex items-center justify-center bg-gray-50 rounded-lg p-8'>
                  <div className='text-center'>
                    <FileText
                      size={48}
                      className='text-gray-300 mx-auto mb-4'
                    />
                    <h3 className='text-lg font-medium text-gray-700 mb-2'>
                      {LABELS.leaseManagement.noLeaseSelected}
                    </h3>
                    <p className='text-gray-500 max-w-md'>
                      {LABELS.leaseManagement.selectLeaseToViewDetails}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
