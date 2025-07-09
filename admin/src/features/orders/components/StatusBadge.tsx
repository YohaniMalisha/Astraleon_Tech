import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'in_review'
  | 'awaiting_payment'
  | 'completed'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
}

const statusConfig = {
  pending: {
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    icon: '⏳',
    label: 'Pending'
  },
  processing: {
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: '⚙️',
    label: 'Processing'
  },
  in_review: {
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    icon: '🔍',
    label: 'In Review'
  },
  awaiting_payment: {
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    icon: '💳',
    label: 'Awaiting Payment'
  },
  completed: {
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    icon: '✅',
    label: 'Completed'
  },
  delivered: {
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    icon: '🚚',
    label: 'Delivered'
  },
  cancelled: {
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    icon: '❌',
    label: 'Cancelled'
  },
  refunded: {
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    icon: '↩️',
    label: 'Refunded'
  }
};

export default function StatusBadge({
  status,
  className,
  showTooltip = false,
  tooltipText
}: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit",
          config.color
        )}
      >
        <span className="text-xs">{config.icon}</span>
        {config.label}
      </span>
      
      {showTooltip && (
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <InfoCircledIcon className="h-3.5 w-3.5 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[200px]">
            <p>{tooltipText || `Order is currently ${config.label.toLowerCase()}`}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}