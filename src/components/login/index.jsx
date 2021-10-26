import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { auth,dbFirestore, dbFirestores } from "../../firebase";
import './index.css';


const Login = () => {

    const [email, setEmail] = useState('apprenant@gmail.com');
    const [password, setPassword] = useState('apprenant');
    const route = useHistory();


    const handleChange= e=>{
        e.preventDefault();
        // setUsername(e.target.value)
       const login =auth.signInWithEmailAndPassword(email,password);

       return login.then(res=>{
           let roleUser;
            dbFirestore.get().then((snapshot) => {
             snapshot.docs.map((doc) => {
                //   id: doc.id,
                //   ...doc.data(),
                roleUser = doc.data().role;
                });
                console.log(roleUser)
              });


        // route.push("/welcome");
        //  console.log(logFirestore)
       })

       const { user } = login; 

    //    const logFirestore=  dbFirestore.doc(user.uid).set({email});

    //    console.log(login.then(res=> console.log(res.user.uid)));
        
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
                <p className="forgot">Forgot Password? <a href="#">Click Here</a></p>
                
            </div>
        </div>   
    )
}

export default Login
