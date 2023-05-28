const personDao = {
    name:"",
    surname:"",
    patronymic:"",
    role:"",
    phone:"",
    mail:"",
    sex:""
}

const loginDao = {
    login:"",
    password:"",
    role:""
}

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
    status:"",
    surnameEmp:"",
    nameEmp:"",
    patronEmp:"",
    isPaid:"",
    acceptDate:"",
    finishDate:""
}

const addressDao = {
    country : "",
    city: "",
    street:"",
    houseNum:"",
    flatNum:""
}

const patientDao = {
    person: "",
    speciality: "",
    position: "",
    education: "",
    login: "",
    snils: "",
    polis: "",
    birth:"",
    password: ""
}

const filterDao = {
    statuses:[],
    statusPay:[],
    registration:"",
    accepted:"",
    finished:""
}

export {personDao, loginDao, callDao, addressDao, patientDao, filterDao}