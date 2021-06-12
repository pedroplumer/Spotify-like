import React from 'react';
import useAuth from '../customHooks/useAuth';




const Dashboard = ({code}) => {
    const accessTokens = useAuth(code);


    return(<h1>{code}</h1>)
}

export default Dashboard;