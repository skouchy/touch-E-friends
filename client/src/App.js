import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AddressBook from './pages/AddressBook'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ImageSearch from './pages/ImageSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/address' element={<AddressBook/>}/>
          <Route path='/imagesearch' element={<ImageSearch/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;