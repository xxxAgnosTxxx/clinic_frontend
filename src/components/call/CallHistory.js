import { useSearchParams } from "react-router-dom";
import "../../styles/call/CallHistory.css"
import PatientMenu from "../lk/PatientMenu";
import { useEffect } from "react";
import axios from "axios";
import { callDao } from "./UnregisteredCall";

const proxyCall = "http://localhost:10023/v1/patient/call/reg"

var calls = [];

function CallHistory(){
  const [params] = useSearchParams()
  const aToken = params.get("authToken");

  useEffect(() => {
    getCallCards(aToken)
  })

  return( 
    <div>
      <h1>История вызовов</h1>
      <div id="callcontainer">
        <PatientMenu token={aToken}/>
        <div id="callCardContainer"></div>
      </div>
    </div>
    )
}

function getCallCards(token){
  axios.get(proxyCall,{
    params:{
      token:token
    }
  })
  .then(response => {
    calls = response.data
    const size = calls.length;
    const container = document.getElementById("callCardContainer")
    container.replaceChildren()

    for(var i = 0; i<size; i++){
      const divtmp = getDivCallCard(calls[i])
            
      if(calls[i].status == "Подтвержден" || calls[i].status == "Принят"){
        const cancelbtn = document.createElement("input")
        cancelbtn.type = "button"
        cancelbtn.value = "Отменить"
        cancelbtn.onclick = ()=>cancelCall(cancelbtn.parentNode, token)
        divtmp.appendChild(cancelbtn)
      }
    
      container.appendChild(divtmp)
    }
  })
}

function getDivCallCard(callDao){
  const br = document.createElement("br")
  const divtmp = document.createElement("div")
  divtmp.className = "callCard"

  const labelfio = document.createElement("label")
  labelfio.innerHTML = "Ф.И.О.: "
  if(callDao.surname==null){
    labelfio.innerHTML += "Незарегистрированный пользователь"
  }else{
    labelfio.innerHTML += callDao.surname+" "+callDao.name+" "+callDao.patron
  }
  divtmp.appendChild(labelfio)
  divtmp.appendChild(br)

  const labelphone = document.createElement("label")
  labelphone.innerHTML = "Телефон вызова: "+callDao.phone
  divtmp.appendChild(labelphone)
  divtmp.appendChild(br.cloneNode())

  const labeltime = document.createElement("label")
  labeltime.innerHTML = "Время вызова: "+callDao.date
  divtmp.appendChild(labeltime)
  divtmp.appendChild(br.cloneNode())

  const labelAddress = document.createElement("label")
  labelAddress.innerHTML = "Адрес: "+callDao.country+", г. "+callDao.city+", ул. "+callDao.street+", д. "+callDao.house
  if(callDao.flat!=null) labelAddress.innerHTML+=", кв. "+callDao.flat
  divtmp.appendChild(labelAddress)
  divtmp.appendChild(br.cloneNode())

  const labelstatus = document.createElement("label")
  labelstatus.innerHTML = "Статус вызова: "+callDao.status
  divtmp.appendChild(labelstatus)
  divtmp.appendChild(br.cloneNode())

  const labeldesc = document.createElement("label")
  labeldesc.innerHTML = "Описание: "+callDao.description
  divtmp.appendChild(labeldesc)
  divtmp.appendChild(br.cloneNode())

  if(callDao.status == "Завершен")  divtmp.style.backgroundColor = "rgb(74, 164, 93)"
  if(callDao.status == "Принят")  divtmp.style.backgroundColor = "rgb(127, 159, 247)"
  if(callDao.status == "Отменен")  divtmp.style.backgroundColor = "rgb(157, 157, 157)"
  if(callDao.status == "Госпитализирован")  divtmp.style.backgroundColor = "rgb(238, 235, 153)"
  if(callDao.status == "Создан" || callDao.status == "Требует подтверждения") divtmp.style.backgroundColor="orange"

  return divtmp;
}

function cancelCall(parent, token){
  axios.post(proxyCall+"/cancel", getCallDaoToChange(parent), {
    params:{
      token:token
    }
  })
  .then(response => {
    window.location.assign('http://localhost:3000/lkp/history?authToken='+response.data);
  })
}

function getCallDaoToChange(parent){
  const calltmp = Object.create(callDao)
  calltmp.phone = parent.children[2].innerHTML.replace('Телефон вызова: ', '');
  calltmp.date = parent.children[4].innerHTML.replace('Время вызова: ', '');
  calltmp.description = parent.children[10].innerHTML.replace('Описание: ', '');
  return calltmp;
}

export default CallHistory;
export {getDivCallCard, getCallDaoToChange}