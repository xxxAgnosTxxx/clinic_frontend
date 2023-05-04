import axios from 'axios';
import '../../styles/authorization/Sign.css';

const loginDao = {
  login:"",
  password:"",
  role:"",
}

const proxy = "http://localhost:10023/v1/authorization/signIn"

function Sign(){
    return(
        <div id='signdiv'>
          <select size="1" id='signSelect' onClick={hideInputFields} defaultValue={'default'}>
            <option disabled value="default">Войти в систему</option>
            <option id='empOption' value="employee">Вход для сотрудника</option>
            <option id='patOption' value="patient">Вход для пациента</option>
          </select>
          <div id='signForm' hidden={true}>
            <input type="text" id='login'></input>
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
    if(val!="default"){
      document.getElementById('signForm').hidden = false;
      document.getElementById("regForm").hidden = val!="default";
    }
    if(val=="employee"){
      login.placeholder = "Логин"
    }else if(val=="patient"){
      login.placeholder = "Номер ИНН"
    }
  }

  function signOnClick(){
    loginDao.login = document.getElementById('login').value;
    loginDao.password = document.getElementById('pass').value;
    loginDao.role = document.getElementById('signSelect').value;
    
    axios.post(proxy, loginDao)
    .then(response => {
      document.getElementById("errorMessage").hidden = true
      if(loginDao.role=="patient"){
        window.location.assign('http://localhost:3000/lkp?authToken='+response.data)
      }else{
        window.location.assign('http://localhost:3000/lke/map?authToken='+response.data)
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