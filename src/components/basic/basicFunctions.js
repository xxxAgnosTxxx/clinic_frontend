function validNum(proops){
    const str = document.getElementById(proops);
    str.value = str.value.replace(/\D/g,'');
  }

  function validString(proops){
    const str = document.getElementById(proops);
    str.value = str.value.replace(/[A-Za-z]+/g,'');
  }

  export {validNum}
  export {validString}