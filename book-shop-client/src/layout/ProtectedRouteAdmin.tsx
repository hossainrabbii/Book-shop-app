import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const ProtectedRouteAdmin = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user?.role === "user") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default ProtectedRouteAdmin;
