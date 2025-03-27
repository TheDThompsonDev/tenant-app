"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LABELS from "../../constants/labels";

interface Lease {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  apartmentNumber: string | null;
  leaseStart: string | null;
  leaseEnd: string | null;
  monthlyRent: string | null;
  securityDeposit: string | null;
  leaseStatus: string;
  createdAt: string;
}

export default function AdminLeases() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchLeases();
  }, []);

  const fetchLeases = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/lease/summary?all=true");
      if (!response.ok) {
        throw new Error(LABELS.leaseManagement.updateError);
      }
      const data = await response.json();
      setLeases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : LABELS.leaseManagement.updateError);
    } finally {
      setLoading(false);
    }
  };

  const updateLeaseStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/lease/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, leaseStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error(LABELS.leaseManagement.updateError);
      }

      fetchLeases();
    } catch (err) {
      setError(err instanceof Error ? err.message : LABELS.leaseManagement.updateError);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return LABELS.leaseManagement.notSpecified;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">{LABELS.leaseManagement.title}</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">{LABELS.leaseManagement.title}</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{LABELS.leaseManagement.updateError}: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{LABELS.leaseManagement.title}</h1>
        <button
          onClick={() => router.push("/generateLease")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {LABELS.leaseManagement.generateNewLease}
        </button>
      </div>

      {leases.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p>{LABELS.leaseManagement.noLeases}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">{LABELS.leaseManagement.tenant}</th>
                <th className="py-2 px-4 border-b text-left">{LABELS.leaseManagement.apartment}</th>
                <th className="py-2 px-4 border-b text-left">{LABELS.leaseManagement.leasePeriod}</th>
                <th className="py-2 px-4 border-b text-left">{LABELS.leaseManagement.monthlyRent}</th>
                <th className="py-2 px-4 border-b text-left">{LABELS.leaseManagement.status}</th>
                <th className="py-2 px-4 border-b text-left">{LABELS.leaseManagement.actions}</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((lease) => (
                <tr key={lease.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {lease.firstName} {lease.lastName}
                    <div className="text-sm text-gray-500">{lease.email}</div>
                  </td>
                  <td className="py-2 px-4 border-b">{lease.apartmentNumber || LABELS.leaseManagement.notSpecified}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(lease.leaseStart)} - {formatDate(lease.leaseEnd)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${lease.monthlyRent || LABELS.leaseManagement.notSpecified}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm ${lease.leaseStatus === "PENDING" ? "bg-yellow-100 text-yellow-800" : lease.leaseStatus === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {lease.leaseStatus.toLowerCase()}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      {lease.leaseStatus === "PENDING" && (
                        <button
                          onClick={() => updateLeaseStatus(lease.id, "ACTIVE")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          {LABELS.leaseManagement.markActive}
                        </button>
                      )}
                      {lease.leaseStatus === "ACTIVE" && (
                        <button
                          onClick={() => updateLeaseStatus(lease.id, "EXPIRED")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          {LABELS.leaseManagement.markExpired}
                        </button>
                      )}
                      {lease.leaseStatus === "EXPIRED" && (
                        <button
                          onClick={() => updateLeaseStatus(lease.id, "ACTIVE")}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          {LABELS.leaseManagement.reactivate}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
