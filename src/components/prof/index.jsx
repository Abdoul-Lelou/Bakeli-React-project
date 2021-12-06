import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { dbProf, storageFirebase } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Prof = () => {

    const [name, setName] = useState('');
    const [matiere, setMatiere] = useState('');
    const [imageAsFile, setImageAsFile] = useState('')
    const [image, setImageAsUrl] = useState('')

    const route= useHistory();
    const notify = (msg) => toast(msg);

    const handleClick=(e)=>{
        e.preventDefault();

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
            console.log(image)
          });
          console.log(snapShot)
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

        dbProf.doc().set({name,matiere,image}).then(resp=>{
            notify("Prof ajouté");
            setTimeout(()=>{
              route.push('/listprof');
            }, 3000)
         })
         setName('');
         setMatiere('');
    }

    const handleImageAsFile = (e) => {
        const images = e.target.files[0]
        setImageAsFile(images)
        console.log(images)
      }
  
      // const handleFireBaseUpload = e => {
      //   e.preventDefault()
      // console.log('start of upload')
      // // async magic goes here...
      // if(imageAsFile === '') {
      //   console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      //   notify('ERREUR: image vide')
      //   return;
      // }
      // const uploadTask = storageFirebase.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      // //initiates the firebase side uploading 
      // // console.log(uploadTask.on('state_changed', (e)=> console.log(e.ref.getDownloadURL()
      // // .then((url) => {
      // //  console.log(url)
      // // }))))
      // uploadTask.on('state_changed', 
      // (snapShot) => {
      //   //takes a snap shot of the process as it is happening
      //   snapShot.ref.getDownloadURL()
      //   .then((url) => {
      //     setImageAsUrl(url)
      //     console.log(image)
      //   });
      //   console.log(snapShot)
      // }, (err) => {
      //   //catches the errors
      //   console.log(err)
      //   notify(err)
      // }, () => {
      //   // gets the functions from storage refences the image storage in firebase by the children
      //   // gets the download url then sets the image from firebase as the value for the imgUrl key:
      //   // storageFirebase.child(imageAsFile.name).getDownloadURL()
      //   //  .then(fireBaseUrl => {
      //   //    setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}));
      //   //    console.log(fireBaseUrl)
      //   //  })
      // })
      // }

    return (
        <>
            &nbsp;
            <form id="contact" onSubmit={(e)=> handleClick(e)}>
                <h6>AJOUTER UN PROF</h6>
                <fieldset>
                    <input placeholder=" Nom complet" type="text" tabIndex="2" value={name} required onChange={(e)=>setName(e.target.value)}/>
                    <label htmlFor="Nom">Nom Complet</label>
                </fieldset>
                <fieldset>
                    <input placeholder=" Matiére" type="text" tabIndex="2" value={matiere} required onChange={(e)=>setMatiere(e.target.value)}/>
                    <label htmlFor="Matiére">Matiére</label>
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
