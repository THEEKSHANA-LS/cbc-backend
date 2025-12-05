import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/loginPage.jsx';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/registerPage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from './pages/forgetPassword.jsx';
import AccountSettings from './pages/settings.jsx';

function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="">
      <div className="lg:hidden fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        </div>
      </div>
       <div className="w-full h-[100vh]"> 

       <Toaster position="top-center"/>

        <Routes path="/">
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/account-settings" element={<AccountSettings/>}/>
          <Route path="/test" element={<TestPage/>}/>
        </Routes>
       </div>
       </div>
      </GoogleOAuthProvider>;
    </BrowserRouter>
  )
}

export default App;


