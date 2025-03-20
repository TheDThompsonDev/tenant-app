import { NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request) {
    try {
        const data = await request.json();
        const { tenantName, tenantEmail, propertyAddress, leaseStartDate, leaseEndDate, monthlyRent } = data;

        // 1. Load template PDF
        const templatePath = path.join(process.cwd(), 'public', 'templates', 'lease_template.pdf');
        const templateBytes = await fs.readFile(templatePath);
        const pdfDoc = await PDFDocument.load(templateBytes);

        // 2. Fill in the form fields (if the template has form fields)
        const form = pdfDoc.getForm();

        // Try to fill in existing form fields if they exist
        try {
            form.getTextField('tenant_name').setText(tenantName);
            form.getTextField('tenant_email').setText(tenantEmail);
            form.getTextField('property_address').setText(propertyAddress);
            form.getTextField('lease_start_date').setText(leaseStartDate);
            form.getTextField('lease_end_date').setText(leaseEndDate);
            form.getTextField('monthly_rent').setText(monthlyRent);

            // Flatten the form (optional - makes fields non-editable)
            form.flatten();
        } catch (error) {
            console.warn('No form fields found or error filling fields:', error.message);
            // Continue without filling form fields - we'll use a different method later
        }

        // 3. Save the filled PDF
        const pdfBytes = await pdfDoc.save();

        // 4. Create a temporary file path for the generated PDF
        const outputPath = path.join(process.cwd(), 'temp', `lease_${Date.now()}.pdf`);

        // Ensure temp directory exists
        await fs.mkdir(path.join(process.cwd(), 'temp'), { recursive: true });

        // Write the file
        await fs.writeFile(outputPath, pdfBytes);

        // 5. Send to Documenso API
        const documensoResponse = await sendToDocumenso(outputPath, {
            tenantName,
            tenantEmail,
            landlordName: data.landlordName,
            landlordEmail: data.landlordEmail,
            documentTitle: `Lease Agreement - ${propertyAddress}`
        });

        // 6. Clean up the temporary file
        await fs.unlink(outputPath);

        return NextResponse.json({
            success: true,
            message: 'PDF generated and sent to Documenso for signing',
            documensoData: documensoResponse
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Helper function to send PDF to Documenso API
async function sendToDocumenso(pdfPath, signingDetails) {
    try {
        const { tenantName, tenantEmail, landlordName, landlordEmail, documentTitle } = signingDetails;

        // Read the PDF file
        const fileBuffer = await fs.readFile(pdfPath);

        // Prepare form data
        const formData = new FormData();
        const file = new Blob([fileBuffer], { type: 'application/pdf' });
        formData.append('document', file, path.basename(pdfPath));
        formData.append('title', documentTitle);

        // Add signers information
        const signers = [
            {
                name: tenantName,
                email: tenantEmail,
                role: 'SIGNER'
            },
            {
                name: landlordName,
                email: landlordEmail,
                role: 'VIEWER'  // or "SIGNER" if landlord should also sign
            }
        ];

        formData.append('signers', JSON.stringify(signers));

        // API request to Documenso
        // Note: Replace with actual Documenso API endpoints and authentication
        const response = await fetch('https://api.documenso.com/api/documents', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.DOCUMENSO_API_KEY}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Documenso API error: ${errorData.message || response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error sending to Documenso:', error);
        throw error;
    }
}