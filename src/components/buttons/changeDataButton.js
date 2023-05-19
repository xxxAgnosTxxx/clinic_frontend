import axios from "axios";
import { address, proxyAddress, separateAddress } from "../lk/LkPatient";

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
      data:address
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
    document.getElementById('city').value=address.city
    document.getElementById('street').value=address.street
    document.getElementById('house').value=address.houseNum
    document.getElementById('room').value=address.flatNum;
    var newProps ={id:"Baddress"}
    DataButtonOnclick(newProps);
    axios.delete(proxyAddress, {
      params:{
        token:proops.token
      },
      data:address
    })
  }

  export default DataButton;
  export {DeleteAddressButton, ChangeAddressButton}
