function Select({ stateData, setStateData }){

  const openDaily = {...stateData, selectedCalendar: "daily", todoState: false};
  const onenWeekly = {...stateData, selectedCalendar: "week", todoState: false};
  const openMonthly = {...stateData, selectedCalendar: "month", todoState: false};

  const viweMonth = () => { // 달력보이게 하는 함수
    setStateData(openMonthly); // 달력을 보여주기 위해서 monthlyState를 true로
  }

  const viweWeek = () => { // 주간달력을 보이게 히는 함수
    setStateData(onenWeekly)
  }

  const viweDaily = () => { //일력을 보이게 하는 함수
    setStateData(openDaily); // 일력을 보여주기 위해서 weeklyState를 false로
  }

  if(stateData.loginState){ // 로그인상태일때
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