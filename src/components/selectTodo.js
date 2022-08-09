function SelectTodo({setSelectedTime, setTodoState, loginState, addTodoState, setAddTodoState, checkTodoState, setCheckTodoState, setAddDate, setSelectYear, setSelectMonth, setSelectDate}){

  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let today = year + '.' + month + '.' + date;

  const viweAddTodo = () => { // 일정추가 화면이 보이게 하는 함수
    if(checkTodoState === true){ // checkTodoState 참이면
      setCheckTodoState(false); // 일정추가 화면이 보이게 하기위해 checkTodoState를 false로 
    };
    setTodoState(true); // 일정추가 화면이 보이게 하기위해 todoState를 true로
    setAddTodoState(true); // 일정추가 화면이 보이게 하기위해 addTodoState를 true로
    setSelectedTime("시간선택"); // 오늘일정추가 버튼을 누르면 select 값이 시간선택이 되도록
    setAddDate(today); // 오늘일정추가 버튼을 누르면 일정날짜를 오늘이 되도록
    setSelectYear(year);
    setSelectMonth(month);
    setSelectDate(date);
  };

  const viweCheckTodo = () => { //전체일정 확인할 수 있도록 하는 함수
    if(addTodoState === true){ // addTodoState가 참이면
      setAddTodoState(false); //전체일정을 확인하기 위해 addTodoState를 false로
    };
    setTodoState(true); // 전체일정을 확인하기 위해 todoState를 true로
    setCheckTodoState(true); // 전체일정을 확인하기 위해 checkTodoState true로
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