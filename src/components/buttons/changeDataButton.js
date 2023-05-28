import axios from "axios";
import { separateAddress } from "../lk/LkPatient";
import { proxyAddress } from "../basic/backendUrl";
import { addressDao } from "../basic/dao";

function DataButton(proops){
    return(<input id={proops.id} className="lkbutton" type="button" value={proops.value} onClick={() => DataButtonOnclick(proops)}/>)
  }
  function DataButtonOnclick(proops){
    document.getElementById(proops.id).hidden = true
    for(const child of document.getElementById(proops.id.slice(1)).children){
      if(child.className!="lkbutton" && child.id!="country"){
        child.disabled = false;
      }
      if(child.id=='genderContainer'){
        child.children[0].disabled = false
        child.children[1].disabled = false
      }
    }
    document.getElementById("SaveB"+proops.id.slice(1)).hidden = false;
  }

  function DeleteAddressButton(proops){
    return(<input type='button' hidden={true} id={proops.id} value='Удалить' onClick={() => onClickDeleteAddress(proops)}/>);
  }
  function onClickDeleteAddress(proops){
    const parent = document.getElementById(proops.id).parentNode;
    const adr = parent.children[0].innerHTML;
    separateAddress(adr)
    axios.delete(proxyAddress, {
      params:{
        token:proops.token
      },
      data:addressDao
    })
    .then(response => {
      window.location.assign('http://localhost:3000/lkp?authToken='+response.data);
    })
  }

  function ChangeAddressButton(proops){
    return(<input type='button' hidden={true} id={proops.id} value='Редактировать' onClick={() =>onClickChangeAddress(proops)}/>);
  }
  function onClickChangeAddress(proops){
    const parent = document.getElementById(proops.id).parentNode;
    const adr = parent.children[0].innerHTML;
    separateAddress(adr)
    document.getElementById('city').value=addressDao.city
    document.getElementById('street').value=addressDao.street
    document.getElementById('house').value=addressDao.houseNum
    document.getElementById('room').value=addressDao.flatNum;
    var newProps ={id:"Baddress"}
    DataButtonOnclick(newProps);
    axios.delete(proxyAddress, {
      params:{
        token:proops.token
      },
      data:addressDao
    })
  }

  export default DataButton;
  export {DeleteAddressButton, ChangeAddressButton}
