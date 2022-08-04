import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";
import EditTodo from "../components/editTodo";
import CheckDetail from "../components/checkDetail";

function Todo({selectedTime,editTodoState, addDate, setSelectedTime, setEditTodoState, targetID, setTargetID, loginState, addTodoState, checkTodoState, loggedUser, setCheckTodoState, setTodoState, checkDetailState ,setCheckDetailState}){
  let selectedTodo = null;
  console.log(checkDetailState)
  if(loginState && addTodoState){
    selectedTodo = <AddTodo selectedTime={selectedTime} setSelectedTime={setSelectedTime} loggedUser={loggedUser} setTodoState={setTodoState} addDate={addDate}/>
  }else if(loginState && checkTodoState){
    selectedTodo =  <CheckTodo loggedUser={loggedUser} setEditTodoState={setEditTodoState} setTodoState={setTodoState} setTargetID={setTargetID} setCheckTodoState={setCheckTodoState} setCheckDetailState={setCheckDetailState}/>
  }else if(loginState && editTodoState){
    selectedTodo = <EditTodo targetID={targetID} loggedUser={loggedUser} setTodoState={setTodoState}/>
  }else if(loginState && checkDetailState){
    selectedTodo = <CheckDetail setEditTodoState={setEditTodoState} targetID={targetID} setTargetID={setTargetID} setTodoState={setTodoState}  setCheckDetailState={setCheckDetailState}/>
  }
  

  return (
    <>{selectedTodo}</>
  )
}

export default Todo;