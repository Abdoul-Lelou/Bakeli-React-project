import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { dbFirestore } from '../../firebase';
import Main from '../main';
import MainRight from '../mainRight';


const Welcome = ({prof,cour,user}) => {

    const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [url, setUrl] = useState('');


    const route= useHistory()

    useEffect(() => {
        
        const uid= localStorage.getItem('uidLogin');
        if(!uid){
            route.push('');
            return false;
        }
        dbFirestore.doc(uid).get().then(res => {
			setUrl(res.data().url)
			setPrenom(res.data().prenom)
			setNom(res.data().nom)
            
		})
        
    },[route])


    return (
        <div className='App'> 
            <Main prenom={prenom} nom={nom} url={url} />
            <div className='container mainRight'>
                <MainRight prenom={prenom} nom={nom} url={url} prof={prof} user={user} cour={cour} />
            </div>
        </div>
    )
}

export default Welcome
