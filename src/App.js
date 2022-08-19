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

function App(){
  let selectSign;
  let selected;
  let now;

  const [date, setDate] = useState(new Date());
  const [loggedUser, setLoggedUser] = useState(null);
  const [targetID, setTargetID] =useState(null);

  const [stateData, setStateData] = useState({
    loginState: false,
    signUpState: false,
    todoState: false,
    selectedCalendar: "month",
    selectedTodo: ""
  });
  
  const [dateData, setDateData] = useState({
    selectYear: null,
    selectMonth: null,
    selectDate: null,
    selectedTime: "시간선택",
    addDate: null
  });

  if(stateData.todoState === true){ //todoState가 참이면 todo컴포넌트 보여주기
    selected =  <Todo 
                  stateData={stateData} setStateData={setStateData}
                  dateData={dateData} setDateData={setDateData}
                  targetID={targetID} setTargetID={setTargetID} loggedUser={loggedUser}
                />
  }else if(stateData.todoState === false){ //todoState가 거짓이면 calendar 컴포넌트 보여주기
    selected =  <Calendar
                  stateData={stateData} setStateData={setStateData}
                  dateDate={dateData} setDateData={setDateData}
                  loggedUser={loggedUser} date={date} setDate={setDate}
                  targetID={targetID} setTargetID={setTargetID}
                />
  };

  if(stateData.signUpState === true){ //signUpState가 참이면 signUp컴포넌트 보여주기
    selectSign = <SignUp stateData={stateData} setStateData={setStateData}/>
  }else if(stateData.signUpState === false){  //signUpState가 거짓이면 login컴포넌트 보여주기
    selectSign =  <Login setLoggedUser={setLoggedUser} stateData={stateData} setStateData={setStateData}/>
  };

  if(!stateData.loginState){ //loginState가 참이 아니면 
    now = <div className="border border-yellow-700 rounded w-96 ml-8 mt-8 pl-4">
    <Today/>
    <Clock/>
  </div>
  }else if(stateData.loginState){ //loginState 참이면
    now = <div className="border border-yellow-700 rounded w-96 ml-8 pl-4 float-left">
    <Welcome loggedUser={loggedUser}/> <Logout stateData={stateData} setStateData={setStateData}/>
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
        <Select 
          stateData={stateData} setStateData={setStateData}
          dateData={dateData} setDateData={setDateData}
          setDate={setDate}
        />
        <SelectTodo
          stateData={stateData} setStateData={setStateData}
          dateData={dateData} setDateData={setDateData}
          setDate={setDate}
        />
        {selected}
      </>
  )
}

export default App