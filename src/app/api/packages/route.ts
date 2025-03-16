import { v4 as uuidv4 } from "uuid";

// Mock Data for packages and lockers

export const packages = [
    {
        id: uuidv4(),
        date: '3/15/25',
        time: '3:00 PM',
        locker: 'A1',
        lockerCode: '1234',
        status: 'Ready for pickup',
        pickupDate: '',
      },
      {
        id: uuidv4(),
        date: '3/11/25',
        time: '10:08 AM',
        locker: 'A3',
        lockerCode: '2468',
        status: 'Ready for pickup',
        pickupDate: '',
      },
      {
        id: uuidv4(),
        date: '3/1/25',
        time: '10:08 AM',
        locker: 'A2',
        lockerCode: '1200',
        status: 'Picked up',
        pickupDate: '3/2/25',
      },
      {
        id: uuidv4(),
        date: '2/15/25',
        time: '11:08 AM',
        locker: 'A1',
        lockerCode: '0101',
        status: 'Picked up',
        pickupDate: '2/15/25',
      }
];