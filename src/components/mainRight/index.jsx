import React,{useEffect, useRef, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

const MainRight = ({nom,prenom,url,prof,user,cour}) => {

    const [value, setCalendar] = useState(new Date());
    // const [timeValue, setTimeValue] = useState('')
    // const ref = useRef(null)
  
     useEffect(() => {
       const uid = localStorage.getItem('uidLogin')
       if (!uid) {
         return false;
       }
       
        return () => {
          // showTime();
        }
     },[]) 

  

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

  //   const showTime=()=>{
  //     var date = new Date();
  //     var h = date.getHours(); // 0 - 23
  //     var m = date.getMinutes(); // 0 - 59
  //     var s = date.getSeconds(); // 0 - 59
      
  //     if(h === 0){
  //         h = 12;
  //     }
      
  //     if(h > 24){
  //         h = h - 12;
  //     }
      
  //     h = (h < 10) ? "0" + h : h;
  //     m = (m < 10) ? "0" + m : m;
  //     s = (s < 10) ? "0" + s : s;
      
  //     let time = h + ":" + m + ":" + s + " " ;
  //     setTimeValue( time);
      
  //     setTimeout(showTime, 1000);
      
  // }

    return (
        <div className='mainRight   border border-success'>
            
           
                <Calendar
                    onChange={setCalendar}
                    value={value}
                    className='calend m-4 p-3'
                    minDate={new Date()}
                    next2Label={null}
                    prev2Label={null}
                    showNavigation={true}
                    tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0}
                    // onClickDay={(v,e)=>(console.log(v))}
                    tileClassName={tileClassName}
                    defaultActiveStartDate={new Date()}

                    
                />
              
                <div className='right-bar m-4'>
                      <h6 className='w-50 text-start'>About Teacher</h6>

                      <div className="item p-2">
                        <div className="card" style={{backgroundColor:'transparent',border: '0px', }}>
                            <div 
                              className="middle-container d-flex   w-100  p-0 m-0" id='widthContainer'
                              
                            >
                                    <img src={url} alt="vide" srcSet="" style={{maxHeight:'55px', padding:'0', margin:'0'}}/>

                                <span className="colTextName p-0 ">
                                    <> {prenom} {nom} </> <br />
                                    <span className="fa fa-star checked" id='fa'></span>
                                    <span className="fa fa-star checked" id='fa'></span>
                                    <span className="fa fa-star checked" id='fa'></span>
                                    <span className="fa fa-star"></span>
                                
                                </span>
                            </div>
                            
                        </div>
                      </div>

                      <div className="row row-cols-2 ">
                          <div className="containerBoxFlex ">
                            <div className="card" >
                                <p className='text'>
                              Apprenants
                              <br />
                                  Nombres</p>
                                {user.length}
                              </div>
<hr />
                              <div className="card" >
                                <p className='text'>
                              Apprenants
                              <br />
                                  Nombres</p>
                                  {user.length}
                              </div>
                          </div>
                        
                          <div className="containerBoxFlex ">
                            <div className="card">
                           
                              <p className='text'>
                              Profs <br />
                                Nombres</p>
                              {prof.length}
                            </div>
<hr />
                            <div className="card" >
                              <p className='text'>
                            Cours <br />
                                
                                Nombres</p>
                              {cour.length}
                            </div>
                          </div>

                          
                      
                      </div>
                </div> 
            
                    
        </div>
    )
}

export default MainRight
