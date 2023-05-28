const proxyCall = "http://localhost:10023/v1/employee/call";
const proxyCallActiveCalls = proxyCall+"/history/active";
const proxyCallAcceptCalls = proxyCall+"/accept";
const proxyCallPayCall = proxyCall+"/pay"
const proxyCallHistory = proxyCall+"/history"

const proxyAuthorization = "http://localhost:10023/v1/authorization"
const proxyRegister = proxyAuthorization + "/register"
const proxySign = proxyAuthorization + "/signIn"

const proxyPatient = "http://localhost:10023/v1/patient"
const proxyProfile = proxyPatient+"/profile"
const proxyAddress = proxyPatient+"/address"
const proxyCallPatient = proxyPatient+"/call"
const proxyCallPatientReg = proxyCallPatient+"/reg"
const proxyCallPatientRegCancel = proxyCall+"/cancel"

const proxyPerson = "http://localhost:10023/v1/person"
const proxyCallFilterPerson = proxyPerson + "/filter"

export {proxyCall, proxyCallActiveCalls, proxyCallAcceptCalls,
proxyCallPayCall, proxyCallHistory, proxyRegister, proxySign,
proxyProfile, proxyAddress, proxyCallPatient, proxyCallPatientReg,
proxyCallPatientRegCancel, proxyCallFilterPerson}