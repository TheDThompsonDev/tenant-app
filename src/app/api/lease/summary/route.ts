import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    const apartmentNumber = searchParams.get('apartmentNumber');
    const getAllLeases = searchParams.get('all') === 'true';

    if (getAllLeases) {
      const leases = await prisma.lease.findMany({
        orderBy: { updatedAt: 'desc' },
      });

      return NextResponse.json(leases);
    }

    let lease;

    if (apartmentNumber) {
      lease = await prisma.lease.findFirst({
        where: {
          apartmentNumber,
          leaseStatus: 'ACTIVE',
        },
        orderBy: { updatedAt: 'desc' },
      });
    } else if (userEmail) {
      lease = await prisma.lease.findFirst({
        where: { email: userEmail },
        orderBy: { updatedAt: 'desc' },
      });
    } else {
      lease = await prisma.lease.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
    }

    if (!lease) {
      return NextResponse.json(
        { success: false, error: 'No lease found' },
        { status: 404 }
      );
    }

    const paymentDueDate = '1st of each month';
    const lateFee = '$50 after the 5th of each month';

    const leaseSummary: LeaseSummary = {
      id: lease.id,
      title: `Lease Agreement for ${lease.firstName || ''} ${
        lease.lastName || ''
      }`.trim(),
      leaseStatus: lease.leaseStatus,
      startDate: lease.leaseStart
        ? new Date(lease.leaseStart).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Not specified',
      endDate: lease.leaseEnd
        ? new Date(lease.leaseEnd).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Not specified',
      monthlyRent: lease.monthlyRent
        ? `$${lease.monthlyRent}`
        : 'Not specified',
      securityDeposit: lease.securityDeposit
        ? `$${lease.securityDeposit}`
        : 'Not specified',
      paymentDueDate,
      lateFee,
      createdAt: lease.createdAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: leaseSummary,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching lease summary:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
