function validNum(proops){
    const str = document.getElementById(proops);
    str.value = str.value.replace(/\D/g,'');
  }

  function validString(proops){
    const str = document.getElementById(proops);
    str.value = str.value.replace(/[A-Za-z]+/g,'');
  }

  function reloadOnTimer(){
    setInterval(()=> window.location.reload(), 300000)
  }

  export {validString, reloadOnTimer, validNum}