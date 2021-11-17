import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dbArchive, dbCours } from "../../firebase";
import './index.css';

const Cours = () => {

    const [cours, setCours] = useState('');
    const [detail, setDetail] = useState('');
    const [coursArchiches, setuoursArchiches] = useState('')
    const [btn, setBtn] = useState(false);
    const [dater, setDater] = useState('');
    const [coursStatus, setCoursStatus] = useState(false)
    const route= useHistory();

    useEffect(() => {
        if (cours.lenght >2) {
            setBtn(true)
        }
        getCours();
    }, [cours])

    const btnAdd=btn?(<button type="submit" disabled id="contact-submit">Ajouter</button>):(<button type="submit"  id="contact-submit">Ajouter</button>);

    const getCours=()=>{
      dbArchive.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
       setuoursArchiches(data);
      });
    }


    const handleClick=(e)=>{
        e.preventDefault();
    
        let dataCours= '',cpt=0;
        dbArchive.get().then((snapshot) => {
          const data = snapshot.docs.map((doc,index) => {
            dataCours = doc.data().cours;
            // console.log(doc.data().cours)
            if (cours === dataCours) {
              setCoursStatus(true)
            }
          });
          // console.log(data.length)
          if (!coursStatus) {
            console.log('ratée')
          } else {
            console.log('gagnée')
            dbCours.doc().set({cours,detail,dater}).then(resp=>{
              notify();
              setTimeout(()=>{
                route.push('/welcome');
              }, 3000)
           })
          }
         setuoursArchiches(data)
        //  console.log(data)
        });
        setCours('');
        setDetail('');
       
      
    }
    const notify = () => toast("Cours ajouté!");
    // const notifyFalse = (err) => toast(err);

    return (
        <div className=' mainDiv ml-4'>
        <form id="contact" onSubmit={handleClick}>
          <h6>AJOUTER UN COURS</h6>
          <fieldset>
            <input 
              placeholder=" Cours"
              type="text" 
              tabIndex="2"
              value={cours} 
              required 
              onChange={e=>setCours(e.target.value)}
            />

          </fieldset>
          <fieldset>
            <input placeholder=" detail" type="text" tabIndex="2" value={detail} required onChange={(e)=>setDetail(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder=" detail" type="date" tabIndex="2" value={dater} required onChange={(e)=>setDater(e.target.value)}/>
          </fieldset>
          <fieldset>
            {btnAdd}
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
      </div>
    )
}

export default Cours
