function SelectTodo({setTodoState, loginState, addTodoState, setAddTodoState, checkTodoState, setCheckTodoState}){

  const viweAddTodo = () => {
    if(checkTodoState === true){
      setCheckTodoState(false)
    }
    setTodoState(true);
    setAddTodoState(true);
    console.log("viweAddTodo");
  }
  const viweCheckTodo = () => {
    if(addTodoState === true){
      setAddTodoState(false);
    };
    setTodoState(true);
    setCheckTodoState(true);
    console.log("viweCheckTodo");
  }

  if(loginState){
    return(
      <span className="font-Do text-s mr-8 mt-10 flex justify-end">
        <button onClick={viweAddTodo} className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-2">오늘일정추가</button>
        <button onClick={viweCheckTodo} className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">전체일정확인</button>
      </span>
    )
  }
}

export default SelectTodo;