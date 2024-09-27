import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }: { children: ReactNode }) => {

    const location = useLocation();
    const user = useAppSelector(selectCurrentUser)
    if (!user) {
        return <Navigate state={location.pathname} to={'/login'} replace={true} />
    }

    return children;
};

export default PrivateRoute;