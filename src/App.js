import Login from "./components/login";
import Clock from "./components/clock";
import Today from "./components/today";
import Calendar from "../src/contents/calendar"
import Select from "./components/select";
import SignUp from "./components/signUp";
import Todo from "./contents/todo";
import SelectTodo from "./components/selectTodo";
import Welcome from "./components/welcome";
import { useState } from "react";

function App(){
  let selectSign = null;
  let selected = null;
  let now = null;
  const [date, setDate] = useState(new Date());
  const [loginState, setLoginState] = useState(false);
  const [dailyState, setDailyState] = useState(false);
  const [weeklyState, setWeeklyState] = useState(false);
  const [monthlyState, setMonthlyState] = useState(true);
  const [signUpState, setSignUpState] = useState(false);
  const [todoState, setTodoState] = useState(false);
  const [addTodoState, setAddTodoState] = useState(false);
  const [checkTodoState, setCheckTodoState] = useState(false);
  const [loggedUser, setLoggedUser] = useState('')
  const [targetID, setTargetID] =useState('')
  const [editTodoState, setEditTodoState] = useState(false);
  const [checkDetailState, setCheckDetailState] = useState(false);
  const [selectedTime, setSelectedTime] = useState("시간선택");
  const [addDate, setAddDate] = useState('')


  if(todoState === true){
    selected = <Todo selectedTime={selectedTime} setSelectedTime={setSelectedTime} checkDetailState={checkDetailState} setCheckDetailState={setCheckDetailState} editTodoState={editTodoState} setEditTodoState={setEditTodoState} targetID={targetID} setTargetID={setTargetID} loggedUser={loggedUser} loginState={loginState} addTodoState={addTodoState} setAddTodoState={setAddTodoState} checkTodoState={checkTodoState} setCheckTodoState={setCheckTodoState} todoState={todoState} setTodoState={setTodoState} addDate={addDate} setAddDate={setAddDate}/>
  }else if(todoState === false){
    selected = <Calendar setAddTodoState={setAddTodoState} setSelectedTime={setSelectedTime} loggedUser={loggedUser} date={date} setDate={setDate} loginState={loginState} dailyState = {dailyState} weeklyState = {weeklyState} monthlyState = {monthlyState} setTodoState={setTodoState} setCheckDetailState={setCheckDetailState} setTargetID={setTargetID} setAddDate={setAddDate} setEditTodoState={setEditTodoState} setCheckTodoState={setCheckTodoState}/>
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
    now = <div className="border border-yellow-700 rounded w-96 ml-8 mt-2 pl-4 float-left">
    <Welcome loggedUser={loggedUser}/>
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
        <Select loginState={loginState} dailyState = {dailyState} setDailyState = {setDailyState} weeklyState = {weeklyState} setWeeklyState = {setWeeklyState} monthlyState = {monthlyState} setMonthlyState = {setMonthlyState} todoState={todoState} setTodoState={setTodoState} setAddDate={setAddDate} setDate={setDate}/>
        <SelectTodo loginState={loginState} addTodoState={addTodoState} setTodoState={setTodoState} setAddTodoState={setAddTodoState} checkTodoState={checkTodoState} setCheckTodoState={setCheckTodoState} setSelectedTime={setSelectedTime} setAddDate={setAddDate}/>
        {selected}
      </>
  )
}

export default App