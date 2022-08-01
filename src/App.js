import Login from "./components/login";
import Clock from "./components/clock";
import Today from "./components/today";
import Calendar from "../src/contents/calendar"
import Select from "./components/select";
import SignUp from "./components/signUp";
import { useState } from "react";

function App(){
  let selectSign = null
  const [loginState, setLoginState] = useState(false)
  const [dailyState, setDailyState] = useState(false)
  const [weeklyState, setWeeklyState] = useState(false)
  const [monthlyState, setMonthlyState] = useState(true)
  const [signUpState, setSignUpState] = useState(false)
  if(signUpState === true){
    selectSign = <SignUp setSignUpState = {setSignUpState}/>
  }
  else if(signUpState === false){
    selectSign = <Login loginState={loginState} setLoginState={setLoginState} signUpState={signUpState} setSignUpState={setSignUpState}/>
  }
  return (
      <>
        <div className="border border-yellow-700 rounded w-96 ml-8 mt-8 pl-4">
          <Today/>
          <Clock/>
        </div>
        <div>
          {selectSign}
        </div>
        <Select loginState={loginState} dailyState = {dailyState} setDailyState = {setDailyState} weeklyState = {weeklyState} setWeeklyState = {setWeeklyState} monthlyState = {monthlyState} setMonthlyState = {setMonthlyState}/>
        <Calendar loginState={loginState} dailyState = {dailyState} weeklyState = {weeklyState} monthlyState = {monthlyState}/>
      </>
  )
}

export default App