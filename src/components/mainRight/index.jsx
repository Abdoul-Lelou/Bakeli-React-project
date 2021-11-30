import React,{useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import img1 from '../../images/img1.jpg'
import './index.css';

const MainRight = () => {

    const [value, setCalendar] = useState(new Date());
  

    const tileClassName=({ date, view })=> {
        // Add class to tiles in month view only
  
        if (view === 'month') {
            setCalendar()
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
        //   if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
        //     return 'myClassName';
        //   }
        }
      }

    return (
        <div className='mainRight border border-success'>
            
            
            <Calendar
                onChange={setCalendar}
                value={value}
                className='calend w-75 m-2 mx-4 calendar'
               
                tileClassName={tileClassName}
                defaultActiveStartDate={new Date()}
                style={{border: 'none'}}
            />
           
            <div className='right-bar'>
              <h6>About Teacher</h6>

            <div class="cards">
                <div class="middle-container d-flex justify-content-between align-items-center ">
                    <div class="dollar-div px-3">
                        <div class="round-div">
                          <i class="fa fa-dollar dollar"> </i>
                        </div>
                    </div>
                    <div class="col">
                      Mr Diatta
                    <p className="card-text bg-light">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </p>
                    </div>
                </div>
                
            </div>

                  <div className="row row-cols-2 mx-0 mb-4 mt-2">

                      {/* <div className="card" style={{maxWidth: '150px', maxHeight:'80px'}}>
                        <div className="row ">
                          <div className="col ">
                            <img src={img1} className="card-img" alt="..."/>
                            <div className="card-body">
                              <p className="card-text text-center">
                               <span className="card-text">Card title</span>
                                <small className="text-muted">  </small>
                              </p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="card-body">
                              <p className="card-text">
                               
                              </p>
                            </div>
                          </div>
                        </div>
                      </div> */}

                   <div className='p-0 border border-success'>
                        <div class="card">
                            <div class="middle-container d-flex justify-content-between align-items-center ">
                                <div class="dollar-div px-3">
                                    <div class="round-div">
                                      <i class="fa fa-dollar dollar"> </i>
                                    </div>
                                </div>
                                <div class="col">
                                  Mr Diatta
                                <p className="card-text">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                      <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </p>
                                </div>
                            </div>
                            
                        </div>
                   </div>
                   <div className='p-0 border border-success'>
                        <div class="card">
                            <div class="middle-container d-flex justify-content-between align-items-center ">
                                <div class="dollar-div">
                                    <div class="round-div">
                                      <i class="fa fa-dollar dollar"> </i>
                                    </div>
                                </div>
                                <div class="col">
                                  Mr Diatta
                                <p className="card-text">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                      <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </p>
                                </div>
                            </div>
                            
                        </div>
                   </div>
                  

               </div>
            </div>         
        </div>
    )
}

export default MainRight
