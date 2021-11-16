import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { auth,dbFirestore} from "../../firebase";
import './index.css';


const Login = () => {

    const [email, setEmail] = useState('apprenant@gmail.com');
    const [password, setPassword] = useState('apprenant');
    const route = useHistory();


    const handleChange= e=>{
        e.preventDefault();
        const login =auth.signInWithEmailAndPassword(email,password);
        let roleUser=''; 
        return login.then(res=>{
            dbFirestore.doc(res.user.uid).get().then(result => {
                roleUser= result.data().role;
                localStorage.setItem('userRole', roleUser);
                route.push('/welcome');
            });


       })  
    }
       

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
        </div>   
    )
}

export default Login
