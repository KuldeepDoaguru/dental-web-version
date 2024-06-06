// import React from 'react';
// import styled from 'styled-components';

// const LoadingWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
//   background-color: white; /* Adjust the background as needed */
//   /* In your CSS file or styled-components */
// .spinner {
//   border: 16px solid #f3f3f3;
//   border-top: 16px solid #3498db;
//   border-radius: 50%;
//   width: 120px;
//   height: 120px;
//   animation: spin 2s linear infinite;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

// `;

// const Loading = () => {
//   return (
//     <LoadingWrapper>
//       <div className="spinner"></div> {/* Customize this with your spinner/loader */}
//     </LoadingWrapper>
//   );
// };

// export default Loading;

// Loading.js
import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200; /* Ensure it's on top of other content */

  .spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <div className="spinner"></div> {/* Customize this with your spinner/loader */}
    </LoadingWrapper>
  );
};

export default Loading;