import { useParams } from 'react-router-dom';
import OrderStatus from '@/features/orders/components/OrderStatus';
import OrderActions from '@/features/orders/components/OrderActions';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Mail, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import CustomerInfo from '@/features/orders/components/CustomerInfo';
import OrderItems from '@/features/orders/components/OrderItems';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/orders/${id}`);
      return data.order;
    }
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium text-destructive">
                Failed to load order
              </h3>
              <p className="text-sm text-muted-foreground">
                {error.message || 'Unknown error occurred'}
              </p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-medium">Order not found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              The requested order does not exist
            </p>
            <Button asChild variant="link" className="mt-4">
              <Link to="/admin/orders">Back to orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="pl-0">
          <Link to="/admin/orders" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">
                      {format(new Date(order.createdAt), 'MMM d, yyyy')}
                    </Badge>
                    <Badge variant="outline">
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${order.totalAmount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <OrderItems items={order.items} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderStatus orderId={id!} showFullTimeline />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <CustomerInfo 
            customer={order.customer} 
            shippingAddress={order.shippingAddress} 
            billingAddress={order.billingAddress}
          />

          <OrderActions 
            orderId={id!} 
            currentStatus={order.status} 
            paymentStatus={order.paymentStatus}
          />

          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {order.notes ? (
                <p className="text-sm">{order.notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No notes available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}