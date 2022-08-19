function SelectTodo({stateData, setStateData, dateData, setDateData, setDate}){

  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let today = year + '.' + month + '.' + date;

  const openAddTodo = {...stateData, selectedTodo: "addTodo", todoState: true};
  const onenCheckTodo = {...stateData, selectedTodo: "checkTodo", todoState: true};
  const setTime = {...dateData, selectYear: year, selectMonth: month, selectDate: date, selectedTime: "시간선택", addDate: today};

  const viweAddTodo = () => { // 일정추가 화면이 보이게 하는 함수
    setStateData(openAddTodo);
    setDateData(setTime);
  };

  const viweCheckTodo = () => { //전체일정 확인할 수 있도록 하는 함수
    setStateData(onenCheckTodo);
  };

  const viweToday = () => {
    setDate(getDate);
  };

  if(stateData.loginState){
    return(
      <span className="font-Do text-s mr-8 mt-10 flex justify-end">
        <button onClick={viweAddTodo} className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-2">오늘일정추가</button>
        <button onClick={viweToday} className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 mr-2 rounded">오늘</button>
        <button onClick={viweCheckTodo} className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">전체일정확인</button>
      </span>
    )
  }
}

export default SelectTodo;