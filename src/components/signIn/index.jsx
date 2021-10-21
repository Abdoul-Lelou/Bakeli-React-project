import React,{useState} from 'react';
import { auth,dbFirestore } from "../../firebase";

import './index.css';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const signInFirebase= auth.createUserWithEmailAndPassword(email,password);

        return signInFirebase.then(res=>{
            dbFirestore.doc(res.user.uid).set({email,nom,prenom}).then(resp=>{
                alert('ok ca marche')
             })
        })
    }

    return (
        
      <div className=' mainDiv ml-4'>
        <form id="contact" onSubmit={handleSubmit}>
          <h6>INSCRIPTION</h6>
          <fieldset>
            <input placeholder=" Email" type="email" tabIndex="2" required onChange={(e)=>setEmail(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder="Nom" type="text" tabIndex="1" required autoFocus onChange={(e)=>setNom(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder="Prenom" type="text" tabIndex="3" required onChange={(e)=>setPrenom(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder="Password" type="password" tabIndex="4" required onChange={(e)=>setPassword(e.target.value)}/>
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
          </fieldset>
        </form>
      </div>

    )
}

export default SignIn
