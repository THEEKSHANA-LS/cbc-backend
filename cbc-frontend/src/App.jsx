import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/loginPage.jsx';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/registerPage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from './pages/forgetPassword.jsx';

function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
       <div className="w-full h-[100vh]"> 

       <Toaster position="top-center"/>

        <Routes path="/">
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/test" element={<TestPage/>}/>
        </Routes>

       </div>
      </GoogleOAuthProvider>;
    </BrowserRouter>
  )
}

export default App;


