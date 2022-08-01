import Daily from "../components/daily";
import Weekly from "../components/weekly";
import Monthly from "../components/monthly";
function Calendar({loginState, dailyState, weeklyState, monthlyState}){
  let selectedCalendar = null;
  if(loginState && dailyState === true){
    selectedCalendar = <Daily/>
  }
  else if(loginState && weeklyState === true){
    selectedCalendar =  <Weekly/>
  }
  else if(loginState && monthlyState === true){
    selectedCalendar = <Monthly/>
  }

  return (
    <>{selectedCalendar}</>
  )
}

export default Calendar