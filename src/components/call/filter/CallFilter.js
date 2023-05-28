import { cloneElement, useEffect } from "react";
import "../../../styles/call/filter/CallFilters.css"
import axios from "axios";
import { proxyCallFilterPerson } from "../../basic/backendUrl";
import { filterDao } from "../../basic/dao";
import { getDivCallCard, patientCallHistoryEditor } from "../CallHistory";
import { empHistoryCallEditor } from "../EmpCallHistory";

var dateSituation = {
    beginTime:"",
    endTime:""
}

function CallFilters(token){
    var useEffectCheck = 0;
    useEffect(()=>{
        if(useEffectCheck == 0){
            getFilters(token.token);
        }
        useEffectCheck ++;
    })

    return(
        <div>
            <h2>Фильтр по вызовам</h2>
            <div>
                <h3>Статус вызова</h3>
                <div id="statusFilter"></div>
                <h3>Статус оплаты</h3>
                <div id="payStatusFilter">
                    <input name="payStatus" type="checkbox" value={false}/><label>Не оплачен</label><br/>
                    <input name="payStatus" type="checkbox" value={true}/><label>Оплачен</label><br/>
                </div>
                <h3>Время создания вызова</h3>
                <div>
                <label>C </label><input type="datetime-local" id="reg-begin"/>
                <label> По </label><input type="datetime-local" id="reg-end"/>
                </div>
                <h3>Время приёма вызова</h3>
                <div>
                <label>C </label><input type="datetime-local" id="accept-begin"/>
                <label> По </label><input type="datetime-local" id="accept-end"/>
                </div>
                <h3>Время завершения вызова</h3>
                <div>
                <label>C </label><input type="datetime-local" id="finish-begin"/>
                <label> По </label><input type="datetime-local" id="finish-end"/>
                </div>
            </div>
            <input type="button" value="Применить" className='regBtn' onClick={()=>acceptFilters(token.token)}/>
            <input type="button" value="Сбросить" className='regBtn' onClick={()=>reloadFilters()}/>
        </div>
    )
}

function acceptFilters(token){
    var filter = Object.create(filterDao);

    var statFilters = [];
    const sfChilds = document.getElementById("statusFilter").children[0].children;
    for(var i=0, j=i+1; j<sfChilds.length; i++, j++){
        if(sfChilds[i].checked) statFilters.push(sfChilds[j].innerText);
    }
    filter.statuses = statFilters;

    var statPays = [];
    const pfelements = document.getElementsByName("payStatus")
    for(var i=0; i<pfelements.length; i++){
        if(pfelements[i].checked)   statPays.push(pfelements[i].value)
    }
    filter.statusPay = statPays

    const regFilter = Object.create(dateSituation)
    regFilter.beginTime = document.getElementById("reg-begin").value
    regFilter.endTime = document.getElementById("reg-end").value
    filter.registration = regFilter

    const acceptFilter = Object.create(dateSituation)
    acceptFilter.beginTime = document.getElementById("accept-begin").value
    acceptFilter.endTime = document.getElementById("accept-end").value
    filter.accepted = acceptFilter

    const finishFilter = Object.create(dateSituation)
    finishFilter.beginTime = document.getElementById("finish-begin").value
    finishFilter.endTime = document.getElementById("finish-end").value
    filter.finished = finishFilter

    axios.post(proxyCallFilterPerson, filter, {
        params:{
            token:token
        }
    })
    .then(response => {
        const calls = response.data
        if(document.getElementById("empHistoryCalls") != null){
            var divContainer = document.getElementById("empHistoryCalls");
            divContainer.replaceChildren()
            empHistoryCallEditor(token, calls, divContainer)
        }else{
            var divContainer = document.getElementById("callCardContainer")
            divContainer.replaceChildren()
            patientCallHistoryEditor(token, calls, divContainer)
        }
        
    });
}

function reloadFilters(){
    window.location.reload();
}

function getFilters(token){
    axios.get(proxyCallFilterPerson,{
        params:{
          token:token
        }
    })
    .then(response =>{
        var statuses = response.data.statuses
        addFilterStatusesToParentNode("statusFilter", statuses)
    })
}

function addFilterStatusesToParentNode(parentId, statuses){
    const parent = document.getElementById(parentId);
    const divtmp = document.createElement("div")
    const sarr = Array.from(statuses)
    sarr.forEach(element => {
        const input = document.createElement("input")
        input.type = "checkbox"
        input.name = parentId
        input.value = element
        const label = document.createElement("label")
        label.innerText = element
        divtmp.appendChild(input)
        divtmp.appendChild(label)
        const br = document.createElement("br")
        divtmp.appendChild(br)
    })
    parent.appendChild(divtmp)
}

export default CallFilters;