import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { dbProf } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Prof = () => {

    const [name, setName] = useState('');
    const [matiere, setMatiere] = useState('');

    const route= useHistory();
    const notify = () => toast("Prof ajouté");

    const handleClick=(e)=>{
        e.preventDefault();

        dbProf.doc().set({name,matiere}).then(resp=>{
            notify();
            setTimeout(()=>{
              route.push('/listprof');
            }, 3000)
         })
         setName('');
         setMatiere('');
    }

    return (
        <>
            &nbsp;
            <form id="contact" onSubmit={(e)=> handleClick(e)}>
                <h6>AJOUTER UN PROF</h6>
                <fieldset>
                    <input placeholder=" Nom complet" type="text" tabIndex="2" value={name} required onChange={(e)=>setName(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <input placeholder=" Matiére" type="text" tabIndex="2" value={matiere} required onChange={(e)=>setMatiere(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <button type="submit">ajouter</button>
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
            {/* Same as */}
            <ToastContainer />
        </>
    )
}

export default Prof
