import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthorizationPage from './components/authorization/AuthorizationPage';
import { RegistrationOnload } from './components/authorization/Registration';
import { SignOnload } from './components/authorization/Sign';
import LkPatient from './components/lk/LkPatient';
import CallHistory from './components/call/CallHistory';
import CustomMap from './components/map/Map';
import EmpCallHistory from './components/call/EmpCallHistory';

const pathname = window.location.pathname

function App() {
  return (
  <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<AuthorizationPage/>}/>
          <Route path='/lkp' element={<LkPatient/>}/>
          <Route path='/lkp/history' element={<CallHistory/>}/>
          <Route path='/lke/map' element={<CustomMap/>}/>
          <Route path='/lke/history' element={<EmpCallHistory/>}/>
        </Routes>
      </div>
  </BrowserRouter>);
}

window.onload = function() {
  if(pathname=='/'){
    RegistrationOnload();
    SignOnload();
  }
}

export default App;