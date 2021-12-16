import React, { useEffect, useState } from 'react';
import { dbFirestore } from '../../firebase';
import Main from '../main';
import MainRight from '../mainRight';


const Welcome = () => {

    const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [url, setUrl] = useState('')

    useEffect(() => {
        const uid= localStorage.getItem('uidLogin');
        dbFirestore.doc(uid).get().then(res => {
			setUrl(res.data().url)
			setPrenom(res.data().prenom)
			setNom(res.data().nom)
			console.log(res.data().prenom)
		})
    }, [])


    return (
        <div className='App'> 
            <Main prenom={prenom} nom={nom} url={url} />
            <div className='container mainRight'>
                <MainRight prenom={prenom} nom={nom} url={url}/>
            </div>
        </div>
    )
}

export default Welcome
