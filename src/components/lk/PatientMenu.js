import '../../styles/lk/PatientMenu.css'
import { lkeHistory, lkeMap, lkp, lkpHistory, server } from '../basic/backendUrl';

function PatientMenu(proops){
    const lkpHref = lkp+'?authToken='+proops.token;
    const history = lkpHistory+'?authToken='+proops.token;
    return(
        <MenuContainer lkHref={lkpHref} historyHref={history}/>
    )
}

function EmployeeMenu(proops){
    const lkeHref = lkeMap+'?authToken='+proops.token;
    const history = lkeHistory+'?authToken='+proops.token;
    const mainHref = 'http://'+server+':3000'
    return(
        <div id="menu">
            <div className='menuItem'><a href={lkeHref}>Приёмная вызовов</a></div>
            <div className='menuItem'><a href={history}>История вызовов</a></div>
            <div className='menuItem'><a href={mainHref}>Выход</a></div>
        </div>)
}

function MenuContainer(proops){
    const mainHref = 'http://'+server+':3000'
    return(
        <div id="menu">
            <div className='menuItem'><a href={proops.lkHref}>Личный кабинет</a></div>
            <div className='menuItem'><a href={proops.historyHref}>История вызовов</a></div>
            <div className='menuItem'><a href={mainHref}>Выход</a></div>
        </div>)
}

export default PatientMenu;
export {EmployeeMenu}
