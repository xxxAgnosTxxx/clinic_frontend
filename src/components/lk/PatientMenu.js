import '../../styles/lk/PatientMenu.css'

function PatientMenu(proops){
    const lkpHref = 'http://localhost:3000/lkp?authToken='+proops.token;
    const history = 'http://localhost:3000/lkp/history?authToken='+proops.token;
    return(
        <MenuContainer lkHref={lkpHref} historyHref={history}/>
    )
}

function EmployeeMenu(proops){
    const lkeHref = 'http://localhost:3000/lke/map?authToken='+proops.token;
    const history = 'http://localhost:3000/lke/history?authToken='+proops.token;
    return(
        <MenuContainer lkHref={lkeHref} historyHref={history}/>
    )
}

function MenuContainer(proops){
    return(
        <div id="menu">
        <div className='menuItem'><a href={proops.lkHref}>Личный кабинет</a></div>
        <div className='menuItem'><a href={proops.historyHref}>Управление вызовами</a></div>
        <div className='menuItem'><a href='http://localhost:3000'>Выход</a></div>
    </div>
    )
}

export default PatientMenu;
export {EmployeeMenu}
