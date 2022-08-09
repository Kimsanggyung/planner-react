import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";
import EditTodo from "../components/editTodo";
import CheckDetail from "../components/checkDetail";

function Todo({selectedTime, setAddDate, editTodoState, addDate, setSelectedTime, setEditTodoState, targetID, setTargetID, loginState, addTodoState, checkTodoState, loggedUser, setCheckTodoState, setTodoState, checkDetailState ,setCheckDetailState}){
  let selectedTodo; //render를 위한 변수
  if(loginState && addTodoState){ // 로그인상태이면서 addTodoState가 참이면 addTodo 컴포넌트를 selectedTodo에 할당
    selectedTodo = <AddTodo setAddDate={setAddDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} addDate={addDate}/>
  }else if(loginState && checkTodoState){ // 로그인상태이면서 checkTodoState가 참이면 checkTodo 컴포넌트를 selectedTodo에 할당
    selectedTodo =  <CheckTodo loggedUser={loggedUser} setEditTodoState={setEditTodoState} setTodoState={setTodoState} setTargetID={setTargetID} setCheckTodoState={setCheckTodoState} setCheckDetailState={setCheckDetailState}/>
  }else if(loginState && editTodoState){ // 로그인상태이면서 editTodoState가 참이면 editTodo 컴포넌트를 selectedTodo에 할당
    selectedTodo = <EditTodo targetID={targetID} loggedUser={loggedUser} setTodoState={setTodoState}/>
  }else if(loginState && checkDetailState){ // 로그인상태이면서 checkDetailState가 참이면 checkDetail 컴포넌트를 selectedTodo에 할당
    selectedTodo = <CheckDetail setEditTodoState={setEditTodoState} targetID={targetID} setTargetID={setTargetID} setTodoState={setTodoState}  setCheckDetailState={setCheckDetailState}/>
  }
  

  return (
    <>{selectedTodo}</>
  )
}

export default Todo;