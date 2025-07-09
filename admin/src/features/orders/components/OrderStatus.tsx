import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import StatusBadge from './StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderStatusProps {
  orderId: string;
  showFullTimeline?: boolean;
  className?: string;
}

type StatusEvent = {
  status: string;
  timestamp: string;
  message?: string;
  userId?: string;
};

export default function OrderStatus({ orderId, showFullTimeline = true, className }: OrderStatusProps) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['order-status', orderId],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${orderId}/status`);
      return data;
    },
    refetchInterval: 30000 // Auto-refresh every 30 seconds
  });

  // Calculate progress percentage based on status
  const getProgressValue = () => {
    const statusOrder = [
      'pending',
      'processing',
      'in_review',
      'awaiting_payment',
      'completed',
      'delivered'
    ];
    
    if (!data?.currentStatus) return 0;
    const index = statusOrder.indexOf(data.currentStatus);
    return index >= 0 ? Math.round((index / (statusOrder.length - 1)) * 100) : 0;
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-2 w-full" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("rounded-lg border border-destructive p-4", className)}>
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Failed to load order status</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          There was an error fetching the latest status updates.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-1.5"
          onClick={() => refetch()}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">Order Progress</h3>
          <StatusBadge 
            status={data.currentStatus} 
            showTooltip 
            tooltipText={data.statusMessage}
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => refetch()}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>

      <Progress value={getProgressValue()} className="h-2" />

      {showFullTimeline && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Status History</h4>
          <div className="space-y-3">
            {data?.timeline?.length ? (
              data.timeline.map((event: StatusEvent, index: number) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${
                      index === 0 
                        ? 'bg-primary' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                    {index < data.timeline.length - 1 && (
                      <div className="h-full w-px bg-gray-200 dark:bg-gray-700" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        {event.status.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {format(new Date(event.timestamp), 'MMM d, yyyy - h:mm a')}
                      </time>
                    </div>
                    {event.message && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.message}
                      </p>
                    )}
                    {event.userId && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Updated by: {event.userId}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No status history available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}