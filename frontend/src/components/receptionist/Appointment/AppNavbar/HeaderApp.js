import React from 'react'
import ModifyPopup from '../ModifyPopup'
import Popup from '../Popup'
import Montly from './Montly'
import Day from './Day';
import styled from 'styled-components';

function HeaderApp() {
  return (
    <Wrapper>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
              Week
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                 Montly
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane1"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane1"
                aria-selected="false"
              >
                Day
              </button>
            </li>
          
            
            
            

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
                <ul className="list-group">
                <div
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive" id='tableresponsive'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th></th>
                <th>Sun,9 Feb</th>
                <th>Mon,10 Feb</th>
                <th>Tue,11 Feb</th>
                <th>Web,12 Feb</th>
                <th>Thu,13 Feb</th>
                <th>Fri,14 Feb</th>
                <th>Sat,15 Feb</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>9 AM</td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-danger text-white '>Umer Qureshi<ModifyPopup/></td>
                <td className=' bg-success text-white ' >Rajiv  <ModifyPopup/>    </td>
                <td  className=' bg-danger text-white '> Ram <ModifyPopup/></td>
                <td className='  bg-primary text-white  '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
              </tr>
              <tr>
                <td className=''>10 AM</td>
                <td className=' bg-danger text-white '>Juber <ModifyPopup/></td>
                <td className=' bg-success text-white '>Umer <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-warning text-white '>Rahul Kumar <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Ishita <ModifyPopup/></td>
                <td className=' bg-danger text-white '>Ram <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>11 AM</td>
                <td className=' bg-warning text-white '>Umer Qureshi <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-success text-white '>Rajiv <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-secondary text-white '>Ram <ModifyPopup/></td>
                <td className=' bg-danger text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
              </tr>
              <tr>
                <td className=''>12 PM</td>
                <td className=''><Popup/></td>
                <td className=' bg-success text-white '>Juber <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Umer <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-warning text-white '>Ram <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Ishita <ModifyPopup/></td>
                <td className=' bg-danger text-white '>Rahul Kumar <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>1 PM</td>
                <td className=' bg-secondary text-white '>Juber <ModifyPopup/></td>
                <td className=' bg-success text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-danger text-white '>Umer <ModifyPopup/></td>
                <td className=' bg-secondary text-white '>Ishita <ModifyPopup/></td>
                <td className=' bg-success text-white '>Ram <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>2 PM</td>
                <td className=''> <Popup/></td>
                <td className=' bg-warning text-white '>Rajiv <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Umer Qureshi <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-secondary text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=' bg-secondary text-white '>Ram <ModifyPopup/></td>
                <td className=''><Popup/></td>
              </tr>
              <tr>
                <td className=''>3 PM</td>
                <td className=' bg-secondary text-white '>Juber <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Ram <ModifyPopup/></td>
                <td className=' bg-success text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-danger text-white '>Ishita <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Umer <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>4 PM</td>
                <td className=' bg-danger text-white '>Umer <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-warning text-white '>Ram <ModifyPopup/></td>
                <td className=' bg-secondary text-white '>Rahul Kumar <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Juber <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-warning text-white '>Ishita <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>5 PM</td>
                <td className=''><Popup/></td>
                <td className=' bg-secondary text-white '>Rajiv <ModifyPopup/></td>
                <td className='  bg-primary text-white  '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className='  bg-primary text-white  '>Ram <ModifyPopup/></td>
                <td className=' bg-success text-white '>Umer Qureshi <ModifyPopup/></td>
                <td className=''><Popup/></td>
              </tr>
              <tr>
                <td className=''>6 PM</td>
                <td className='  bg-primary text-white  '>Juber <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-warning text-white '>Ram <ModifyPopup/></td>
                <td className=' bg-warning text-white '>Umer <ModifyPopup/></td>
                <td  className=' bg-success text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-success text-white '>Ishita <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>7 PM</td>
                <td className=''><Popup/></td>
                <td className=' bg-secondary text-white '>Umer Qureshi <ModifyPopup/></td>
                <td  className=' bg-danger text-white '>Rajiv <ModifyPopup/></td>
                <td className='  bg-primary text-white  '>Ram <ModifyPopup/></td>
                <td  className=' bg-secondary text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
              </tr>
              <tr>
                <td className='' >8 PM</td>
                <td className=' bg-secondary text-white '>Juber <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-success text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=' bg-secondary text-white '>Ram <ModifyPopup/></td>
                <td  className=' bg-secondary text-white '>Umer <ModifyPopup/></td>
                <td className='  bg-primary text-white  '>Ishita <ModifyPopup/></td>
              </tr>
              <tr>
                <td className=''>9 PM</td>
                <td className=' bg-secondary text-white '>Juber <ModifyPopup/></td>
                <td className=' bg-warning text-white '>Umer <ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
                <td  className=' bg-secondary text-white '>Rahul Kumar <ModifyPopup/></td>
                <td className=' bg-success text-white '>Ram <ModifyPopup/></td>
                <td className=' bg-secondary text-white '>Ishita <ModifyPopup/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0"
              >
                <ul className="list-group">
                  <li className="list-group-item" id='app'>
                <Montly/>
                  </li>
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane1"
                role="tabpanel"
                aria-labelledby="profile-tab1"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item" id='app'>
                <Day/>
                  
   
                  </li>
                  

                </ul>
              </div>
             
              
            
            </div>
          </ul> 
    </Wrapper>
  )
}

export default HeaderApp
const Wrapper = styled.div`
  #app{
    width: 80rem;
  }
  #tableresponsive{
    width: 85%;
    @media screen and (max-width: 768px) {
      width: 73%;
      
    }
  } 
 
  #myTab{
     @media screen and (max-width: 768px) {
      width: 90%;
      margin-left: 1.2rem;
      
    }
  }
`
