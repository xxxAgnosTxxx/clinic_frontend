
function DataButton(proops){
    return(<input id={proops.id} className="lkbutton" type="button" value="Изменить данные" onClick={() => DataButtonOnclick(proops)}/>)
  }

  function DataButtonOnclick(proops){
    document.getElementById(proops.id).hidden = true
    for(const child of document.getElementById(proops.id.slice(1)).children){
      if(child.className!="lkbutton" && child.id!="country"){
        child.disabled = false;
      }
    }
    document.getElementById("SaveB"+proops.id.slice(1)).hidden = false;
  }

  export default DataButton;
