import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../styles/lk/Lkpatient.css';
import { validNum, validString } from "../basic/basicFunctions";
import PatientMenu from './PatientMenu';
import DataButton, { ChangeAddressButton, DeleteAddressButton } from '../buttons/changeDataButton';
import { proxyAddress, proxyCallPatientReg, proxyProfile } from '../basic/backendUrl';
import { callDao, patientDao, personDao } from '../basic/dao';

const addressSeparator = ", "

function LkPatient(){
  const [params] = useSearchParams()
  const aToken = params.get("authToken");

    useEffect(() => {
      getProfileData(aToken)
      getAddressData(aToken)
    })

    return(
      <div>
        <h1>Добро пожаловать в личный кабинет</h1>
        <div className="lkContainer">
          <PatientMenu token={aToken}/>
          <div id="profile" className='lkContainerItems'>
            <h2>Персональные данные</h2>
            <p id="firstRegistration" className='errMsg' hidden="true"></p>
            <label>Фамилия</label><input required disabled={true} type="text" id='lksurname' onInput={() => validString("lksurname")}/>
            <label>Имя</label><input required disabled={true} type="text" id='lkiname' onInput={() => validString("lkiname")}/>
            <label>Отчество</label><input required disabled={true} type="text" id='lkpatron' onInput={() => validString("lkpatron")}/>
            <label>Дата рождения</label><input required disabled={true} type="date" id='lkbirth'/>
            <div id='genderContainer'>Пол: <input disabled={true} required type='radio' id='lkman' name='lkgender'/>Мужской
            <input disabled={true} required type='radio' id='lkwoman' name='lkgender'/>Женский</div>
            <p id = 'polisError' className='itemError' hidden='true'>Номер полиса должен иметь 16 цифр</p>
            <label>Полис</label><input disabled={true} type="text" id='lkpolis' placeholder='0000000000000000' maxLength="16" onBlur={onBlurPolis} onInput={() => validNum("lkpolis")} required/>
            <p id = 'snilsError' className='itemError' hidden='true'>Номер СНИЛС должен иметь 11 цифр</p>
            <label>СНИЛС</label><input required disabled={true} type="text" id='lksnils' placeholder='00000000000' maxLength="11" onBlur={onBlurSnils} onInput={() => validNum("lksnils")}/>
            <label>Телефон</label><input required disabled={true} type="text" id='lkphone' onInput={() => validNum("lkphone")}/>
            <label>E-mail</label><input required disabled={true} type="email" id='lkmail'/>
            <label>Пароль</label><input required disabled={true} type='password' id='regpass'/>
            <div><input type='checkbox' id="hop" onClick={()=>hideAndOpenPassword()}/><label>Показать пароль</label></div>
            <DataButton value="Изменить данные" id="Bprofile"/>
            <DataSaveButton id="SaveBprofile" token={aToken}/>
          </div>

          <div id="address" className='lkContainerItems'>
            <h2>Сохраненные адреса</h2>
            <p id="saveAddressError" className="itemError" hidden="true"></p>
            <div id = "savedAddresses">
              <div>
                <div className='savedAddress'/>
                <DeleteAddressButton id="Address0" token={aToken}/>
                <ChangeAddressButton id="AddressC0" token={aToken}/>
              </div>
              <div>
                <div className='savedAddress'/>
                <DeleteAddressButton id="Address1" token={aToken}/>
                <ChangeAddressButton id="AddressC1" token={aToken}/>
              </div>
              <div>
                <div className='savedAddress'/>
                <DeleteAddressButton id="Address2" token={aToken}/>
                <ChangeAddressButton id="AddressC2" token={aToken}/>
              </div>
              <div>
                <div className='savedAddress'/>
                <DeleteAddressButton id="Address3" token={aToken}/>
                <ChangeAddressButton id="AddressC3" token={aToken}/>
              </div>
              <div>
                <div className='savedAddress'/>
                <DeleteAddressButton id="Address4" token={aToken}/>
                <ChangeAddressButton id="AddressC4" token={aToken}/>
              </div>
            </div>
            <h3>Данные адреса</h3>
            <label>Страна</label><input required disabled={true} type="text" id='country' value="Россия"/>
            <label>Город</label><input required disabled={true} type="text" id='city' onInput={() => validString("city")}/>
            <label>Улица</label><input required disabled={true} type="text" id='street' onInput={() => validString("street")}/>
            <label>Дом</label><input required disabled={true} type="text" id='house'/>
            <label>Квартира</label><input placeholder='Не заполняется, если дом частный' disabled={true} type="number" id='room' onInput={() => validNum("room")}/>
            <DataButton value="Добавить адрес" id="Baddress"/>
            <DataSaveButton id="SaveBaddress" token={aToken}/>
          </div>

          <div id="setCall" className='lkContainerItems'>
            <h2>Оставить заявку на вызов</h2>
            <p hidden className='errMsg' id='callRegErr'></p>
            <h4>Адрес вызова</h4>
            <fieldset id="selectAddresses" className='lkContainerItems'>
              <div hidden><input type='radio' name='selectAddress' onClick={()=>onChangeTextBox()}/><label></label><br/></div>
              <div hidden><input type='radio' name='selectAddress' onClick={()=>onChangeTextBox()}/><label></label><br/></div>
              <div hidden><input type='radio' name='selectAddress' onClick={()=>onChangeTextBox()}/><label></label><br/></div>
              <div hidden><input type='radio' name='selectAddress' onClick={()=>onChangeTextBox()}/><label></label><br/></div>
              <div hidden><input type='radio' name='selectAddress' onClick={()=>onChangeTextBox()}/><label></label><br/></div>
              <div><input type='radio' name='selectAddress' onClick={()=>onChangeTextBox("other")}/><label>Другой адрес</label></div>
            </fieldset>
            <div id='otherAddress' hidden className='lkContainerItems'>
              <label>Страна</label><input required disabled type="text" id='callcountry' value="Россия"/>
              <label>Город</label><input required type="text" id='callcity' onInput={() => validString("callcity")}/>
              <label>Улица</label><input required type="text" id='callstreet' onInput={() => validString("callstreet")}/>
              <label>Дом</label><input required type="text" id='callhouse'/>
              <label>Квартира</label><input placeholder='Не обязательно' type="number" id='callroom' onInput={() => validNum("callroom")}/>
            </div>
            <div className='lkContainerItems'>
              <h4>Описание случая</h4>
              <textarea id="rcdesc" className='regData' required="required" placeholder="Симптомы, жалобы" onInput={() => validString("rcdesc")}/>
              <input type="button" className="lkbutton" value="Вызывать скорую помощь" onClick={()=>onClickRegCall(aToken)}/>
            </div>
          </div>
        </div>
      </div>)
  }

  function hideAndOpenPassword(){
    if(document.getElementById("hop").checked){
      document.getElementById('regpass').type="text"
    }else{
      document.getElementById('regpass').type="password"
    }
  }

  function onClickRegCall(token){
    const addressData = document.getElementById("otherAddress")
    const addressError = "Не заполнены данные адреса"
    const description = document.getElementById("rcdesc")
    const errCallReg = document.getElementById("callRegErr")
    var checkedAddress = ""
    if(!addressData.hidden){
      for(const child of addressData.children){
        if(child.id!="callroom" && child.value == "" && child.tagName=="INPUT"){
            errCallReg.hidden = false
            errCallReg.innerHTML = addressError
            return
        }
      }
    }else{
      var checkFlag = false
      for(const child of document.getElementById("selectAddresses").children){
        if(!child.hidden){
          checkFlag = child.children[0].checked
          if(checkFlag){
            checkedAddress = child.children[1].innerHTML
            break
          }
        }
      }
      if(!checkFlag){
        errCallReg.hidden = false
            errCallReg.innerHTML = addressError
            return
      }
    }

    if(description.value == ""){
      errCallReg.hidden = false
      errCallReg.innerHTML = "Не заполнено описание случая"
      return
    }
    errCallReg.hidden = true

    if(addressData.hidden){
      separateAddress(checkedAddress)
      callDao.country = addressDao.country
      callDao.city = addressDao.city
      callDao.street = addressDao.street
      callDao.house = addressDao.houseNum
      callDao.flat = addressDao.flatNum
    }else{
      callDao.country = document.getElementById("callcountry").value
      callDao.city = document.getElementById("callcity").value
      callDao.street = document.getElementById("callstreet").value
      callDao.house = document.getElementById("callhouse").value
      callDao.flat = document.getElementById("callroom").value
    }
    callDao.description = description.value
    callDao.phone = document.getElementById("lkphone").value
    
    axios.post(proxyCallPatientReg, callDao, {
      params:{
        token:token
      }
    }).then(response => {
      window.location.assign('http://localhost:3000/lkp/history?authToken='+response.data);
    })
  }

  function onChangeTextBox(prop){
    if(prop=="other"){
      document.getElementById("otherAddress").hidden=false
    }else{
      document.getElementById("otherAddress").hidden=true
    }
  }

  function separateAddress(propStr){
    const addressArray = propStr.split(addressSeparator)
    addressDao.country = addressArray[0];
    addressDao.city = addressArray[1];
    addressDao.street = addressArray[2];
    addressDao.houseNum = addressArray[3];
    addressDao.flatNum = addressArray[4];
  }

  function onBlurPolis(){
    var value = document.getElementById('lkpolis').value;
    if(value.length!=16){
      document.getElementById('lkpolis').value = '';
      document.getElementById('polisError').hidden = false;
    }
    else{
      document.getElementById('polisError').hidden = true;
    }
  }

  function onBlurSnils(){
    var value = document.getElementById('lksnils').value;
    if(value.length!=11){
      document.getElementById('lksnils').value = '';
      document.getElementById('snilsError').hidden = false;
    }
    else{
      document.getElementById('snilsError').hidden = true;
    }
  }

  function DataSaveButton(proops){
    return(<input id={proops.id} className="lkbutton" hidden={true} type="button" value="Сохранить данные" onClick={() => DataSaveButtonOnclick(proops)}/>)
  }

  function DataSaveButtonOnclick(proops){
    const idContainer = proops.id.slice(5)
    //поля не должны быть пустыми
    for(const child of document.getElementById(idContainer).children){
      if(child.className!="lkbutton"){
        if(child.value == "" && child.required){
          return;
        }
      }
    }
    //персональные данные
    if(idContainer=='profile'){
      personDao.name = document.getElementById("lkiname").value
      personDao.surname = document.getElementById("lksurname").value
      personDao.patronymic = document.getElementById("lkpatron").value
      personDao.phone = document.getElementById("lkphone").value
      personDao.mail = document.getElementById("lkmail").value
      personDao.sex = document.getElementById("lkman").checked
      personDao.role="patient";
      patientDao.snils = document.getElementById("lksnils").value
      patientDao.polis = document.getElementById("lkpolis").value
      patientDao.password = document.getElementById("regpass").value
      patientDao.birth = document.getElementById("lkbirth").value
      patientDao.person = personDao;
      //отправка данных
      SendData(proops.token, proxyProfile, patientDao);
      if(document.getElementById("firstRegistration").innerText!=null) return
      //ввод полей ограничивается
      for(const child of document.getElementById(idContainer).children){
        if(child.className!="lkbutton"){
          child.disabled = true
        }
      }
      //кнопки меняют видимость
      document.getElementById(proops.id).hidden = true;
      document.getElementById(proops.id.slice(4)).hidden = false;
    }
    //адрес
    else if(idContainer){
      addressDao.country = document.getElementById("country").value,
      addressDao.city = document.getElementById("city").value,
      addressDao.street = document.getElementById("street").value
      addressDao.houseNum = document.getElementById("house").value
      addressDao.flatNum = document.getElementById("room").value
      //отправка данных
      SendData(proops.token, proxyAddress, addressDao);
      //ввод полей ограничивается
      for(const child of document.getElementById(idContainer).children){
        if(child.className!="lkbutton"){
          child.disabled = true
        }
      }
      //кнопки меняют видимость
      document.getElementById(proops.id).hidden = true;
      document.getElementById(proops.id.slice(4)).hidden = false;
    }
  }

  function SendData(token, url, dao){
    axios.post(url, dao, {
      params:{
        token:token
      }
    })
    .then(response=>{
      window.location.reload()
    })
    .catch(function(error){
      if(dao.person!=null){
        const errmsgData=document.getElementById("firstRegistration");
        errmsgData.innerText = error.response.data;
        errmsgData.hidden = false
      }
    })
  }

  function getProfileData(proops){
    axios.get(proxyProfile,{
      params:{
        token:proops
      }
    })
    .then(response =>{
      const data = response.data;
      document.getElementById("lkiname").value = data.person.name
      document.getElementById("lksurname").value = data.person.surname
      document.getElementById("lkpatron").value = data.person.patronymic
      document.getElementById("lkphone").value = data.person.phone;
      document.getElementById("lkmail").value = data.person.mail;
      document.getElementById("lkpolis").value = data.polis
      document.getElementById("lksnils").value = data.snils
      document.getElementById("lkbirth").value = data.birth
      document.getElementById("regpass").value = data.password
      if(data.person.sex){
        document.getElementById("lkman").checked = true
      }else{
        document.getElementById("lkwoman").checked = true
      }
      var hiddenFlag = true
      for(const child of document.getElementById('profile').children){
        if(child.tagName=="INPUT" && (child.value==null || child.value=='')){
          hiddenFlag = false;
          break;
        }
      }
      for(const child of document.getElementById('profile').children){
        if(child.id=='firstRegistration'){
          child.innerText = "Необходимо заполнить все персональные данные при первичной регистрации"
          child.hidden = hiddenFlag;
          break;
        }
      }
    })
  }

  function getAddressData(proops){
    axios.get(proxyAddress,{
      params:{
        token:proops
      }
    })
    .then(response =>{
      const data = response.data;
      printSavedAddresses(data)
    })
  }

  function printSavedAddresses(data){
    var i = 0;
    for(const child of document.getElementById("savedAddresses").children){
      if(data.length <= i)  break
      child.children[0].innerHTML = data[i].country+addressSeparator+data[i].city+addressSeparator+data[i].street+addressSeparator+data[i].houseNum
      if(data[i].flatNum != null) child.children[0].innerHTML += addressSeparator+data[i].flatNum
      child.children[1].hidden = false
      child.children[2].hidden = false
      document.getElementById(child.children[2].id).style.marginLeft="5px"
      i++;
    }

    if(i>=5){
      document.getElementById("saveAddressError").innerText = "Можно хранить не более 5 адресов"
      document.getElementById("saveAddressError").hidden = false;
      document.getElementById("Baddress").hidden = true;
    }

    var j = 0;
    for(const child of document.getElementById("selectAddresses").children){
      if(i<1) break;
      if(data.length <= j)  break
      child.hidden = false;
      child.children[1].innerHTML = document.getElementById("savedAddresses").children[j].children[0].innerHTML
      j++;
    }
  }

  export default LkPatient;
  export {separateAddress}