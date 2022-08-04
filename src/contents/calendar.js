import Daily from "../components/daily";
import Weekly from "../components/weekly";
import Monthly from "../components/monthly";
function Calendar({targetID, setTargetID, setAddDate, loggedUser, date, setDate, loginState, dailyState, weeklyState, monthlyState, setTodoState,setCheckDetailState, setSelectedTime,setAddTodoState }){
  let selectedCalendar = null;
  if(loginState && dailyState === true){
    selectedCalendar = <Daily setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} setAddTodoState={setAddTodoState} date={date} setDate={setDate} setTargetID={setTargetID} setCheckDetailState={setCheckDetailState}/>
  }
  else if(loginState && weeklyState === true){
    selectedCalendar =  <Weekly setAddTodoState={setAddTodoState} setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} date={date} setDate={setDate} setTargetID={setTargetID} setCheckDetailState={setCheckDetailState} setAddDate={setAddDate}/>
  }
  else if(loginState && monthlyState === true){
    selectedCalendar = <Monthly/>
  }

  return (
    <>{selectedCalendar}</>
  )
}

export default Calendar