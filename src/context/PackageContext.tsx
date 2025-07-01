// src/context/PackageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface AddOn {
  name: string;
  price: string;
  icon: string;
}

interface Package {
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

interface PackageContextType {
  selectedPackage: Package | null;
  selectedAddOns: AddOn[];
  totalPrice: string;
  selectPackage: (pkg: Package) => void;
  addAddOn: (addon: AddOn) => void;
  removeAddOn: (index: number) => void;
  resetSelection: () => void;
  submitOrder: (userEmail: string) => Promise<boolean>;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const PackageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>('LKR 0');

  // ... (previous functions remain the same)

  const submitOrder = async (userEmail: string) => {
    try {
      // In a real app, you would send this to your backend
      const orderData = {
        package: selectedPackage,
        addOns: selectedAddOns,
        totalPrice,
        userEmail,
        date: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically:
      // 1. Send email to admin
      // 2. Send confirmation to client
      // 3. Clear the selection
      
      return true;
    } catch (error) {
      console.error('Order submission failed:', error);
      return false;
    }
  };

  return (
    <PackageContext.Provider
      value={{
        selectedPackage,
        selectedAddOns,
        totalPrice,
        selectPackage,
        addAddOn,
        removeAddOn,
        resetSelection,
        submitOrder
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
};