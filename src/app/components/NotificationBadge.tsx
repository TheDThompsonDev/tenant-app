interface NotificationBadgeProps {
  value: number;
  className?: string;
}

export default function NotificationBadge({
  value,
  className,
}: NotificationBadgeProps) {
  if (value <= 0) {
    return null;
  }

  const displayValue = value > 99 ? '99+' : value;
  const textSize = value > 99 ? 'text-[8px]' : 'text-xs';

  return (
    <div
      className={`w-8 h-8 bg-alternate-green text-primary-green border border-primary-green flex items-center justify-center rounded-full font-bold tracking-widest ${textSize} ${className}`}
    >
      {displayValue}
    </div>
  );
}
