import {
  MessageSquareText,
  Lock,
  Package,
  CarFront,
  Folder,
  Car,
  Mail,
  Package2,
  TriangleAlert,
  LockOpen,
  Pencil,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType> = {
  messageIcon: MessageSquareText,
  lockIcon: Lock,
  packageIcon: Package,
  parkingIcon: CarFront,
  composeIcon: Pencil,
  leaseIcon: Folder,
  guestParkingIcon: Car,
  mailIcon: Mail,
  packagesIcon: Package2,
  problemIcon: TriangleAlert,
  unlockIcon: LockOpen,
};

export default ICON_MAP;
