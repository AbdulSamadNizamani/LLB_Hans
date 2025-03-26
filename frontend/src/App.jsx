
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import NotFound from './Components/NotFound'
import Posts from './Components/Posts'
import GetNates from './Components/GetNates'
import UploadNotes from './Components/UploadNotes'
import Admin from './Components/Admin'
import Manager from './Components/Manager'
import Profile from './Components/Profile'
import SignUp from './Components/SignUp'
import ShowNotes from './Components/ShowNotes'
import Login from './Components/Login'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import AdminInfo from './Components/AdminInfo'
import DynamicRoute from './Components/DynamicRoute'
import PostDynamicRoute from './Components/PostDynamicRoute'
function App() {
  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter className={`bg-black`}>
      <Navbar className={'z-50'}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post' element={<Posts/>}/>
        <Route path="/post/:movieID" element={<DynamicRoute />} />
        <Route path='/posttext/:id' element={<PostDynamicRoute/>}/>
        <Route path='/getnotes' element={<GetNates/>}/>
        <Route path='/uploadsnotes' element={<UploadNotes/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/manager' element={<Manager/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/shownotes' element={<ShowNotes/>}/>
        <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
        <Route path='/info' element={<AdminInfo/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
