import { Helmet } from 'react-helmet-async'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'
import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
const Statistics = () => {
  const [role,isLoading]=useRole()
if(isLoading)return <LoadingSpinner></LoadingSpinner>
if(role?.role==='Customer') return <Navigate to={'/dashboard/my-orders'}></Navigate>
if(role?.role==='Seller') return <Navigate to={'/dashboard/my-inventory'}></Navigate>

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role?.role==='Admin'&&  <AdminStatistics />}
     
    </div>
  )
}

export default Statistics
