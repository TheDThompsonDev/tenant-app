import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const { id, leaseStatus } = await request.json();
    
    if (!id || !leaseStatus) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: id and leaseStatus' },
        { status: 400 }
      );
    }
    
    const updatedLease = await prisma.lease.update({
      where: { id },
      data: { leaseStatus }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedLease
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating lease status:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
