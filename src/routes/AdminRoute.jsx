import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";


const AdminRoute = ({children}) => {
    const[role,isLoading]=useRole()
    if(isLoading) return <LoadingSpinner/>
    if(role?.role==='Admin') return children
    return (
        <div>
            <Navigate to={'/dashboard'}  replace='true'/>
        </div>
    );
};

export default AdminRoute;