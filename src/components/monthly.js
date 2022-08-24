import MonthlyItem from "../parts/monthlyItem";
import { useState, useEffect } from "react";
import { getItem } from "../context/indexed";
import { today } from "../context/today"
import '../style/style.css';



function Monthly({dateDate, setDateData, stateData, setStateData, loggedUser, odate, setDate, setTargetID}){

  const monthNames = [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const [getDate, setGetDate] = useState(odate);
	const [monthIndex, setMonthIndex] = useState(getDate.getMonth());
  const [year, setYear] = useState(odate.getFullYear());
  const [month, setMonth] = useState(monthNames[monthIndex]);
  const [firstDayIndex, setFirstDayIndex] = useState(new Date(year, monthIndex, 1).getDay());
  const [numberOfDays, setNumberOfDays] = useState(new Date(year, monthIndex+1, 0).getDate());
  const [calendarCellsQty, setCalendarCellsQty] = useState(numberOfDays + firstDayIndex);
  const [todoData, setTodoData] = useState(null);

  useEffect(()=>{ // odate가 변경될 때 마다
    setGetDate(odate); // getDate에 odate 세팅
    setMonthIndex(odate.getMonth()); // monthIndex에 odate monthIndex값 세팅
  }, [odate]);


  useEffect(() => { // monthIndex가 변경될 때 마다 실행
    setMonth(monthNames[monthIndex]);
    setFirstDayIndex(new Date(year, monthIndex, 1).getDay());
    setNumberOfDays(new Date(year, monthIndex+1, 0).getDate());
  },[monthIndex]);
  
  useEffect(()=>{ // firstDayIndex, numberOfDays가 변경될 때 마다 실행
    setCalendarCellsQty(numberOfDays + firstDayIndex);
  }, [firstDayIndex, numberOfDays]);

  useEffect(()=>{ // 컴포넌트가 실행될 때 1회 실행
    getItem().then((data)=> setTodoData(data));
  },[]);
	
	const goToNextMonth = () => { // 다음달 버튼 함수
		if (monthIndex >= 11) { // monthIndex보다 크거나 같으면
      setYear(year+1); // 1년을 더해준다
      return setMonthIndex(0); // monthIndex를 0으로
    };
    return setDate(new Date(year,monthIndex+1,1)); // 1달 더해주기(odate에 다음달 세팅해주기)
	};
	
	const goToPrevMonth = () => { // 이전달 버튼 함수
		if (monthIndex <= 0) { // monthIndex가 0보다 작거나 같다면
      setYear(year-1); //1년 빼주기
		  return setMonthIndex(11); // monthIndex를 11로
		};
		return setDate(new Date(year,monthIndex-1,1)); // 1달 빼주기(odate에 저번달 세팅해주기)
	};

  const viweAddTodo = (i,firstDayIndex) =>{ // 일정추가할 수 있게 하는 함수
    const selectDate = ((i-firstDayIndex)+1);  // 선택날짜는 parameter로 받아온 숫자와firstDayIndex를 뺀값에 1를 더한 날짜다
    const setDate = {
      ...dateDate, addDate: year+"."+(monthIndex+1)+"."+selectDate, 
      selectYear: year, selectMonth: monthIndex+1, selectDate: selectDate, selectedTime: "시간선택"
    };
    setDateData(setDate);
    const setState = {...stateData, todoState: true, selectedTodo: "addTodo"};
    setStateData(setState);
  };

  const findData = (data, i) => { // indexedDB에서 원하는 데이터 찾는 세팅
    const result = data.find(({setTodoList})=>{ // indexedDB에서 setTodoList 찾기
      if (!setTodoList) return false; // indexedDB에서 setTodoList를 못찾으면 false반환
      const {setDate, setUser} = setTodoList; // setTodoList에 있는 setDate, setUser를 상수로
      return (setDate === year+"."+(monthIndex+1)+'.'+((i - firstDayIndex) + 1) && setUser === loggedUser); // parameter로 받아온 날짜값과 setDate가 같고 setUser과 loggedUser이랑 같은 것을 반환
    });
    return result; // 찾은 데이터를 반환
  };

  const items = [];

  for(let i = 0; i <= calendarCellsQty; i++){ // 반복문 calendarCellsQty보다 작을 때까지 반복
    
    const noting = i < firstDayIndex || i >= numberOfDays+firstDayIndex; // 이전달이나 다음 날 날짜 부분을 체크
    let isActive = i === today.getDate()+(firstDayIndex-1) && monthIndex === today.getMonth() && year === today.getFullYear(); // 이번달 날짜 체크
    let classActive = isActive ? 'active' : ''; // 오늘날짜에 강조
    let monthList; // 렌더를 위한 변수
    if(noting){ // 이전달이나 다음날 날짜 자리면
      monthList  =  <li key={i}>
                      <div>&nbsp;</div>
                      <div className="w-48 h-7 overflow-hidden"></div>
                      <div></div>
                    </li>
    }else if(todoData && !noting){ // 이번달 날짜 자리면
      monthList  =  <li className={classActive} key={i}>
                      <div className="dateList" onClick={()=>viweAddTodo(i ,firstDayIndex)}>{(i - firstDayIndex) + 1}</div>
                      <MonthlyItem month={month} getList={findData(todoData, i)} stateData={stateData} setStateData={setStateData} setTargetID={setTargetID} getDate = {year+"."+(monthIndex+1)+'.'+((i - firstDayIndex) + 1)} />
                    </li>
    } 
 
    items.push( // 빈 배열에 넣어주기
      monthList
    );
  };
	 
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

