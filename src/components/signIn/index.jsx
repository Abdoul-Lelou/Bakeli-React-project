import React,{useState,useEffect} from 'react';
import { auth,dbFirestore, dbProf, storageFirebase } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import { useHistory } from 'react-router';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [imageAsFile, setImageAsFile] = useState('')


    const route= useHistory();

    useEffect(() => {
      const uid = localStorage.getItem('uidLogin');
			if (!uid) {
				route.push('')
			}
    }, [])

    const notify = (msg) => toast(msg);

    const  handleSubmit=(e)=>{

        e.preventDefault();
        let nbrCalls=0;

        return  storageFirebase.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
          .on('state_changed', 
            (snapShot) => {
              
                snapShot.ref.getDownloadURL().then((url) => {
                  nbrCalls++;
        
                  if (nbrCalls >1) {
                    console.log('ok')
                    const signInFirebase= auth.createUserWithEmailAndPassword(email,password);
                
                    try {
                      signInFirebase.then(res=>{
                        dbFirestore.doc(res.user.uid).set({email,nom,prenom,role,url},{merge:true}).then();
                        notify('Reussie');
                        setTimeout(() => {
                          route.push('listapprenant')
                        }, 2000);
                      }).catch(err=> notify(err.message))
                    } catch (error) {
                      notify(error)
                    }
                  }
                  
              });

              
            
            }
          
          )  
       
        
    }

    const handleImageAsFile = (e) => {
      setImageAsFile(e.target.files[0])
    }

    const toInputUppercase = e => {
      if(e.target.value !==''){
        e.target.value = ("" + e.target.value.replace(/[^a-zA-Z ]/g, ""))[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
      } 
    }
    


    return (
        
      <>
      &nbsp;
        <form id="contact" onSubmit={handleSubmit}>
          <h6>INSCRIPTION</h6>
          <fieldset>
            <input placeholder="Email" type="email" tabIndex="1" required onChange={(e)=>setEmail(e.target.value)} onInput={toInputUppercase} />
          </fieldset>
          <fieldset>
            <input placeholder="Nom" type="text" tabIndex="2" required autoFocus onChange={(e)=>setNom(e.target.value)} onInput={toInputUppercase} />
          </fieldset>
          <fieldset>
            <input placeholder="Prenom" type="text" tabIndex="3" required onChange={(e)=>setPrenom(e.target.value)} onInput={toInputUppercase} />
          </fieldset>
          <fieldset>
            <input placeholder="Password" type="password" tabIndex="4" required onChange={(e)=>setPassword(e.target.value)}/>
          </fieldset>
          <fieldset>
              <select name="pets" id="pet-select" required onChange={e=> setRole(e.target.value)}>
                  <option value="">--Please choose an option--</option>
                  <option value="apprenant">apprenant</option>
              </select>
          </fieldset>
          <fieldset>
                  <label htmlFor="ppt" data-role="button" className='text-info' data-inline="true" data-mini="true" data-corners="false">Photo</label>
                    <input id="ppt" type="file" name="ppt"
                           multiple data-role="button" 
                           data-inline="true" data-mini="true" data-corners="false"
                           onChange={e=> setImageAsFile(e.target.files[0])}
                           />
          </fieldset>
          <fieldset>
          <button name="submit"  type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
          </fieldset>
        </form>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            {/*  Affichage des notifications*/}
            <ToastContainer />

      </>

    )
}

export default SignIn
