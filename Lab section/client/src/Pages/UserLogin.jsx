import React from 'react';
import { useSelector } from 'react-redux';

function UserLogin() {
  // Access the user's name from the Redux store
  const userName = useSelector(state => state.auth.user);

  return (
    <div className="UserLogin">
      <h5 className='text-white'>Welcome {userName.employee_name} ({userName.employee_ID})</h5>
   
      {/* Other UserLogin content */}
    </div>
  );
}

export default UserLogin;
