import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Bounce, ToastContainer } from 'react-toastify';
// import { AuthContextProvider } from './context/authContext.jsx';
// import { AuthHandler } from './components/AuthHandler.jsx';
// import { Provider } from 'react-redux';
// import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <Provider store={store}> */}
        {/* <AuthHandler> */}
          <App />
        {/* </AuthHandler> */}
     {/* </Provider> */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />
  </StrictMode>,
)
