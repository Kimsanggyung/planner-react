import Daily from "../components/daily";
import Weekly from "../components/weekly";
import Monthly from "../components/monthly";
import { useContext } from "react";
import  { stateContext } from "../context/stateContext"

function Calendar({dailyState, weeklyState, monthlyState}){
  const { loginState } = useContext(stateContext)
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