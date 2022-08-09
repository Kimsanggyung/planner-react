function Select({loginState, dailyState, setDailyState, weeklyState, setWeeklyState, monthlyState, setMonthlyState, todoState, setTodoState, setAddDate, setDate, setSelectYear, setSelectMonth, setSelectDate}){

  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let today = year + '.' + month + '.' + date;

  const viweMonth = () => { // 달력보이게 하는 함수
    if(weeklyState === true){ // weeklyStat가 참이면
      setWeeklyState(false); // 달력을 보여주기 위해서 weeklyState를 false로
    };
    if(dailyState === true){ // dailyState가 참이면
      setDailyState(false); // 달력을 보여주기 위해서 dailyState를 false로
    };
    if(todoState === true){ //todoState가 참이면
      setTodoState(false);  // 달력을 보여주기 위해서 todoState를 false로
    };
    setMonthlyState(true); // 달력을 보여주기 위해서 monthlyState를 true로
    setAddDate(today); // 일정추가 날짜가 오늘이 되도록
    setDate(getDate); //오늘 날짜가 보이도록 setDate 오늘날짜
    setSelectYear(year);
    setSelectMonth(month);
    setSelectDate(date);
  }

  const viweWeek = () => { // 주간달력을 보이게 히는 함수
    if(monthlyState === true){ // monthlyState가 참이면
      setMonthlyState(false); // 주간달력을 보여주기 위해서 dailyState를 false로
    };
    if(dailyState === true){ // dailyState가 참이면
      setDailyState(false); // 주간달력을 보여주기 위해서 dailyState를 false로
    };
    if(todoState === true){ //todoState가 참이면
      setTodoState(false); // 주간달력을 보여주기 위해서 todoState를 false로
    };
    setWeeklyState(true); // 주간달력을 보여주기 위해서 weeklyState를 false로
    setAddDate(today); // 일정추가 날짜가 오늘이 되도록
    setDate(getDate); //오늘 날짜가 보이도록 setDate 오늘날짜
    setSelectYear(year);
    setSelectMonth(month);
    setSelectDate(date);
  }

  const viweDaily = () => { //일력을 보이게 하는 함수
    if(monthlyState === true){ // monthlyState가 참이면
      setMonthlyState(false); // 주간달력을 보여주기 위해서 dailyState를 false로
    };
    if(weeklyState === true){ // weeklyStat가 참이면
      setWeeklyState(false); // 일력을 보여주기 위해서 weeklyState를 false로
    };
    if(todoState === true){ //todoState가 참이면
      setTodoState(false); // 일력을 보여주기 위해서 todoState를 false로
    };
    setDailyState(true); // 일력을 보여주기 위해서 weeklyState를 false로
    setAddDate(today); // 일정추가 날짜가 오늘이 되도록
    setDate(getDate); //오늘 날짜가 보이도록 setDate 오늘날짜
    setSelectYear(year);
    setSelectMonth(month);
    setSelectDate(date);
  }

  if(loginState){
    return(
      <div>
        <span className="font-Do flex item-center text-white flex flex justify-center text-xl float-left float-right ml-96 mt-6">
          <span onClick={viweMonth} className="bg-red-500 hover:bg-green-500 text-white py-2 px-4 border border-blue-700 rounded mr-1">
            <button>월간</button>
          </span>
          <span onClick={viweWeek} className="bg-orange-500 hover:bg-blue-500 text-white py-2 px-4 border border-blue-700 rounded mr-1">
            <button>주간</button>
          </span>
          <span onClick={viweDaily} className="bg-green-500 hover:bg-orange-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <button>일간</button>
          </span>
        </span>
      </div>
    )
  }
}

export default Select;