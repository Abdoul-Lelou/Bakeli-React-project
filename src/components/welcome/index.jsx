import React from 'react';
import Main from '../main';
import MainRight from '../mainRight';


const Welcome = ({roleStatut}) => {

    console.log(roleStatut)
    
    return (
        <div className='App'> 
            <Main />
            <div className='container mainRight'>
                <MainRight />
            </div>
        </div>
    )
}

export default Welcome
