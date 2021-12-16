import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { dbProf, storageFirebase } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let urlImage=''; 

const Prof = () => {

    const [name, setName] = useState('');
    const [matiere, setMatiere] = useState('');
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState('');
    const [imgTab, setimgTab] = useState([])
    

    const route= useHistory();
    const notify = (msg) => toast(msg);

    useEffect(() => {
      const uid = localStorage.getItem('uidLogin');
			if (!uid) {
				route.push('')
			}
    }, [])

    const handleClick=(e)=>{
        e.preventDefault();
        let nbrCalls = 0;
        if(imageAsFile === '') {
          console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
          notify('ERREUR: image vide')
          return;
        }
        const uploadTask = storageFirebase.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        .on('state_changed', 
        (snapShot) => {
          
          snapShot.ref.getDownloadURL().then((url) => {
              nbrCalls++;
              setimgTab(url)
              
              if (nbrCalls >1) {
                addProf(name,matiere,url); 
                setImageAsUrl(url)
                  setTimeout(() => {
                    route.push('listProf')
                  }, 3000);
              }
              
            });
         
        },
       
      )  
    }


    const addProf=(nom,matieres,url)=>{
      dbProf.doc().set({nom,matieres,url},{merge:true}).then(resp=>{
        notify("Prof ajouté");
     })
    }

    const handleImageAsFile = (e) => {
        const images = e.target.files[0]
        setImageAsFile(images)
    }
  
      const handleFireBaseUpload = e => {
        e.preventDefault()
     
      // async magic goes here...
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        notify('ERREUR: image vide')
        return;
      }
      const uploadTask = storageFirebase.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      //initiates the firebase side uploading 
      // console.log(uploadTask.on('state_changed', (e)=> console.log(e.ref.getDownloadURL()
      // .then((url) => {
      //  console.log(url)
      // }))))
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        snapShot.ref.getDownloadURL()
        .then((url) => {
          setImageAsUrl(url)
        });
      }, (err) => {
        //catches the errors
        console.log(err)
        notify(err)
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

      const toInputUppercase = e => {
        if(e.target.value !==''){
          e.target.value = ("" + e.target.value.replace(/[^a-zA-Z ]/g, ""))[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
        } 
      }

    return (
        <>
            &nbsp;
            <form id="contact" onSubmit={(e)=> handleClick(e)}>
                <h6>AJOUTER UN PROF</h6>
                <fieldset>
                    <input placeholder=" Nom complet" type="text" tabIndex="2" value={name} required onChange={(e)=>setName(e.target.value)} onInput={toInputUppercase}/>
                    <label htmlFor="Nom" className='text-info'>Nom Complet</label>
                </fieldset>
                <fieldset>
                    <input placeholder=" Matiére" type="text" tabIndex="2" value={matiere} required onChange={(e)=>setMatiere(e.target.value)} onInput={toInputUppercase}/>
                    <label htmlFor="Matiére" className='text-info'>Matiére</label>
                </fieldset>
                
                {/* <input 
                  type="file"
                //   onChange={e=>handleImageAsFile(e)}
                  style={{width:'260px',display:'none'}}
                  
                /> */}

                    <label htmlFor="ppt" data-role="button" className='text-info' data-inline="true" data-mini="true" data-corners="false">Photo</label>
                    <input id="ppt" type="file" name="ppt"
                           multiple data-role="button" 
                           data-inline="true" data-mini="true" data-corners="false"
                           onChange={e=> handleImageAsFile(e)}
                           />

                <fieldset>
                    <button type="submit">Ajouter</button>
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
