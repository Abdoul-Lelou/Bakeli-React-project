import React,{useEffect, useState} from 'react';
import './index.css'
import { dbFirestore } from '../../firebase';
import { useHistory } from 'react-router';
import Modal from 'react-modal/lib/components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      margin: 'auto',
      transform: 'translate(-50%, -50%)',
      background:'#fff',
      width: '30%',
      border: '1px solid #445'
    },
  };

const UserCards = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [url, setUrl] = useState('')
    const [userId, setUserId] = useState('')

    const path= useHistory('');

    let subtitle=''

    useEffect(() => {

        const uidLogin = localStorage.getItem('uidLogin')
        if (!uidLogin) {
            path.push('');
            return;
        }
        console.log(dbFirestore.doc('uid').get().then(e=> {if(e.exists){console.log(e)}}))
        setUserId(uidLogin);
        dbFirestore.doc(uidLogin).get().then(res => {
            setUrl(res.data().url)
            setPrenom(res.data().prenom)
            setNom(res.data().nom)
            setEmail(res.data().email);
            setRole(res.data().role);
        })
        
    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const notify = (msg) => toast(msg);

    const openModal=()=> {
        setIsOpen(true);
    }

    const afterOpenModal=()=> {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#fa0';
    }

    const closeModal=()=> {
        setIsOpen(false);
    }

    const edit=(val)=>{
        val.preventDefault();
        const e=dbFirestore.doc(userId).update({nom:nom,prenom:prenom});       
        e.then(r=> {  
            notify('Modifié')
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }
        );
      }

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
        <button className="follow butn btn-outline-warning" onClick={()=> {openModal()}} >Modifier</button>
        <button className="message butn d-none">Message</button>
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
        
      </div>
    </div>
  </div>


    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById('root')}
        contentLabel="Example Modal"
    >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='text-info'>Modifier </h2>
        

            <form className='border border-success' onSubmit={(e)=>edit(e)}>
                <fieldset >
                <div className="form-group">
                    <label htmlFor="disabledTextInput">Cours</label>
                    <input type="text" value={nom}  className="form-control" placeholder="Cours" onChange={(e)=>{setNom(e.target.value);console.log(e.target.value)}} />
                </div>
                
                    <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Details</label>
                    <textarea className="form-control" value={prenom} onChange={(e)=> setPrenom(e.target.value)} rows="3"></textarea>
                    </div>
                <div className="form-check">
                    
                </div>
                {(!nom) || (!prenom) ?(
                    <button type="submit" className="btn btn-primary disabled">Modifier</button>
                ):(
                    <button type="submit" className="btn btn-primary " >Modifier</button>
                )}
                <button type="submit" className="btn btn-danger m-2" onClick={closeModal}>Annuler</button>
                </fieldset>
            </form>
            
        
    </Modal>

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
</>
    )
}

export default UserCards
