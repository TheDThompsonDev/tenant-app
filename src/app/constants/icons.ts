import { MessageSquareText, Lock, Package, CarFront, Pencil } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType> = {
  messageIcon: MessageSquareText,
  lockIcon: Lock,
  packageIcon: Package,
  parkingIcon: CarFront,
  composeIcon: Pencil,
};

export default ICON_MAP;
