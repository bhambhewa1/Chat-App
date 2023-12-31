import React from 'react'
import { ToastContainer } from 'react-toastify'
// import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.css'; 

const Toastify = () => {
  return (
    <div>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            // toastStyle={customToast}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
  )
}

export default Toastify