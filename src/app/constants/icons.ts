import { MessageSquareText, Lock, Package, CarFront } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType> = {
  messageIcon: MessageSquareText,
  lockIcon: Lock,
  packageIcon: Package,
  parkingIcon: CarFront,
};

export default ICON_MAP;
