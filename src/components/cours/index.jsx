import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dbArchive, dbCours, storageFirebase } from "../../firebase";
import './index.css';

const Cours = () => {

    const [cours, setCours] = useState('');
    const [detail, setDetail] = useState('');
    const [coursArchiches, setuoursArchiches] = useState('')
    const [btn, setBtn] = useState(false);
    const [date, setDater] = useState('');
    const [coursStatus, setCoursStatus] = useState(false);
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState('')
    const route= useHistory();

    useEffect(() => {
        const uid = localStorage.getItem('uidLogin');
        if (!uid) {
          route.push('')
        }
        if (cours.lenght >2) {
            setBtn(true)
        }
        getCours();
    }, [cours])

    const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(image)
      console.log(image)
    }

    const handleFireBaseUpload = e => {
      e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if(imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storageFirebase.put(imageAsFile)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      // storageFirebase.child(imageAsFile.name).getDownloadURL()
      //  .then(fireBaseUrl => {
      //    setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}));
      //    console.log(fireBaseUrl)
      //  })
    })
    }

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
              dataCours='';
            }
          });
  
          if (!!coursStatus) {
            return
          } else {
            console.log('gagnée')
            dbCours.doc().set({cour:cours,detail,date},{merge:true}).then(resp=>{
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

    const toInputUppercase = e => {
      if(e.target.value !==''){
        e.target.value = ("" + e.target.value.replace(/[^a-zA-Z ]/g, ""))[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
      } 
    }
    // const notifyFalse = (err) => toast(err);

    return (
        <>
        &nbsp;
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
              onInput={toInputUppercase}
            />
            <label htmlFor="Cour" className='text-info'>Cour</label>

          </fieldset>
          <fieldset>
            <input placeholder=" detail" type="text" tabIndex="2" value={detail} required onChange={(e)=>setDetail(e.target.value)} onInput={toInputUppercase}/>
            <label htmlFor="Details" className='text-info'>Details</label>
          </fieldset>
          <fieldset>
            <input placeholder=" detail" type="date" tabIndex="2" value={date} required onChange={(e)=>setDater(e.target.value)} />
          </fieldset>
          <fieldset>

             
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
      </>
    )
}

export default Cours
