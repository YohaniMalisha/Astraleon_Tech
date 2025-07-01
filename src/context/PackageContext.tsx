import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface AddOn {
  id: string;
  name: string;
  price: string;
  icon: string;
}

interface Package {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  description?: string;
  productLimit?: string;
  pageLimit?: string;
  postLimit?: string;
  additionalPagePrice?: string;
}

interface Order {
  package: Package | null;
  addOns: AddOn[];
  totalPrice: string;
}

interface PackageContextType {
  order: Order;
  selectPackage: (pkg: Package) => void;
  addAddOn: (addon: AddOn) => void;
  removeAddOn: (addonId: string) => void;
  clearOrder: () => void;
  submitOrder: (userEmail: string) => Promise<boolean>;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const PackageProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Order>({
    package: null,
    addOns: [],
    totalPrice: 'LKR 0'
  });

  const calculateTotal = useCallback(() => {
    const base = order.package ? parseInt(order.package.price.replace(/\D/g, '')) || 0 : 0;
    const addOnsTotal = order.addOns.reduce((sum, addon) => {
      return sum + (parseInt(addon.price.replace(/\D/g, '')) || 0);
    }, 0);
    return `LKR ${(base + addOnsTotal).toLocaleString()}`;
  }, [order.package, order.addOns]);

  useEffect(() => {
    setOrder(prev => ({
      ...prev,
      totalPrice: calculateTotal()
    }));
  }, [calculateTotal]);

  const selectPackage = useCallback((pkg: Package) => {
    setOrder(prev => ({
      ...prev,
      package: pkg
    }));
  }, []);

  const addAddOn = useCallback((addon: AddOn) => {
    setOrder(prev => ({
      ...prev,
      addOns: [...prev.addOns, addon]
    }));
  }, []);

  const removeAddOn = useCallback((addonId: string) => {
    setOrder(prev => ({
      ...prev,
      addOns: prev.addOns.filter(addon => addon.id !== addonId)
    }));
  }, []);

  const clearOrder = useCallback(() => {
    setOrder({
      package: null,
      addOns: [],
      totalPrice: 'LKR 0'
    });
  }, []);

  const submitOrder = useCallback(async (userEmail: string): Promise<boolean> => {
    try {
      if (!order.package) {
        throw new Error('No package selected');
      }

      // In production, you would:
      // 1. Send to your backend API
      // 2. Backend would send emails (admin + confirmation)
      // 3. Backend would store in database
      const orderData = {
        userEmail,
        package: order.package,
        addOns: order.addOns,
        totalPrice: order.totalPrice,
        orderDate: new Date().toISOString()
      };

      console.log('Order submitted:', orderData); // Remove in production

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error('Order submission failed:', error);
      toast.error('Failed to submit order. Please try again.');
      return false;
    }
  }, [order]);

  return (
    <PackageContext.Provider
      value={{
        order,
        selectPackage,
        addAddOn,
        removeAddOn,
        clearOrder,
        submitOrder
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = (): PackageContextType => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
};