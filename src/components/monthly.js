import MonthlyItem from "../parts/monthlyItem";
import { useState, useEffect } from "react";
import '../style/style.css'



function Monthly({ setAddTodoState, setCheckTodoState, setSelectedTime, loggedUser, setTodoState, date, setTargetID, setCheckDetailState, setAddDate}){

  const getDate = new Date();
	const today = {
		dayNumber: getDate.getDate(),
		month: getDate.getMonth(),
		year: getDate.getFullYear(),
	}

	const monthNames = [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
	const [monthIndex, setMonthIndex] = useState(getDate.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(monthNames[monthIndex])
  const [firstDayIndex, setFirstDayIndex] = useState(new Date(year, monthIndex, 1).getDay())
  const [numberOfDays, setNumberOfDays] = useState(new Date(year, monthIndex+1, 0).getDate());
  const [calendarCellsQty, setCalendarCellsQty] = useState(numberOfDays + firstDayIndex)

  useEffect(() => {
    setMonth(monthNames[monthIndex]);
    setFirstDayIndex(new Date(year, monthIndex, 1).getDay());
    setNumberOfDays(new Date(year, monthIndex+1, 0).getDate());
    
    console.log(`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`)

  },[monthIndex]);
  
  useEffect(()=>{

    setCalendarCellsQty(numberOfDays + firstDayIndex);

  }, [firstDayIndex, numberOfDays])
	
	const goToNextMonth = () => {
		if (monthIndex >= 11) {
      setYear(year+1)
      return setMonthIndex(0)
    }
	  return setMonthIndex(monthIndex+1)
	}
	
	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
      setYear(year-1);
		  return setMonthIndex(11);
		}
		return setMonthIndex(monthIndex-1);
	}

  const viweAddTodo = (i,firstDayIndex) =>{
    const selectDate = ((i-firstDayIndex)+1)
    setAddDate(year+"."+(monthIndex+1)+"."+selectDate)
    setTodoState(true)
    setAddTodoState(true)
    setSelectedTime("시간선택")
  }

  const items = []

  for(let i = 0; i <= calendarCellsQty; i++){
    const noting = i < firstDayIndex || i >= numberOfDays+firstDayIndex;
    let isActive = i === today.dayNumber+(firstDayIndex-1) && monthIndex === today.month && year === today.year;
    let classActive = isActive ? 'active' : '';
    const test =
      noting? 
      <li key={i}>
        <div>&nbsp;</div>
        <div className="w-48 h-7 overflow-hidden"></div>
        <div></div>
      </li>
    :
      <li className={classActive} key={i}>
        <div className="dateList" onClick={()=>viweAddTodo(i ,firstDayIndex)}>{(i - firstDayIndex) + 1}</div>
        <MonthlyItem month={month} loggedUser={loggedUser} setCheckTodoState={setCheckTodoState} setAddTodoState={setAddTodoState} setTodoState={setTodoState} setCheckDetailState={setCheckDetailState} setTargetID={setTargetID} getDate = {year+"."+(monthIndex+1)+'.'+((i - firstDayIndex) + 1)} />
      </li>

    items.push(
      test
    )
  }
	 
  return (
    <>
      <div className="month">
        <ul>
          <li className="prev" onClick={goToPrevMonth}>&#10094;</li>
          <li className="next" onClick={goToNextMonth}>&#10095;</li>
          <li>{month}<br></br>
            <span id="suuu">{year}년</span>
          </li>
        </ul>
      </div>
      <ul className="weekdays">
        <li>일</li>
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
      </ul>
      <ul className="days">
        {items} 
      </ul> 
    </>
  );
};

export default Monthly;

