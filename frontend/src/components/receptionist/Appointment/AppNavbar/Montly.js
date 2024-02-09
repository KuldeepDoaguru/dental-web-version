import React from 'react'
import Popup from '../Popup'
import ModifyPopup from '../ModifyPopup'
import styled from 'styled-components'

function Montly() {
  return (
    <Wrapper>
        <div
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive" id='tableresponsive12'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
               
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Web</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr >
    
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
                <td className=''>1<p className='bg-danger text-white '>Umer Qureshi</p><ModifyPopup/></td>
                <td className='  ' >2<p className='bg-success text-white'>Rajiv </p> <ModifyPopup/>    </td>
                <td  className='  '>3<p className='bg-danger text-white'>Ram</p>  <ModifyPopup/></td>
                <td className=' '>4<p className=' bg-primary text-white  '>Rahul Kumar</p> <ModifyPopup/></td>
                <td className=''>5<Popup/></td>
              </tr>
              <tr>
               
                <td className=' '>6<p className=' bg-danger text-white'>Juber </p><ModifyPopup/></td>
                <td className=' '>7<p className='bg-success text-white '>Umer</p> <ModifyPopup/></td>
                <td className=''>8<Popup/></td>
                <td className=''>9<Popup/></td>
                <td className='  '>10<p className='bg-warning text-white'>Rahul Kumar </p><ModifyPopup/></td>
                <td  className=' '>11<p className=' bg-success text-white '>Ishita </p><ModifyPopup/></td>
                <td className='  '> <p className='bg-danger text-white'>12</p>Ram <ModifyPopup/></td>
              </tr>
              <tr>
              
                <td className=' '>13 <p className=' bg-warning text-white'>Umer Qureshi</p> <ModifyPopup/></td>
                <td className=''>14<Popup/></td>
                <td className='  '>15<p className='bg-success text-white'></p>Rajiv <ModifyPopup/></td>
                <td className=''>16<Popup/></td>
                <td className=''>17<p className=' bg-secondary text-white '></p>Ram <ModifyPopup/></td>
                <td className=' '>18<p className='bg-danger text-white'>Rahul Kumar </p><ModifyPopup/></td>
                <td className=''>19<Popup/></td>
              </tr>
              <tr>
                
                <td className=''>20<Popup/></td>
                <td className=''>21<p className='bg-success text-white '>Juber </p><ModifyPopup/></td>
                <td  className='  '>22<p className='bg-success text-white'>Umer </p><ModifyPopup/></td>
                <td className=''>23<Popup/></td>
                <td className='  '> 24<p className='bg-warning text-white'>Ram </p><ModifyPopup/></td>
                <td  className=' '>25<p className='bg-success text-white'>Ishita </p><ModifyPopup/></td>
                <td className=''>26<p className=' bg-danger text-white '>Rahul Kumar </p><ModifyPopup/></td>
              </tr>
              <tr>
                
                <td className='  '>27<p className='bg-secondary text-white'>Juber</p> <ModifyPopup/></td>
                <td className=''>28<p className=' bg-success text-white '>Rahul Kumar </p><ModifyPopup/></td>
                <td className=''>29<Popup/></td>
                <td className=''>30<Popup/></td>
                <td className=' '>31<p className='bg-danger text-white '>Umer </p><ModifyPopup/></td>
                <td className=''><Popup/></td>
                <td className=''><Popup/></td>
             
              </tr>
            
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  )
}

export default Montly
const Wrapper = styled.div`
  #app{
    width: 85rem;
  }
  #tableresponsive12{
    width: 102%;
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
