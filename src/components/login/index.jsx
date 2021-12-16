import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { auth,dbFirestore} from "../../firebase";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';


const Login = (props) => {

    const [email, setEmail] = useState('apprenant@gmail.com');
    const [password, setPassword] = useState('apprenant');
    const route = useHistory();

    const notify = (msg) => toast(msg);

    const handleChange= e=>{
        e.preventDefault();
        signInWithEmailAndPassword(email,password);
    }

    const signInWithEmailAndPassword = async (emailUser, passwordUser) => {
        let roleUser= '';
        try {
            await auth.signInWithEmailAndPassword(emailUser, passwordUser).then(res=>{
            localStorage.setItem('uidLogin', res.user.uid)  
            dbFirestore.doc(res.user.uid).get().then(result => {
                
                if (result.data() !== undefined) {
                    roleUser= result.data().role;
                    localStorage.setItem('userRole', roleUser);
                    route.push('/welcome');
                    notify('Bienvenue')  
                    return;  
                }
                notify('Utilisateur supprimé') 
            })
          })
        } catch (err) {
          notify(err.message) 
        }
    };
       

    return (
      
        <div className='main'>
            <div className="form" >
                <h2>Login</h2>
                <div className="input">
                    <div className="inputBox">
                        <label htmlFor="">Username</label>
                        <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="">Password</label>
                        <input type="password" onChange={e=> setPassword(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <input type="submit"  value="Sign In" onClick={handleChange} /> 
                    </div>
                </div>
                {/* <p className="forgot">Forgot Password? <a href="#">Click Here</a></p> */}
                
            </div>

            <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            bodyClassName="toastBody"
            />
            {/*  Affichage des notifications*/}
            {/* <ToastContainer /> */}

        </div>   
    )
}

export default Login
