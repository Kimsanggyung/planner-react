import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";

function Todo({loginState, addTodoState, checkTodoState, loggedUser}){
  let selectedTodo = null;
  console.log(loginState, addTodoState, checkTodoState)
  if(loginState && addTodoState){
    selectedTodo = <AddTodo loggedUser={loggedUser}/>
  }
  else if(loginState && checkTodoState){
    selectedTodo =  <CheckTodo/>
  }

  return (
    <>{selectedTodo}</>
  )
}

export default Todo;