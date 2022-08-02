import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";
import EditTodo from "../components/editTodo";

function Todo({editTodoState, setEditTodoState, targetID, setTargetID, loginState, addTodoState, checkTodoState, loggedUser, setCheckTodoState, setTodoState}){
  let selectedTodo = null;
  console.log(editTodoState)
  if(loginState && addTodoState){
    selectedTodo = <AddTodo loggedUser={loggedUser} setTodoState={setTodoState}/>
  }else if(loginState && checkTodoState){
    selectedTodo =  <CheckTodo loggedUser={loggedUser} setEditTodoState={setEditTodoState} setTodoState={setTodoState} setTargetID={setTargetID} setCheckTodoState={setCheckTodoState}/>
  }else if(loginState && editTodoState){
    selectedTodo = <EditTodo targetID={targetID} loggedUser={loggedUser} setTodoState={setTodoState}/>
  }
  

  return (
    <>{selectedTodo}</>
  )
}

export default Todo;