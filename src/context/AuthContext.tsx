// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "@/lib/api";
// import { toast } from "sonner";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   isAdmin: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   // Check auth status on initial load
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           const { data } = await api.get("/auth/me");
//           setUser(data.user);
//         }
//       } catch (err) {
//         logout();
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const { data } = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//       setUser(data.user);
//       navigate("/dashboard");
//     } catch (error: any) {
//       // Throw the specific error message from the backend
//       throw new Error(
//         error.response?.data?.error ||
//           "Login failed. Please check your credentials."
//       );
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       // Register doesn't log the user in anymore. It just creates the account.
//       await api.post("/auth/register", { name, email, password });
//     } catch (error: any) {
//       // Throw the specific error message from the backend
//       throw new Error(
//         error.response?.data?.error || "Registration failed. Please try again."
//       );
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         register,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
