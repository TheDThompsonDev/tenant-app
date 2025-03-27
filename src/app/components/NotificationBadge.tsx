interface NotificationBadgeProps {
  value?: number;
  className?: string;
}

export default function NotificationBadge({
  value,
  className,
}: NotificationBadgeProps) {
  if (!value || value <= 0) {
    return null;
  }

  const displayValue = value > 99 ? '99+' : value;
  const textSize = value > 99 ? 'text-[9px]' : 'text-xs';

  return (
    <div
      className={`w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full font-bold ${textSize} ${className}`}
    >
      {displayValue}
    </div>
  );
}
