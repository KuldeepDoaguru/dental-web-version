import React from 'react'
import Popup from './Popup'
import EditPopup from './EditPopup'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DeletePopup from './DeletePopup'

function ModifyPopup() {
  return (
    <Wrapper>
   <div className="container">
   <form className='d-flex  mt-3'>
  <div class="b1 text-white">

 <EditPopup/>
   
  </div>
  <div class=" b1 mt-2">
  /
  </div>
  <div class="b text-white">
<DeletePopup/>
  </div>
  
</form>
   </div>
    </Wrapper>
  )
}

export default ModifyPopup
const Wrapper = styled.div`

  

.b{
    text-decoration: none;
  }
  .b:hover{
  text-decoration-line: underline;
  
  

  }
  .b1{
    text-decoration: none;
    margin-top:   0.1rem;
  }
  .b1:hover{
  text-decoration-line: underline;
  
  

  }
`
