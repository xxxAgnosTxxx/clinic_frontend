import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EmployeeMenu } from "../lk/PatientMenu";
import axios from "axios";
import { changeCall, proxyCall } from "../map/Map";
import { getDivCallCard } from "./CallHistory";

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
    })

    return( 
        <div>
            <h1>Управление вызовами</h1>
            <div className="lkContainer">
                <EmployeeMenu token={aToken}/>
                <div className='lkContainerItems'>
                    <h2>Активные вызовы</h2>
                    <div id="empActiveCalls"></div>
                </div>
                <div className='lkContainerItems'>
                    <h2>История вызовов</h2>
                    <div id="empHistoryCalls"></div>
                </div>
            </div>
        </div>
    )
}

function getCallCards(token){
    axios.get(proxyCall+"/history",{
      params:{
        token:token
      }
    })
    .then(response => {
        const activeCallContainer = document.getElementById("empActiveCalls")
        const historyCallContainer = document.getElementById("empHistoryCalls")

        calls = response.data
        for(var i=0; i<calls.length;i++){
            const divtmp = getDivCallCard(calls[i])
            if(calls[i].status=="Принят"){
                activeCallContainer.appendChild(divtmp)
                //кнопки
                const liebtn = document.createElement("input")
                liebtn.type = "button"
                liebtn.onclick = ()=>changeCall(liebtn.parentNode, token, "Ложный вызов")
                liebtn.value = "Ложный вызов"
                liebtn.style.marginRight = "1%"
                divtmp.appendChild(liebtn)

                const hospitablebtn = document.createElement("input")
                hospitablebtn.type = "button"
                hospitablebtn.onclick = ()=>changeCall(hospitablebtn.parentNode, token, "Госпитализирован")
                hospitablebtn.value = "Направить на госпитализацию"
                hospitablebtn.style.marginRight = "1%"
                divtmp.appendChild(hospitablebtn)

                const finishbtn = document.createElement("input")
                finishbtn.type = "button"
                finishbtn.onclick = ()=>changeCall(finishbtn.parentNode, token, "Завершен")
                finishbtn.value = "Завершить вызов"
                divtmp.appendChild(finishbtn)
            }else{
                historyCallContainer.appendChild(divtmp)
            }
        }
    })
  }

export default EmpCallHistory;