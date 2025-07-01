import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { usePackage } from "@/context/PackageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const PackageCheckout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    order,
    submitOrder,
    clearOrder
  } = usePackage();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmOrder = async () => {
    if (!user) {
      toast.error("Please login to complete your order", {
        action: {
          label: "Login",
          onClick: () => navigate("/login")
        }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!order.package) {
        throw new Error("No package selected");
      }

      const success = await submitOrder(user.email);
      
      if (!success) {
        throw new Error("Order submission failed");
      }

      setOrderConfirmed(true);
      toast.success("Order confirmed! Check your email for details");
      
      // Redirect after 5 seconds
      setTimeout(() => {
        clearOrder();
        navigate("/");
      }, 5000);

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to process order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500 rounded-xl p-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-300 mb-6">
              Thank you for your order, {user?.name || "valued customer"}. Our team will 
              contact you within 24 hours to discuss the next steps.
            </p>
            <p className="text-gray-400 text-sm">
              A confirmation has been sent to {user?.email}
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
          <h1 className="text-3xl font-bold text-white mb-6">
            Confirm Your Order
          </h1>

          {order.package && (
            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
              <h2 className="text-xl font-bold text-blue-400 mb-2">Package</h2>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">{order.package.name}</h3>
                  <p className="text-gray-300">{order.package.price}</p>
                </div>
              </div>
            </div>
          )}

          {order.addOns.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-400 mb-3">Add-Ons</h2>
              <div className="space-y-3">
                {order.addOns.map((addon) => (
                  <div 
                    key={addon.id} 
                    className="flex justify-between items-center bg-gray-800/40 p-3 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{addon.icon}</span>
                      <span className="text-white">{addon.name}</span>
                    </div>
                    <span className="text-blue-300">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 my-6"></div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-white">Total</span>
            <span className="text-2xl font-bold text-blue-400">
              {order.totalPrice || "LKR 0"}
            </span>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting || !order.package}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
            
            <Link
              to="../"
              className="block w-full py-3 bg-gray-700 hover:bg-gray-600 text-white text-center font-medium rounded-lg transition-all"
            >
              Back to Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCheckout;