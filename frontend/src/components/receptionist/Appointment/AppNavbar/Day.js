import React from 'react'
import styled from 'styled-components'
import Popup from '../Popup'
import ModifyPopup from '../ModifyPopup'

function Day() {
  return (
    <div>
           <Wrapper
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive" id='tableresponsive32'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th></th>
                <th>Sunday 9 Feb</th>
               
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>9 AM</td>
                <td className=''><Popup/></td>
                

              </tr>
              <tr>
                <td className=''>10 AM</td>
                <td className='  '><p className='bg-secondary text-white'>Juber</p> <ModifyPopup/></td>
               

              </tr>
              <tr>
                <td className=''>11 AM</td>
                <td className='  '> <p className='bg-warning text-white'>Ram </p><ModifyPopup/></td>
             
              </tr>
              <tr>
                <td className=''>12 PM</td>
                <td className=''><Popup/></td>
              
              </tr>
              <tr>
                <td className=''>1 PM</td>
                <td className=''><p className=' bg-success text-white '>Rahul Kumar </p><ModifyPopup/></td>
               
              </tr>
              <tr>
                <td className=''>2 PM</td>
                <td className='  '><p className='bg-secondary text-white'>Juber</p> <ModifyPopup/></td>
            
              </tr>
              <tr>
                <td className=''>3 PM</td>
                <td className='  '> <p className='bg-warning text-white'>Ram </p><ModifyPopup/></td>
               
              </tr>
              <tr>
                <td className=''>4 PM</td>
                <td className=' '><p className='bg-danger text-white '>Umer </p><ModifyPopup/></td>
              
              </tr>
              <tr>
                <td className=''>5 PM</td>
                <td className=''><Popup/></td>
              
              </tr>
              <tr>
                <td className=''>6 PM</td>
                <td className=' '><p className='bg-success text-white '>Umer </p><ModifyPopup/></td>
              
              </tr>
              <tr>
                <td className=''>7 PM</td>
                <td className=''><Popup/></td>
              
              </tr>
              <tr>
                <td className='' >8 PM</td>
                <td className=' '><p className='bg-secondary text-white '>Umer </p><ModifyPopup/></td>
              
              </tr>
              <tr>
                <td className=''>9 PM</td>
                <td className=' '><p className='bg-danger text-white '>Umer </p><ModifyPopup/></td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </Wrapper>
    </div>
  )
}

export default Day
const Wrapper =styled.div`
 #app{
    width: 85rem;
  }
  #tableresponsive32{
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
