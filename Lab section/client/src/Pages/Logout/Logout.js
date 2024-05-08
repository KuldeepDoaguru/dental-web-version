import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/user/userSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    // Display a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to log out?');

    // If user confirms, dispatch the logout action and redirect
    if (confirmed) {
      dispatch(logoutUser());
      navigate('/');
    }
  };

  return (
    <button className='btn btn-success' onClick={handleLogout}>Logout</button>
  
  )
}

export default Logout