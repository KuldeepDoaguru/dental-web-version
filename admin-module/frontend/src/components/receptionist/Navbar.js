
import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="d-md-none navbar-brand" href="#">Dental Guru</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
        <form className="d-flex ms-auto my-sm" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
          <li className="nav-item">
            <a className="nav-link " aria-current="page" href="#"><i className="fs-4 bi bi-bell-fill"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link " aria-current="page" href="#"><i class="fs-4 bi bi-calendar2-week"></i></a>
          </li>
          <li className="nav-item">
           
                    <a href="#" className="nav-link">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle"/>
                       
                    </a>
                   
            
          </li>
        
          
        </ul>
      </div>
    
    </div>
  </nav>
 
  )
}

export default Navbar

 