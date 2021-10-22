import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {dbCours,dbArchive, db,dbFirestores} from "../../firebase";
import Swal from 'sweetalert2';
import img1 from '../../images/img1.jpg'
import './index.css';

const Main = () => {

  const [dataCours, setDataCours] = useState([]);
  const [search, setSearch] = useState('');

  const notify = (msg) => toast(msg);


    useEffect(() => {
        dbCours.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data)
          setDataCours(data);
        });
    }, [])        

    const archive=(id,cours,detail)=>{
      dbArchive.doc(id).set({cours,detail}).then(resp=>{
        notify('Archivé avec succés');
       dbFirestores.collection("cours")
       .doc(id)
       .delete()
       .then(() => notify('Deplacé avec succes')) // Document deleted
       .catch((error) => notify(error));
     })
    }

    const filterSearch=()=>{
      console.log(search);
        let dataSearch= [];
        dataCours.map((data,index)=>{
          data.cours= search?(
            dataSearch.push(data),
            console.log(dataSearch),
            setDataCours(dataSearch),
            console.log(dataCours)
          ):(null);
        })
    }


    return (
        <div className='mains'>
         
            <div className="search-box mb-2">
                <input type="text" className="search-input" placeholder="Search.." value={search} onChange={(e)=>setSearch(e.target.value)}/>

                <button className="search-button" onClick={()=>filterSearch()} >
                <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <h4  className='text-start'>Popular courses</h4>
            <div
              id="scrollableDiv"
              style={{
                height: 500,
                overflow: 'auto',
                // display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={5}
                // next={this.fetchMoreData}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {dataCours.map((cour, index) => (
                  
                  <div  key={index} className="pb-2">

                    <div className="card" style={{maxWidth: '500px'}}>
                        <div className="row no-gutters">
                          <div className="col ">
                            <img src={img1} className="card-img" alt="..."/>
                            <div className="card-body">
                              <p className="card-text text-center">
                               <span className="card-text">{cour.cours}</span>
                                <small className="text-muted"></small>
                              </p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="card-body">
                              <p className="card-text">
                                <small className="text-muted">
                                  <button className='btn btn-outline-warning' title='edit' onClick=''> <i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                  <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                  <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                  </div>
                ))}
              </InfiniteScroll>
            </div>

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


              <section class="modal" id="myModal1">
                <div class="modal__content">
                  <a href="#" class="modal__close" title="Close modal">&times;</a>
                  <h1>Modal content</h1>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus eu purus et rutrum. Donec rhoncus nisi sed tortor tempor, a pharetra purus suscipit. Integer venenatis luctus egestas. Aliquam ligula augue, convallis vitae semper vel, lobortis sed lacus. Nullam non ex eget diam rutrum scelerisque eu at quam. Curabitur lacinia, magna non ultrices blandit, lectus sem varius sem, tincidunt maximus augue lacus vel mauris. Nulla venenatis vulputate tortor, nec feugiat libero scelerisque eget. Fusce facilisis a massa ultrices sollicitudin. Donec vel consectetur mi. Aliquam facilisis dignissim libero, id euismod mauris ultrices id. Etiam feugiat, odio vitae fringilla commodo, augue ex volutpat sapien, vel iaculis lacus dolor eu ligula. Praesent vitae ex mattis, congue diam eget, semper odio. Nam urna erat, varius nec augue id, rhoncus fringilla ex. Maecenas sit amet tristique dui, dignissim egestas massa.
                  </p>
                </div>
              </section>
              <section class="modal" id="myModal2">
                <div class="modal__content">
                  <a href="#" class="modal__close" title="Close modal">&times;</a>
                  <h1>Modal content 2</h1>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus eu purus et rutrum. Donec rhoncus nisi sed tortor tempor, a pharetra purus suscipit. Integer venenatis luctus egestas. Aliquam ligula augue, convallis vitae semper vel, lobortis sed lacus. Nullam non ex eget diam rutrum scelerisque eu at quam. Curabitur lacinia, magna non ultrices blandit, lectus sem varius sem, tincidunt maximus augue lacus vel mauris. Nulla venenatis vulputate tortor, nec feugiat libero scelerisque eget. Fusce facilisis a massa ultrices sollicitudin. Donec vel consectetur mi. Aliquam facilisis dignissim libero, id euismod mauris ultrices id. Etiam feugiat, odio vitae fringilla commodo, augue ex volutpat sapien, vel iaculis lacus dolor eu ligula. Praesent vitae ex mattis, congue diam eget, semper odio. Nam urna erat, varius nec augue id, rhoncus fringilla ex. Maecenas sit amet tristique dui, dignissim egestas massa.
                  </p>
                </div>
              </section>
              <section class="main">
                <div class="container">
                  <a href="#myModal1" class="open-modal">
                    Open modal 1
                  </a>
                  <a href="#myModal2" class="open-modal">
                    Open modal 2
                  </a>
                </div>
                <footer>
                  <h1>Footer section</h1>
                </footer>
              </section>
        </div>
    )
}

export default Main
