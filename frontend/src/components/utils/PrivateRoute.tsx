import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    //let auth = 
   const [auth,setAuth] = useState({'token': true});

    const updateAuthToken = (newToken: boolean) => {
        setAuth({ token: newToken });
    };

    return(
        auth.token ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes