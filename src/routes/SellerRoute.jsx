import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";


const SellerRoute = ({children}) => {
    const [role,isLoading]=useRole()

    if(isLoading)return <LoadingSpinner></LoadingSpinner>
    if(role?.role==='Seller') return children
    return (
        <div>
            <Navigate to={'/dashboard'}  replace='true'></Navigate>
        </div>
    );
};

export default SellerRoute;