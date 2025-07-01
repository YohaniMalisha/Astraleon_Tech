import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { usePackage } from '@/context/PackageContext';
import { toast } from 'sonner';

const PackageCheckout = () => {
  const { selectedPackage, selectedAddOns, totalPrice, submitOrder, resetSelection } = usePackage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    
    // In a real app, you would get this from your auth system
    const userEmail = 'user@example.com'; 
    
    const success = await submitOrder(userEmail);
    
    setIsSubmitting(false);
    
    if (success) {
      setOrderConfirmed(true);
      // Reset after showing confirmation
      setTimeout(() => {
        resetSelection();
        navigate('/');
      }, 5000);
    } else {
      toast.error('Order submission failed. Please try again.', {
        position: 'top-center'
      });
    }
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500 rounded-xl p-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for your order. Our team will contact you within 24 hours to discuss the next steps.
            </p>
            <p className="text-gray-400 text-sm">
              A confirmation has been sent to your email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link 
          to="../" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to packages
        </Link>

        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Confirm Your Order</h1>
          
          {/* ... (rest of your checkout display remains the same) */}

          <div className="space-y-4 mt-8">
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCheckout;