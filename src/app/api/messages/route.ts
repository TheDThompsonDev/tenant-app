import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Mock database for messages. Just for our current testing purposes
// until Tatiana is done with the API
let messages = [
  {
    id: uuidv4(),
    subject: "Package Notification",
    body: "This is a message preview. I think you have a package waiting for you at the front desk.",
    createdAt: new Date().toISOString(),
    from: "admin",
    type: "package",
  },
  {
    id: uuidv4(),
    subject: "Management Notification",
    body: "This is a message preview. I think we need to discuss your recent maintenance request.",
    createdAt: new Date().toISOString(),
    from: "admin",
    type: "management",
  },
  {
    id: uuidv4(),
    subject: "Lease Notification",
    body: "This is a message preview. I think your lease is up for renewal soon.",
    createdAt: new Date().toISOString(),
    from: "admin",
    type: "lease",
  },
  {
    id: uuidv4(),
    subject: "Package Notification",
    body: "This is a message preview. I think you have another package waiting for you.",
    createdAt: new Date().toISOString(),
    from: "admin",
    type: "package",
  },
  {
    id: uuidv4(),
    subject: "Lease Question",
    body: "This is a tenant message. I have a question about my lease agreement.",
    createdAt: new Date().toISOString(),
    from: "tenant",
    type: "lease",
  },
  {
    id: uuidv4(),
    subject: "Contact Us",
    body: "This is a tenant message. I am interested in renting.",
    createdAt: new Date().toISOString(),
    from: "tenant",
    type: "general",
  },
  {
    id: uuidv4(),
    subject: 'Package Question',
    body: 'This is a tenant message. I did not receive my package',
    createdAt: new Date().toISOString(),
    from: 'tenant',
    type: 'package'
  }
];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const newMessage = {
    id: uuidv4(),
    subject: data.subject,
    body: data.body,
    createdAt: new Date().toISOString(),
    from: data.from || "tenant",
    type: data.type || "general",
  };

  // Add to our mock database
  messages = [newMessage, ...messages];

  return NextResponse.json(newMessage);
}
