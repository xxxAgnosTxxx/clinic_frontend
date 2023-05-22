import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EmployeeMenu } from "../lk/PatientMenu";
import axios from "axios";
import { changeCall, proxyCall } from "../map/Map";
import { getDivCallCard } from "./CallHistory";
import { reloadOnTimer } from "../basic/basicFunctions";

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
                historyCallContainer.appendChild(divtmp)
            }
        }
    })
  }

  function setPayCall(token, dao){
    axios.put(proxyCall+"/pay?token="+token, dao)
      .then(response =>{
        window.location.reload()
      })
  }

export default EmpCallHistory;