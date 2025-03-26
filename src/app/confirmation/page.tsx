'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
import LABELS from '../constants/labels'
import Header from '../components/Header';
import Footer from '../components/Footer';

type DocumentStatus = {
    id: string;
    status: string;
    recipients: Array<{ email: string; name: string }>;
    createdAt: string;
} | null;

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const documentId = searchParams?.get('id') || '';
    const [documentStatus, setDocumentStatus] = useState<DocumentStatus>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (documentId) {
            const tenantEmail = searchParams?.get('email') || '';
            const tenantName = searchParams?.get('name') || '';

            const fetchDocumentStatus = async () => {
                try {
                    const response = await fetch(`/api/document-status?id=${documentId}${tenantEmail ? `&email=${encodeURIComponent(tenantEmail)}` : ''}${tenantName ? `&name=${encodeURIComponent(tenantName)}` : ''}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch document status');
                    }
                    const data = await response.json();
                    setDocumentStatus(data);
                } catch (error) {
                    console.error('Error fetching document status:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDocumentStatus();
        } else {
            setLoading(false);
        }
    }, [documentId, searchParams]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
        <Link
          href="/lease"
          className="text-med text-gray-500 mb-4 inline-block absolute top-10 left-10">
          &larr; {LABELS.success.back}
        </Link>
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <svg
                        className="mx-auto h-24 w-24 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>

                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        {LABELS.confirmation.title}
                    </h1>

                    <p className="mt-3 text-xl text-gray-500">
                        {LABELS.confirmation.description}
                    </p>

                    {loading ? (
                        <div className="mt-6">
                            <p className="text-gray-500">{LABELS.confirmation.loading}</p>
                        </div>
                    ) : documentStatus ? (
                        <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">{LABELS.confirmation.labels.documentId}</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{documentStatus.id}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">{LABELS.confirmation.labels.status}</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                                {documentStatus.status || LABELS.confirmation.labels.pending}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">{LABELS.confirmation.labels.sentTo}</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{documentStatus.recipients?.map(s => s.email).join(', ') || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date Sent</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {documentStatus.createdAt
                                                ? new Date(documentStatus.createdAt).toLocaleString()
                                                : new Date().toLocaleString()}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <p className="text-yellow-600">
                                {LABELS.confirmation.missingInfo}
                            </p>
                        </div>
                    )}

                    <div className="mt-10">
                        <Link
                            href="/generateLease"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {LABELS.confirmation.createAnother}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
      </div>
    );
}

export default function ConfirmationPage() {
    return (
      <div>
        <Header />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              Loading...
            </div>
          }>
        <ConfirmationContent />
        </Suspense>
        <Footer />
      </div>
    );
}