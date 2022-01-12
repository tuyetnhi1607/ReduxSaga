import React from 'react'

interface Props {
    
}

export const PrivateRoute = (props: Props) => {

    const isLoggedIn = localStorage.getItem("access_token")
    
    return (
        <div>
            
        </div>
    )
}
