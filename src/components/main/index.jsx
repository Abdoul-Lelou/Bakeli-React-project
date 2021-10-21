import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {dbCours} from "../../firebase";
import Swal from 'sweetalert2';
import img1 from '../../images/img1.jpg'
import './index.css';

const Main = () => {

  const [dataCours, setDataCours] = useState([])


    useEffect(() => {
        dbCours.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataCours(data);
        });
    }, [])        




    return (
        <div className='mains'>
         
            <div className="search-box mb-2">
                <input type="text" className="search-input" placeholder="Search.." />

                <button className="search-button">
                <i class="fa fa-search" aria-hidden="true"></i>
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
                               <span class="card-text">{cour.cours}</span>
                                <small className="text-muted"></small>
                              </p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="card-body">
                              <p className="card-text">
                                <small className="text-muted">
                                  <button className='btn btn-outline-warning' title='edit' onClick=''> <i class="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                  <button className='btn btn-outline-primary' title='archive'> <i class="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                  <button className='btn btn-outline-success' title='detail'> <i class="fa fa-info-circle" aria-hidden="true"></i></button>
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
        </div>
    )
}

export default Main
