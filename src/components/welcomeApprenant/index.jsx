import React from 'react';
import MainApprenant from '../mainApprenant';
import MainRight from '../mainRight';


const WelcomeApprenant = () => {


    return (
        <div className='App'> 
            <MainApprenant />
            <div className='container mainRight'>
                <MainRight />
            </div>
        </div>
    )
}

export default WelcomeApprenant
