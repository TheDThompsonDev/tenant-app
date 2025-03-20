import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function POST(request) {
  try {
    const formData = await request.json();
    const requiredFields = [
      'landlordName',
      'landlordEmail',
      'tenantName',
      'tenantEmail',
      'propertyAddress',
      'leaseStartDate',
      'leaseEndDate',
      'monthlyRent',
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText('RESIDENTIAL LEASE AGREEMENT', {
      x: 50,
      y: 750,
      size: 16,
      font: boldFont,
    });

    const contentLines = [
      { text: `THIS LEASE AGREEMENT made this ${new Date().toLocaleDateString()}`, y: 720 },
      { text: `BETWEEN:`, y: 700 },
      { text: `${formData.landlordName} (Landlord)`, y: 680 },
      { text: `AND:`, y: 660 },
      { text: `${formData.tenantName} (Tenant)`, y: 640 },
      { text: `FOR THE PREMISES AT:`, y: 620 },
      { text: `${formData.propertyAddress}`, y: 600 },
      { text: `TERM:`, y: 580 },
      { text: `From ${formData.leaseStartDate} to ${formData.leaseEndDate}`, y: 560 },
      { text: `RENT:`, y: 540 },
      { text: `$${formData.monthlyRent} per month, payable on the 1st day of each month`, y: 520 },
      { text: `The parties agree to the terms of this lease.`, y: 500 },
      { text: `This document requires digital signature from all parties.`, y: 480 },
    ];

    contentLines.forEach(line => {
      page.drawText(line.text, {
        x: 50,
        y: line.y,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    const fileBuffer = Buffer.from(pdfBytes);

    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `lease_${Date.now()}.pdf`);
    await fs.writeFile(tempFilePath, fileBuffer);

    const documentTitle = `Lease Agreement - ${formData.propertyAddress}`;
    const documensoData = await sendToDocumenso(documentTitle, formData.tenantName, formData.tenantEmail, fileBuffer);

    try {
      await fs.unlink(tempFilePath);
    } catch (deleteError) {
    }

    return NextResponse.json({
      success: true,
      documentId: documensoData.documentId,
      redirectUrl: `/confirmation?id=${documensoData.documentId}&email=${encodeURIComponent(formData.tenantEmail)}&name=${encodeURIComponent(formData.tenantName)}`,
      documensoData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function sendToDocumenso(documentTitle, tenantName, tenantEmail, fileBuffer) {
  const base64Pdf = fileBuffer.toString('base64');

  if (!process.env.DOCUMENSO_API_KEY) {
    return {
      documentId: Date.now().toString(),
      status: 'DRAFT',
      recipients: [
        {
          email: tenantEmail,
          name: tenantName,
          status: 'PENDING',
        },
      ],
    };
  }

  const apiKey = process.env.DOCUMENSO_API_KEY;
  const requestBody = {
    title: documentTitle,
    recipients: [
      {
        email: tenantEmail,
        name: tenantName,
        role: 'SIGNER',
      },
    ],
    fileName: `${documentTitle}.pdf`,
    redirectUrl: null,
    timezone: 'America/Chicago',
    dateFormat: 'MM/DD/YYYY',
    documentLength: base64Pdf.length
  };

  try {
    const response = await fetch('https://app.documenso.com/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...requestBody,
        document: base64Pdf,
      }),
    });

    if (!response.ok) {
      throw new Error(`Documenso API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    
    if (responseData.uploadUrl) {
      try {
        const uploadResponse = await fetch(responseData.uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/pdf',
          },
          body: fileBuffer
        });
        
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload PDF: ${uploadResponse.statusText}`);
        }
      } catch (uploadError) {
      }
    }
    
    return responseData;
  } catch (error) {
    const mockResponse = {
      documentId: Date.now().toString(),
      status: 'ERROR',
      error: error.message,
      recipients: [
        {
          email: tenantEmail,
          name: tenantName,
          status: 'PENDING',
        },
      ],
    };
    
    return mockResponse;
  }
}