import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";

function Todo({loginState, addTodoState, checkTodoState, loggedUser, setCheckTodoState, setTodoState}){
  let selectedTodo = null;
  if(loginState && addTodoState){
    selectedTodo = <AddTodo loggedUser={loggedUser} setTodoState={setTodoState}/>
  }
  else if(loginState && checkTodoState){
    selectedTodo =  <CheckTodo loggedUser={loggedUser} setCheckTodoState={setCheckTodoState}/>
  }

  return (
    <>{selectedTodo}</>
  )
}

export default Todo;