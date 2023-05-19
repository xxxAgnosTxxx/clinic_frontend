import Sign from './Sign';
import Registration from './Registration';
import UnregisteredCall from '../call/UnregisteredCall';
import '../../styles/authorization/AuthorizationPage.css'

function AuthorizationPage() {

  return (
    <div id='authpage'>
      <ul>
        <div className="lkContainer" id="authContainer">
          <div className='lkContainerItems'>
            <Sign/>
            <Registration/>
          </div>
          <div className='lkContainerItems'><UnregisteredCall/></div>
        </div>
      </ul>
    </div>);
  }

export default AuthorizationPage;
  