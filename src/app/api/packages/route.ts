import { NextResponse } from 'next/server';

export const packages = [
  {
    id: '1',
    date: '2025-03-15',
    time: '10:30 AM',
    locker: 'A1',
    lockerCode: '1234',
    status: 'Picked Up',
    pickupDate: '',
  },
  {
    id: '2',
    date: '2025-03-16',
    time: '2:45 PM',
    locker: 'B3',
    lockerCode: '5678',
    status: 'Picked Up',
    pickupDate: '2025-03-17',
  },
  {
    id: '3',
    date: '2025-03-18',
    time: '9:15 AM',
    locker: 'C2',
    lockerCode: '9012',
    status: 'Ready for Pickup',
    pickupDate: '',
  },
  {
    id: '4',
    date: '2025-03-20',
    time: '4:30 PM',
    locker: 'A4',
    lockerCode: '3456',
    status: 'Ready for Pickup',
    pickupDate: '',
  },
];

export async function GET() {
  return NextResponse.json(packages);
}
