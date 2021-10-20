import React,{useState} from 'react';
import './index.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);    
        // try {
        //   const result = await auth.signInWithEmailAndPassword(email, password);
          
        //   const { user } = result; 
    
        //    const logFirestore= await dbFirestore.doc(user.uid).set({email});
          
        //   console.log(logFirestore);
    
        //       dispatch({
        //         type: "LOGGED_IN_USER",
        //         payload: {
        //           name:user.displayName ? user.displayName :user.email.split('@')[0],
        //           email:user.email,
        //         },
        //       });
        //    history.push("user/history")
       
    }

    const handleChange= e=>{
        setUsername(e.target.value)
        console.log(username)
    }
        

    return (
      
        <div className='main'>
            <div className="form" onSubmit={handleSubmit} >
                <h2>Login</h2>
                <div className="input">
                    <div className="inputBox">
                        <label for="">Username</label>
                        <input type="text" onChange={()=> handleChange}/>
                    </div>
                    <div className="inputBox">
                        <label for="">Password</label>
                        <input type="password" onChange={e=> setPassword(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <input type="submit" name="" value="Sign In" /> 
                    </div>
                </div>
                <p className="forgot">Forgot Password? <a href="#">Click Here</a></p>
                
            </div>
        </div>   
    )
}

export default Login
