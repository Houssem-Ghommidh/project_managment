import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ auth, children }) => {

    if (auth === false) {
        console.log('i am here')
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute