import Login from "./components/login";
import Clock from "./components/clock";
import Today from "./components/today";
import Calendar from "../src/contents/calendar"
import Select from "./components/select";
import SignUp from "./components/signUp";
import Todo from "./contents/todo";
import SelectTodo from "./components/selectTodo";
import { useState } from "react";

function App(){
  let selectSign = null;
  let selected = null;
  let now = null;
  const [loginState, setLoginState] = useState(false);
  const [dailyState, setDailyState] = useState(false);
  const [weeklyState, setWeeklyState] = useState(false);
  const [monthlyState, setMonthlyState] = useState(true);
  const [signUpState, setSignUpState] = useState(false);
  const [todoState, setTodoState] = useState(false);
  const [addTodoState, setAddTodoState] = useState(false);
  const [checkTodoState, setCheckTodoState] = useState(false);
  const [loggedUser, setLoggedUser] = useState('')

  if(todoState === true){
    selected = <Todo loggedUser={loggedUser} loginState={loginState} addTodoState={addTodoState} setAddTodoState={setAddTodoState} checkTodoState={checkTodoState} setCheckTodoState={setCheckTodoState}/>
  }else if(todoState === false){
    selected = <Calendar loginState={loginState} dailyState = {dailyState} weeklyState = {weeklyState} monthlyState = {monthlyState}/>
  };

  if(signUpState === true){
    selectSign = <SignUp setSignUpState = {setSignUpState}/>
  }else if(signUpState === false){
    selectSign = <Login setLoggedUser={setLoggedUser} loginState={loginState} setLoginState={setLoginState} signUpState={signUpState} setSignUpState={setSignUpState} />
  };

  if(!loginState){
    now = <div className="border border-yellow-700 rounded w-96 ml-8 mt-8 pl-4">
    <Today/>
    <Clock/>
  </div>
  }else if(loginState){
    now = <div className="border border-yellow-700 rounded w-96 ml-8 mt-8 pl-4 float-left">
    <Today/>
    <Clock/>
  </div>
  }


  return (
      <>
        {now}
        <div>
          {selectSign}
        </div>
        <Select loginState={loginState} dailyState = {dailyState} setDailyState = {setDailyState} weeklyState = {weeklyState} setWeeklyState = {setWeeklyState} monthlyState = {monthlyState} setMonthlyState = {setMonthlyState} todoState={todoState} setTodoState={setTodoState}/>
        <SelectTodo loginState={loginState} addTodoState={addTodoState} setTodoState={setTodoState} setAddTodoState={setAddTodoState} checkTodoState={checkTodoState} setCheckTodoState={setCheckTodoState}/>
        {selected}
      </>
  )
}

export default App