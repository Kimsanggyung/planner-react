import Login from "./components/login";
import Clock from "./components/clock";
import Today from "./components/today";
import Calendar from "../src/contents/calendar"
import Select from "./components/select";
import SignUp from "./components/signUp";
import Todo from "./contents/todo";
import SelectTodo from "./components/selectTodo";
import Welcome from "./components/welcome";
import Logout from "./components/logout";
import { useState } from "react";
import Test from "./components/test";

function App(){
  let selectSign;
  let selected;
  let now;
  let test;

  const [date, setDate] = useState(new Date());
  const [loginState, setLoginState] = useState(false); //
  const [dailyState, setDailyState] = useState(false); //
  const [weeklyState, setWeeklyState] = useState(false); // 
  const [monthlyState, setMonthlyState] = useState(true); //
  const [signUpState, setSignUpState] = useState(false); //
  const [todoState, setTodoState] = useState(false); //
  const [addTodoState, setAddTodoState] = useState(false); //
  const [checkTodoState, setCheckTodoState] = useState(false); //
  const [editTodoState, setEditTodoState] = useState(false); //
  const [checkDetailState, setCheckDetailState] = useState(false); //
  const [loggedUser, setLoggedUser] = useState(null);
  const [targetID, setTargetID] =useState(null);
  const [addDate, setAddDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("시간선택"); //
  const [selectYear, setSelectYear] = useState(null); //
  const [selectMonth, setSelectMonth] = useState(null); //
  const [selectDate, setSelectDate] = useState(null); //

  const [state, setState] = useState([
    {loginState: false},
    {monthlyState: true},
    {weeklyState: false},
    {dailyState: false},
    {signUpState: false},
    {todoState: false},
    {addTodoState: false},
    {editTodoState: false},
    {checkTodoState: false},
    {checkDetailState: false},
    {testState: true} 
  ]);
  
  const [select, setSelect] = useState([
    {selectYear: null},
    {selectMonth: null},
    {selectDate: null},
    {selectedTime: null}
  ])

  const test1 = state[10]
  if(test1.testState){
    test = <Test state={state} setState={setState}/>
  }

  if(todoState === true){ //todoState가 참이면 todo컴포넌트 보여주기
    selected =  <Todo 
                  selectYear={selectYear} setSelectYear={setSelectYear} selectMonth={selectMonth} 
                  setSelectMonth={setSelectMonth} selectDate={selectDate} setSelectDate={setSelectDate} 
                  selectedTime={selectedTime} setSelectedTime={setSelectedTime} checkDetailState={checkDetailState} 
                  setCheckDetailState={setCheckDetailState} editTodoState={editTodoState} setEditTodoState={setEditTodoState} 
                  targetID={targetID} setTargetID={setTargetID} loggedUser={loggedUser} loginState={loginState} addTodoState={addTodoState} 
                  setAddTodoState={setAddTodoState} checkTodoState={checkTodoState} setCheckTodoState={setCheckTodoState} todoState={todoState} 
                  setTodoState={setTodoState} addDate={addDate} setAddDate={setAddDate}
                />
  }else if(todoState === false){ //todoState가 거짓이면 calendar 컴포넌트 보여주기
    selected =  <Calendar selectYear={selectYear} setSelectYear={setSelectYear} selectMonth={selectMonth} 
                  setSelectMonth={setSelectMonth} selectDate={selectDate} setSelectDate={setSelectDate} 
                  setAddTodoState={setAddTodoState} setSelectedTime={setSelectedTime} loggedUser={loggedUser} date={date} 
                  setDate={setDate} loginState={loginState} dailyState = {dailyState} weeklyState = {weeklyState} 
                  monthlyState = {monthlyState} setTodoState={setTodoState} setCheckDetailState={setCheckDetailState} 
                  setTargetID={setTargetID} setAddDate={setAddDate} setEditTodoState={setEditTodoState} 
                  setCheckTodoState={setCheckTodoState}
                />
  };

  if(signUpState === true){ //signUpState가 참이면 signUp컴포넌트 보여주기
    selectSign = <SignUp setSignUpState = {setSignUpState}/>
  }else if(signUpState === false){  //signUpState가 거짓이면 login컴포넌트 보여주기
    selectSign =  <Login setLoggedUser={setLoggedUser} loginState={loginState} setLoginState={setLoginState} 
                    signUpState={signUpState} setSignUpState={setSignUpState} 
                  />
  };

  if(!loginState){ //loginState가 참이 아니면 
    now = <div className="border border-yellow-700 rounded w-96 ml-8 mt-8 pl-4">
    <Today/>
    <Clock/>
  </div>
  }else if(loginState){ //loginState 참이면
    now = <div className="border border-yellow-700 rounded w-96 ml-8 pl-4 float-left">
    <Welcome loggedUser={loggedUser}/> <Logout setLoginState={setLoginState}/>
    <Today/>
    <Clock/>
  </div>
  }


  return (
      <>
        {now}

        {test}
        <div>
          {selectSign}
        </div>
        <Select loginState={loginState} dailyState = {dailyState} setDailyState = {setDailyState} 
          weeklyState = {weeklyState} setWeeklyState = {setWeeklyState} monthlyState = {monthlyState} 
          setMonthlyState = {setMonthlyState} todoState={todoState} setTodoState={setTodoState} setAddDate={setAddDate} 
          setDate={setDate} setSelectYear={setSelectYear} setSelectMonth={setSelectMonth} setSelectDate={setSelectDate}
        />
        <SelectTodo loginState={loginState} addTodoState={addTodoState} setTodoState={setTodoState} 
          setAddTodoState={setAddTodoState} setDate={setDate} checkTodoState={checkTodoState} 
          setCheckTodoState={setCheckTodoState} setSelectedTime={setSelectedTime} setAddDate={setAddDate} 
          setSelectYear={setSelectYear} setSelectMonth={setSelectMonth} setSelectDate={setSelectDate}
        />
        {selected}
      </>
  )
}

export default App