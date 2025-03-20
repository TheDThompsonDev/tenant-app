import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const documentId = searchParams.get('id')
  const tenantEmail = searchParams.get('email') || 'tenant@example.com'
  const tenantName = searchParams.get('name') || 'Tenant Name'

  if (!documentId) {
    return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
  }

  if (!process.env.DOCUMENSO_API_KEY) {
    const mockResponse = {
      id: documentId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      recipients: [
        {
          email: tenantEmail,
          name: tenantName,
          status: 'PENDING'
        }
      ]
    };
    return NextResponse.json(mockResponse);
  }

  try {
    const apiKey = process.env.DOCUMENSO_API_KEY.replace(/^api_/, '');
    const formattedApiKey = `api_${apiKey}`;
    
    const response = await fetch(`https://app.documenso.com/api/v1/documents/${documentId}`, {
      method: 'GET',
      headers: {
        'Authorization': formattedApiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Documenso API error: ${errorData.message || response.statusText}`);
    }

    const documentData = await response.json();
    return NextResponse.json(documentData);
  } catch (networkError) {
    const mockResponse = {
      id: documentId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      networkError: true,
      errorMessage: networkError.message,
      recipients: [
        {
          email: tenantEmail,
          name: tenantName,
          status: 'PENDING'
        }
      ]
    };
    return NextResponse.json(mockResponse)
  }
}