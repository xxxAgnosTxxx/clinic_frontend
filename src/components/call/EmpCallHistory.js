import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EmployeeMenu } from "../lk/PatientMenu";
import axios from "axios";
import { getDivCallCard } from "./CallHistory";
import { reloadOnTimer } from "../basic/basicFunctions";
import CallFilters from "./filter/CallFilter";
import { proxyCallHistory, proxyCallPayCall } from "../basic/backendUrl";

var calls;

function EmpCallHistory(){
    const [params] = useSearchParams()
    const aToken = params.get("authToken");
    var useEffCheck=0;

    useEffect(() => {
        if(useEffCheck==0){
            getCallCards(aToken)
            useEffCheck++
        }
        reloadOnTimer()
    })

    return( 
        <div>
            <h1>Управление вызовами</h1>
            <div className="lkContainer" id="lkEmpHistoryContainer">
                <EmployeeMenu token={aToken}/>
                <div className='lkContainerItems'>
                    <h2>История вызовов</h2>
                    <div id="empHistoryCalls"></div>
                </div>
                <CallFilters token={aToken}/>
            </div>
        </div>
    )
}

function getCallCards(token){
    axios.get(proxyCallHistory,{
      params:{
        token:token
      }
    })
    .then(response => {
        const historyCallContainer = document.getElementById("empHistoryCalls")
        calls = response.data
        empHistoryCallEditor(token, calls, historyCallContainer)
    })
  }

  function empHistoryCallEditor(token, calls, container){
    for(var i=0; i<calls.length;i++){
        const divtmp = getDivCallCard(calls[i])
        var finishedCall = (calls[i].status == "Завершен" || calls[i].status == "Госпитализирован")
        if(finishedCall){
            const labelPay = document.createElement("label")
            const br = document.createElement("br")
            if(finishedCall && calls[i].isPaid==false){
                labelPay.innerHTML = "Статус оплаты: ожидает оплаты"
                divtmp.appendChild(labelPay)
                divtmp.appendChild(br.cloneNode())

                const callDao =  calls[i]
                const payBtn = document.createElement("input")
                payBtn.type = "button"
                payBtn.onclick = ()=> setPayCall(token, callDao);
                payBtn.value = "Подтвердить оплату"
                divtmp.appendChild(payBtn);
                divtmp.appendChild(br.cloneNode())
            }else if(finishedCall && calls[i].isPaid){
                labelPay.innerHTML = "Статус оплаты: оплачен"
                divtmp.appendChild(labelPay)
                divtmp.appendChild(br.cloneNode())
            }
        }
        container.appendChild(divtmp)
    }
  }

  function setPayCall(token, dao){
    axios.put(proxyCallPayCall+"?token="+token, dao)
      .then(response =>{
        window.location.reload()
      })
  }

export default EmpCallHistory;
export {empHistoryCallEditor}