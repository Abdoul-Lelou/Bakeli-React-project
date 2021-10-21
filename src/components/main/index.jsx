import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {auth, db} from "../../firebase";
import img1 from '../../images/img1.jpg'
import './index.css';

const Main = () => {

  const [dataCours, setDataCours] = useState([])
  
  // let items=['papa','mamn','koto','diadia','leyga','papa','mamn','koto','papa','mamn','koto','diadia','leyga','papa','mamn','koto','diadia','leyga','papa','mamn','koto','diadia','leyga']
  

    useEffect(() => {
    const datas=[];
    const key=''
    db.ref('/cours').on('value', function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                // console.log(childData)
                datas.push(childData);
              });
              setDataCours(datas)
    });
                // .once('value')
                // .then(snapshot => {
                //   const data= snapshot.val();
                //   datas.push(data);
                //   datas.forEach((item)=>{
                //     console.log(item.key)
                //   })
                // setDataCours(datas)
                // });
    }, [])        
console.log(dataCours)

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
                               <span class="card-text">{cour}</span>
                                <small className="text-muted"></small>
                              </p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="card-body">
                              <p className="card-text">
                              <small className="text-muted">Last updated 3 mins ago</small>
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
