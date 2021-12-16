import React,{useEffect, useState} from 'react';
import './index.css'
import img1 from './../../images/homme.png'
import { dbFirestore } from '../../firebase';
import { useHistory } from 'react-router';

const UserCards = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [url, setUrl] = useState('')

    const path= useHistory('');

    useEffect(() => {
        
        const uidLogin = localStorage.getItem('uidLogin')
        if (!uidLogin) {
            path.push('');
            return;
        }
        console.log(dbFirestore.doc('uid').get().then(e=> {if(e.exists){console.log(e)}}))
        dbFirestore.doc(uidLogin).get().then(res => {
            setUrl(res.data().url)
            setPrenom(res.data().prenom)
            setNom(res.data().nom)
            setEmail(res.data().email);
            setRole(res.data().role)
        })
    }, [])

    return (
        <>
           
  <div className="center border border-danger">
    <div className="containers ">
      <div className="left border  shadow">
        <div className="photo">
        <div className="circle border border-success"></div>   
          <img alt="user photo" src={url} />
          <div className="circle2"></div>  
        </div>     
        <div className="title__contain">
          <div className="username">{prenom} {nom}</div>
        </div>
        <button className="follow butn">Follow</button>
        <button className="message butn">Message</button>
      </div>
      <div className="right">
        <div className="rightbox">
          <span className="large"><strong>Email</strong></span>
          <span className="small">{email}</span>
        </div>
        <div className="rightbox">
          <span className="large"><strong>Rôle</strong></span>
          <span className="small">{role}</span>
        </div>
        <div className="rightbox">
          <span className="large">241</span>
          <span className="small">Followers</span>
        </div>
      </div>
    </div>
  </div>
</>
    )
}

export default UserCards
