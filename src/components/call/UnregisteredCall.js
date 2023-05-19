import axios from "axios";
import "../../styles/call/UnregisteredCall.css"
import { validNum, validString } from "../basic/basicFunctions";

const callDao = {
    country:"",
    city:"",
    street:"",
    house:"",
    flat:"",
    phone:"",
    description:"",
    surname:"",
    name:"",
    patron:"",
    statistic:"",
    date:"",
    status:""
}

const proxyCall = "http://localhost:10023/v1/patient/call"

function UnregisteredCall(){
    return(
        <div id="unregcall">
            <div id="unregFormCall">
                <h3 id="urh3">Вызов без регистрации</h3>
                <input type="text" className='regData' id="ucphone" required onInput={() => validNum("ucphone")} placeholder="Номер телефона"/>
                <h4 className="uch4">Адрес</h4>
                <input type="text" className='regData' id="uccountry" value="Россия" disabled/>
                <input type="text" className='regData' id="uccity" required onInput={() => validString("uccity")} placeholder="Город"/>
                <input type="text" className='regData' id="ucstreet" required onInput={() => validString("ucstreet")} placeholder="Улица"/>
                <input type="text" className='regData' id="uchome" required placeholder="Дом"/>
                <input type="checkbox" id="isPrivatehouse" onClick={()=>changePrivateHouse()}/><label>Частный дом</label>
                <input type="number" className='regData' id="ucflat" placeholder="Квартира" required/>
                <h4 className="uch4">Описание случая</h4>
                <textarea id="ucdesc" className='regData' required="required" placeholder="Информация о случае"/>
                <input type="button" className="regBtn" id="ucBtn" value="Вызывать скорую помощь" onClick={onClickCall}/>
                <p className="errMsg" id="ucMessage"></p>
                <p className="errMsg" id="ucSucMsg" hidden>Вызов направлен в скорую</p>
            </div>
        </div>
    )
}

function onClickCall(){
    const parent = document.getElementById("unregFormCall");
    const check = document.getElementById("isPrivatehouse").checked
    const msg = document.getElementById("ucMessage")
    const sucmsg = document.getElementById("ucSucMsg")
    sucmsg.hidden = true
    for(const child of parent.children){
        if(check && child.id == "ucflat")   continue;
        if(child.className != "regData")    continue;
        if(child.value == ""){
            msg.innerHTML = "Не заполнены данные <br/>'"+child.placeholder+"'"
            return;
        }
    }
    msg.innerHTML = ""
    callDao.country = document.getElementById("uccountry").value
    callDao.city = document.getElementById("uccity").value
    callDao.street = document.getElementById("ucstreet").value
    callDao.house = document.getElementById("uchome").value
    callDao.flat = document.getElementById("ucflat").value
    callDao.phone = document.getElementById("ucphone").value
    callDao.description = document.getElementById("ucdesc").value

    axios.post(proxyCall, callDao, {})
    sucmsg.hidden = false

    document.getElementById("uccity").value=""
    document.getElementById("ucstreet").value=""
    document.getElementById("uchome").value=""
    document.getElementById("ucflat").value=""
    document.getElementById("ucphone").value=""
    document.getElementById("ucdesc").value=""
}

function changePrivateHouse(){
    const value = document.getElementById("isPrivatehouse").checked
    if(value){
        document.getElementById("ucflat").hidden = true
    }else{
        document.getElementById("ucflat").hidden = false
    }
}
export default UnregisteredCall;
export {callDao, proxyCall}