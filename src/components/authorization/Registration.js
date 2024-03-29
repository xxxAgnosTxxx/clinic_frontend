import axios from 'axios';
import '../../styles/authorization/Registration.css'
import { validNum, validString } from "../basic/basicFunctions";
import { lkp, proxyRegister } from '../basic/backendUrl';
import { personDao } from '../basic/dao';

function Registration(){
  return(
    <div id='regDiv'>
      <button id='regBtn' className='regBtn' onClick={()=>regBtnOnClick()} title='Зарегистрированный пользователь может совершать вызов без подтверждения оператора'>Регистрация для пациента</button>
      <div id='regForm' hidden='true'>
        <input type="text" className='regData' id='surname' placeholder='Фамилия' />
        <input type="text" className='regData' id='iname' placeholder='Имя'/>
        <input type="text" className='regData' id='patron' placeholder='Отчество'/>
        <div id='regSex'>
          <h4>Пол</h4>
          <input type='radio' id='regman' name='gender'/><label>Мужской</label>
          <input type='radio' id='regwomen' name='gender'/><label>Женский</label>
        </div>
        <input type="text" className='regData' id='phone' placeholder='Телефон'/>
        <input type="email" className='regData' id='mail' placeholder='Почта'></input>
        <div><input type="checkbox" id='opd'/><label>Согласие на обработку</label><br/><label>персональных данных</label></div>
        <input type="button" value="Зарегистрироваться" id='regBtn2' className='regBtn' hidden onClick={()=>regOnClick()}></input>
        <p className='errMsg' id = "errorMessage1"></p>
      </div>
    </div>)
  }

function regOnClick(){
  personDao.surname = document.getElementById("surname").value;
  personDao.name = document.getElementById("iname").value;
  personDao.patronymic = document.getElementById("patron").value;
  personDao.role = "patient";
  personDao.phone = document.getElementById("phone").value;
  personDao.mail = document.getElementById("mail").value;
  if(document.getElementById("regwomen").checked){
    personDao.sex = false
  }else{
    personDao.sex = true
  }
  console.log(personDao)
  axios.post(proxyRegister, personDao)
  .then(response => {
    document.getElementById("errorMessage1").textContent = "";
    window.location.assign(lkp+'?authToken='+response.data);
  })
  .catch(error => {
    document.getElementById("errorMessage1").textContent = error.response.data;
  })
}

function hideRegButton2(){
  regBtn2.hidden = surname.value=="" || iname.value=="" || patron.value=="" || phone.value=="" || mail.value=="" || !opd.checked
  || (!regman.checked && !regwomen.checked)
}

function regBtnOnClick(){
  document.getElementById("regForm").hidden = !document.getElementById("regForm").hidden;
  document.getElementById("signForm").hidden = true;
}

function RegistrationOnload() {
  // скрытие/открытие кнопок при вводе информации в поля
  surname.oninput=function(){
    validString("surname")
    hideRegButton2()
  }
  iname.oninput=function(){
    validString("iname")
    hideRegButton2()
  }
  patron.oninput=function(){
    validString("patron")
    hideRegButton2()
  }
  phone.oninput=function(){
    validNum("phone")
    hideRegButton2()
  }
  mail.oninput=function(){
    hideRegButton2()
  }
  regman.oninput=function(){
    hideRegButton2()
  }
  regwomen.oninput=function(){
    hideRegButton2()
  }
  opd.oninput=function(){
    hideRegButton2()
  }
}

export default Registration;
export {RegistrationOnload};