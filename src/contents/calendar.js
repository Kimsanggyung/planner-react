import Daily from "../components/daily";
import Weekly from "../components/weekly";
import Monthly from "../components/monthly";

function Calendar({selectYear, setSelectYear, selectMonth, setSelectMonth, selectDate, setSelectDate, setCheckTodoState, setTargetID, setEditTodoState,setAddDate, loggedUser, date, setDate, loginState, dailyState, weeklyState, monthlyState, setTodoState,setCheckDetailState, setSelectedTime,setAddTodoState }){
  let selectedCalendar = null; //render를 위한 변수
  if(loginState && dailyState === true){ // 로그인상태이면서 dailyState가 참이면 selectedCalendar에 daily컴포넌트를 할당
    selectedCalendar = <Daily setSelectYear={setSelectYear} setSelectMonth={setSelectMonth} setSelectDate={setSelectDate} setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} setAddTodoState={setAddTodoState} date={date} setDate={setDate} setTargetID={setTargetID} setCheckDetailState={setCheckDetailState} setAddDate={setAddDate} setEditTodoState={setEditTodoState} setCheckTodoState={setCheckTodoState}/>
  }else if(loginState && weeklyState === true){ // 로그인상태이면서 weeklyState가 참이면 selectedCalendar에 weekly컴포넌트를 할당
    selectedCalendar =  <Weekly setSelectYear={setSelectYear} setSelectMonth={setSelectMonth} setSelectDate={setSelectDate} setAddTodoState={setAddTodoState} setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} date={date} setDate={setDate} setTargetID={setTargetID} setCheckDetailState={setCheckDetailState} setAddDate={setAddDate} setCheckTodoState={setCheckTodoState} setEditTodoState={setEditTodoState}/>
  }else if(loginState && monthlyState === true){ // 로그인상태이면거 monthlyState가 참이면 selectedCalendar에 monthly컴포넌트 할당
    selectedCalendar = <Monthly setSelectYear={setSelectYear} setSelectMonth={setSelectMonth} setSelectDate={setSelectDate} setAddTodoState={setAddTodoState} setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} date={date} setDate={setDate} setTargetID={setTargetID} setCheckDetailState={setCheckDetailState} setAddDate={setAddDate} setCheckTodoState={setCheckTodoState} setEditTodoState={setEditTodoState}/>
  }

  return (
    <>{selectedCalendar}</>
  )
}

export default Calendar