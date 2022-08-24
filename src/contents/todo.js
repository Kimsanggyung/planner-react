import AddTodo from "../components/addTodo";
import CheckTodo from "../components/checkTodo";
import EditTodo from "../components/editTodo";
import CheckDetail from "../components/checkDetail";

function Todo({stateData, setStateData, dateData, setDateData, targetID, setTargetID, loggedUser}){
  let selectedTodo; //render를 위한 변수
  if(stateData.loginState && stateData.selectedTodo === "addTodo"){ // 로그인상태이면서 addTodoState가 참이면 addTodo 컴포넌트를 selectedTodo에 할당
    selectedTodo = <AddTodo dateData={dateData} setDateData={setDateData} loggedUser={loggedUser} stateData={stateData} setStateData={setStateData} />
  }else if(stateData.loginState && stateData.selectedTodo === "checkTodo"){ // 로그인상태이면서 checkTodoState가 참이면 checkTodo 컴포넌트를 selectedTodo에 할당
    selectedTodo =  <CheckTodo loggedUser={loggedUser} stateData={stateData} setStateData={setStateData} setTargetID={setTargetID}/>
  }else if(stateData.loginState && stateData.selectedTodo === "editTodo"){ // 로그인상태이면서 editTodoState가 참이면 editTodo 컴포넌트를 selectedTodo에 할당
    selectedTodo = <EditTodo targetID={targetID} loggedUser={loggedUser} stateData={stateData} setStateData={setStateData} dateData={dateData} setDateData={setDateData}/>
  }else if(stateData.loginState && stateData.selectedTodo === "checkDetail"){ // 로그인상태이면서 checkDetailState가 참이면 checkDetail 컴포넌트를 selectedTodo에 할당
    selectedTodo = <CheckDetail stateData={stateData} setStateData={setStateData} targetID={targetID} setTargetID={setTargetID}/>
  }
  

  return (
    <>{selectedTodo}</>
  );
};

export default Todo;