import axios from 'axios';
import '../../styles/authorization/Sign.css';
import { lkeMap, lkp, proxySign } from '../basic/backendUrl';
import { loginDao } from '../basic/dao';

function Sign(){
    return(
        <div id='signdiv'>
          <select size="1" id='signSelect' onClick={hideInputFields} defaultValue={'patient'}>
            <option id='empOption' value="employee">Вход для сотрудника</option>
            <option id='patOption' value="patient">Вход для пациента</option>
          </select>
          <div id='signForm'>
            <input type="text" id='login' placeholder = "Полис / Телефон"></input>
            <input type="password" id='pass' placeholder='Пароль'></input>
            <input type="button" value="Войти в личный кабинет" id='signBtn' hidden onClick={signOnClick}></input>
            <p className='errMsg' id = "errorMessage" hidden></p>
          </div>
        </div>
    )
  }

  //скрытие полей ввода
  function hideInputFields(){
    let val = document.getElementById('signSelect').value;
    let login = document.getElementById('login');
    document.getElementById("regForm").hidden = true;
    document.getElementById("signForm").hidden = false
    if(val=="employee"){
      login.placeholder = "Логин"
    }else if(val=="patient"){
      login.placeholder = "Полис / Телефон"
    }
  }

  function signOnClick(){
    loginDao.login = document.getElementById('login').value;
    loginDao.password = document.getElementById('pass').value;
    loginDao.role = document.getElementById('signSelect').value;
    
    axios.post(proxySign, loginDao)
    .then(response => {
      document.getElementById("errorMessage").hidden = true
      if(loginDao.role=="patient"){
        window.location.assign(lkp+'?authToken='+response.data)
      }else{
        window.location.assign(lkeMap+'?authToken='+response.data)
      }
    })
    .catch(error => {
      document.getElementById("errorMessage").textContent = error.response.data;
      document.getElementById("errorMessage").hidden = false
    })
  }

  function hideSignButton(){
    signBtn.hidden = login.value=="" || pass.value==""
  }

  function SignOnload(){
    const login = document.getElementById("login");
    const pass = document.getElementById("pass");
    pass.oninput=function(){hideSignButton()}
    login.oninput=function(){hideSignButton()}
  }

  export default Sign;
  export {SignOnload};