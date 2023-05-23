import { useSearchParams } from "react-router-dom";
import "../../styles/map/Map.css"
import { EmployeeMenu } from "../lk/PatientMenu";
import axios from "axios";
import { callDao } from "../call/UnregisteredCall";
import { getCallDaoToChange, getDivCallCard } from "../call/CallHistory";
import { useEffect } from "react";
import { reloadOnTimer } from "../basic/basicFunctions";

const proxyCall = "http://localhost:10023/v1/employee/call"

var activeCalls = []

var myMap;

function CustomMap(){
    const [params] = useSearchParams()
    const aToken = params.get("authToken");
    var useEffectCheck = 0;

    useEffect(()=>{
        if(useEffectCheck==0){
            ymaps.ready(()=>{
                myMap = new ymaps.Map("map", {
                    center: [51.54, 46.0],
                    zoom: 12,
                    controls: ['zoomControl', 'geolocationControl', 'fullscreenControl', 'trafficControl']
                })
                getAllActiveCalls(aToken)
                getEmpActiveCalls(aToken)
            });
            useEffectCheck++;
        }
        reloadOnTimer()
    })

    return(
        <div>
            <h1>Вызовы</h1>
            <div className="lkContainer" token={aToken}>
                <EmployeeMenu token={aToken}/>
                <div className="lkContainerItems" id="map"></div>
                <div className="lkContainerItems">
                    <h2>Принятые вызовы</h2>
                    <div id="empActiveCallss"></div>
                </div>
                <div className="lkContainerItems">
                    <h2>Активные вызовы</h2>
                    <div id="activeCallContainer"></div>
                </div>
            </div> 
        </div>
    )
}

function getEmpActiveCalls(token){
    axios.get(proxyCall+"/history/active",{
        params:{
          token:token
        }
      })
      .then(response => {
        const activeCallContainer = document.getElementById("empActiveCallss")
        var calls = response.data
        for(var i=0; i<calls.length;i++){
            const divtmp = getDivCallCard(calls[i])
            activeCallContainer.appendChild(divtmp)
            //кнопки
            const liebtn = document.createElement("input")
            liebtn.type = "button"
            liebtn.onclick = ()=>ChangeStatusByEmp(liebtn, "Ложный вызов", token)
            liebtn.value = "Ложный вызов"
            liebtn.style.marginRight = "1%"
            divtmp.appendChild(liebtn)
  
            const hospitablebtn = document.createElement("input")
            hospitablebtn.type = "button"
            hospitablebtn.onclick = ()=>ChangeStatusByEmp(hospitablebtn, "Госпитализирован", token)
            hospitablebtn.value = "Направить на госпитализацию"
            hospitablebtn.style.marginRight = "1%"
            divtmp.appendChild(hospitablebtn)
  
            const finishbtn = document.createElement("input")
            finishbtn.type = "button"
            finishbtn.onclick = ()=>ChangeStatusByEmp(finishbtn, "Завершен", token)
            finishbtn.value = "Завершить вызов"
            divtmp.appendChild(finishbtn)
        }
        markCalls(calls, "blue")
    })
}

function ChangeStatusByEmp(finishbtn, status, token){
    changeCall(finishbtn.parentNode, token, status)
    window.location.assign('http://localhost:3000/lke/history?authToken='+token)
}

function ActiveCallCards(token){
    var container = document.getElementById("activeCallContainer")
    for(var i=0; i<activeCalls.length; i++){
        const divtmp = getDivCallCard(activeCalls[i])

        const br = document.createElement("br")
        const labelstat = document.createElement("label")
        labelstat.innerHTML = activeCalls[i].statistic
        divtmp.appendChild(labelstat)
        divtmp.appendChild(br.cloneNode())

        const acceptbtn = document.createElement("input")
        acceptbtn.type = "button"
        acceptbtn.value = "Принять вызов"
        acceptbtn.onclick = ()=> changeCall(acceptbtn.parentNode, token, "Принят")
        divtmp.appendChild(acceptbtn)
        container.appendChild(divtmp)
    }
}

function changeCall(parent, token, status){
    const calltmp = getCallDaoToChange(parent)
    calltmp.status=status
    axios.put(proxyCall+"/accept/?token="+token, calltmp)
}

function getAllActiveCalls(token){
    axios.get(proxyCall, {})
    .then(response=>{
        const daoArr = response.data
        if(activeCalls.length==0){
            for(var i=0; i<daoArr.length; i++){
                const tmp = Object.create(callDao)
                tmp.statistic="Статистика ложных вызовов: "
                if(daoArr[i].statistic == null){
                    tmp.surname="Незарегистрированный пользователь"
                    tmp.name=""
                    tmp.patron=""
                    tmp.status="Требует подтверждения"
                    tmp.statistic+="нет статистики"
                }else{
                    tmp.surname=daoArr[i].surname
                    tmp.name=daoArr[i].name
                    tmp.patron=daoArr[i].patron
                    tmp.status=daoArr[i].status
                    tmp.statistic+=daoArr[i].statistic
                }
                tmp.description = daoArr[i].description
                tmp.date = daoArr[i].date
                tmp.phone = daoArr[i].phone
                tmp.country = daoArr[i].country
                tmp.city=daoArr[i].city
                tmp.street=daoArr[i].street
                tmp.house=daoArr[i].house
                if(daoArr[i].flat!=null) tmp.flat=daoArr[i].flat
                activeCalls.push(tmp)
            }
        
            markCalls(activeCalls, "red")
            ActiveCallCards(token)
        }
    })
}

function getAddress(activeCall){
    var address = activeCall.country+", г. "+activeCall.city+", ул."+activeCall.street+", д."+activeCall.house
    if(activeCall.flat!=null) address+=", кв."+activeCall.flat
    return address
}

function markCalls(activeCalls, color){
    for(var i=0; i<activeCalls.length; i++){
        ymaps.geocode(getAddress(activeCalls[i]),{
            results:1
        })
        .then(function (res){
            var coords = res.geoObjects.get(0).geometry.getCoordinates();
            var callMark = new ymaps.Placemark(coords, {
                balloonContent: res.geoObjects.get(0).getAddressLine()}, {
                preset: 'islands#'+color+'StretchyIcon'});
            myMap.geoObjects.add(callMark);
        });
    }
}

export default CustomMap;
export {proxyCall, changeCall}