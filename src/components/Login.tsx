// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { CheckCircle, Loader2, XCircle } from "lucide-react";
// import api from "@/lib/api";

// export default function VerifyEmail() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState<"verifying" | "success" | "error">(
//     "verifying"
//   );
//   const [message, setMessage] = useState(
//     "Please wait while we verify your email address."
//   );

//   useEffect(() => {
//     if (!token) {
//       setStatus("error");
//       setMessage(
//         "No verification token provided. Please check your email link."
//       );
//       return;
//     }

//     const verifyToken = async () => {
//       try {
//         const res = await api.get(`/auth/verify/${token}`);
//         setStatus("success");
//         setMessage(
//           res.data.message || "Your email has been successfully verified!"
//         );
//         // Redirect to login after a short delay
//         setTimeout(() => navigate("/login"), 5000);
//       } catch (error: any) {
//         setStatus("error");
//         setMessage(
//           error.response?.data?.error ||
//             "Invalid or expired token. Please try registering again."
//         );
//       }
//     };

//     verifyToken();
//   }, [token, navigate]);

//   const StatusIcon = () => {
//     if (status === "verifying")
//       return <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />;
//     if (status === "success")
//       return <CheckCircle className="w-16 h-16 text-green-400" />;
//     if (status === "error")
//       return <XCircle className="w-16 h-16 text-red-400" />;
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
//         <div className="flex justify-center mb-6">
//           <StatusIcon />
//         </div>
//         <h1 className="text-2xl font-bold text-white mb-4">
//           {status === "verifying" && "Verifying Your Email..."}
//           {status === "success" && "Verification Successful!"}
//           {status === "error" && "Verification Failed"}
//         </h1>
//         <p className="text-gray-400 mb-6">{message}</p>
//         {status === "success" && (
//           <p className="text-sm text-gray-500">
//             You will be redirected to the login page shortly.
//           </p>
//         )}
//         {status !== "verifying" && (
//           <Link
//             to="/login"
//             className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-semibold"
//           >
//             Go to Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }
