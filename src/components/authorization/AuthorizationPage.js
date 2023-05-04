import Sign from './Sign';
import Registration from './Registration';
import UnregisteredCall from '../call/UnregisteredCall';

function AuthorizationPage() {

  return (
    <div id='authpage'>
      <ul>
        <li>
          <Sign/>
        </li>
        <li>
          <Registration/>
        </li>
        <li>
          <UnregisteredCall/>
        </li>
      </ul>
    </div>);
  }

export default AuthorizationPage;
  