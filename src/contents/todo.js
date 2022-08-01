import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";

function Todo({loginState, addTodoState, checkTodoState}){
  let selectedTodo = null;
  console.log(loginState, addTodoState, checkTodoState)
  if(loginState && addTodoState){
    selectedTodo = <AddTodo/>
  }
  else if(loginState && checkTodoState){
    selectedTodo =  <CheckTodo/>
  }

  return (
    <>{selectedTodo}</>
  )
}

export default Todo;