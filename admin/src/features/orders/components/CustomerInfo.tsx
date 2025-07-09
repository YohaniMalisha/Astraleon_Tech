import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin, CreditCard } from 'lucide-react';

interface CustomerInfoProps {
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: any;
  billingAddress: any;
}

export default function CustomerInfo({ customer, shippingAddress, billingAddress }: CustomerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{customer.name}</span>
          </div>
          <div className="text-sm text-muted-foreground ml-6">
            <p>{customer.email}</p>
            {customer.phone && <p>{customer.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>Shipping Address</span>
          </div>
          <div className="text-sm text-muted-foreground ml-6">
            <p>{shippingAddress.line1}</p>
            {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        </div>

        {billingAddress && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>Billing Address</span>
            </div>
            <div className="text-sm text-muted-foreground ml-6">
              <p>{billingAddress.line1}</p>
              {billingAddress.line2 && <p>{billingAddress.line2}</p>}
              <p>
                {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
              </p>
              <p>{billingAddress.country}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}