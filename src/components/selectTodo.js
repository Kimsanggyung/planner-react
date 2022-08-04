function SelectTodo({setSelectedTime, setTodoState, loginState, addTodoState, setAddTodoState, checkTodoState, setCheckTodoState, setAddDate}){

  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let today = year + '.' + month + '.' + date;

  const viweAddTodo = () => {
    if(checkTodoState === true){
      setCheckTodoState(false)
    }
    setTodoState(true);
    setAddTodoState(true);
    setSelectedTime("시간선택")
    setAddDate(today)
  }
  const viweCheckTodo = () => {
    if(addTodoState === true){
      setAddTodoState(false);
    };
    setTodoState(true);
    setCheckTodoState(true);
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