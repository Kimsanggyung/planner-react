import React, { useEffect, useState } from 'react';
import { getItem } from "../context/indexed"
import WeeklyItem from '../parts/weeklyItem';


function Weekly({setTodoState, setCheckTodoState, setCheckDetailState, loggedUser, targetID, setSelectedTime, setTargetID, setAddTodoState, setAddDate, setEditTodoState}){
  const [getDate, setGetDate] = useState(new Date());
  const [todoData, setTodoData] = useState(null);
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let day = getDate.getDay();

  const getAddDate = (date, num) => {
    const temp = new Date(date);
    temp.setDate(temp.getDate() + num);
    return temp.getDate();
  }

  let weekStart = new Date(year, month, date - day); // 일요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스만큼을 벤다
  let weekMon = new Date(year, month, date - (day-1)); // 월요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스 1을 뺸 만큼을 벤다
  let weekTue = new Date(year, month, date - (day-2)); // 화요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스 2을 뺸 만큼을 벤다
  let weekWed = new Date(year, month, date - (day-3)); // 수요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스 3을 뺸 만큼을 벤다
  let weekThu = new Date(year, month, date - (day-4)); // 목요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스 4을 뺸 만큼을 벤다
  let weekFri = new Date(year, month, date - (day-5)); // 금요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스 5을 뺸 만큼을 벤다
  let weekEnd = new Date(year, month, date - (day-6)); // 토요일 날짜계산을 위해서 오늘날짜에서 오늘 요일의 인덱스 6을 뺸 만큼을 벤다

  let sunDate = weekStart.getDate(); // 일요일 날짜는 이번주 시작하는 날짜 
  let monDate = getAddDate(weekStart, 1); // 월요일 날짜는 이번주 시작하는 날짜에서 하루 뒤
  let tueDate = getAddDate(weekStart, 2); // 화요일 날짜는 이번주 시작하는 날짜에서 이틀 뒤
  let wedDate = getAddDate(weekStart, 3); // 수요일 날짜는 이번주 시작하는 날짜에서 사흘 뒤
  let thuDate = getAddDate(weekStart, 4); // 목요일 날짜는 이번주 시작하는 날짜에서 나흘 뒤
  let friDate = getAddDate(weekStart, 5); // 금요일 날짜는 이번주 시작하는 날짜에서 닷새 뒤
  let setdayDate = weekEnd.getDate()// 토요일 날짜는 이번주가 끝나는 날짜           

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},{num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  useEffect(()=>{ //컴포넌트가 실행될 떄 1회 실행
    getItem().then((data)=> setTodoData(data)); // indexedDB에 저장되있는 데이터를 가져와서 todoDate에 세팅
  },[]);

  const viweAddTodo = (num, date) => { // 일정추가 할 수 있게 하는 버튼 함수
    setSelectedTime(num); // 시간선택을 클릭한 시간으로 세팅
    setTodoState(true); // 일정추가 컴포넌트를 실해시키기 위해서 todoState를 참으로
    setAddTodoState(true); // 일정추가 컴포넌트를 실행시키기 위해서 addTodoState를 참으로
    const selectDate = date.getFullYear()+"."+date.getMonth()+"."+date.getDate(); // 선택 날짜 상수
    setAddDate(selectDate); // 선택 날짜를 클릭한 날짜로 세팅
  }

  const findWeekData = (time, data, weekStr) => { // 원하는 데이터를 찾는 함수
    const weekDataArr = [ // 일주일 날짜 배열
      {day: "일", weekInt: sunDate}, {day: "월", weekInt: monDate}, {day: "화", weekInt: tueDate}, {day: "수", weekInt: wedDate}, {day: "목", weekInt: thuDate}, {day: "금", weekInt: friDate}, {day: "토", weekInt: setdayDate}
    ];
    const findWeekDay = weekDataArr.find((weekData)=>{ // 위에 선언한 배열에서 원하는 값을 찾는 함수
      return weekData.day === weekStr; // parameter로 받아온 weekStr와 배열에 있는 day와 같은걸 반환
    });
    const result = data.find(({setTodoList})=>{ // indexedDB에서 원하는 데이터를 찾는 함수
      if (!setTodoList) return false; // indexedDB에 setTodoList가 없으면 false반환
      const {setTime, setDate, setUser} = setTodoList; // setTodoList에 있는 setTime, setDate, setUser를 상수로 선언
      const dateCheck = setDate === year+"."+(month)+'.'+(findWeekDay.weekInt) // 데이터와 날짜 비교
      return (parseInt(setTime) === time && dateCheck && setUser === loggedUser) // 지정한 시간, 날짜가 같고 사용자가 같은걸 반환
    });
    return result; // 찾은 데이터 반환
  };

  const sunDay = time.map((data, idx)=>{ // 배열로 반복하는 일요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2 text-red-500' onClick={()=>viweAddTodo(data.num, weekStart)}>{data.num}시:</span>
        {todoData? 
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "일")} targetID={targetID} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setCheckTodoState={setCheckTodoState} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })

  const monDay = time.map((data, idx)=>{ // 배열로 반복하는 월요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.num, weekMon)}>{data.num}시:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "월")} targetID={targetID} setCheckTodoState={setCheckTodoState} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })

  const tueDay = time.map((data, idx)=>{ // 배열로 반복하는 화요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.num, weekTue)}>{data.num}시:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "화")} targetID={targetID} setEditTodoState={setEditTodoState} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })

  const wedDay = time.map((data, idx)=>{ // 배열로 반복하는 수요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.num, weekWed)}>{data.num}시:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "수")} targetID={targetID} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })

  const thuDay = time.map((data, idx)=>{ // 배열로 반복하는 목요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.num, weekThu)}>{data.num}시:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "목")} targetID={targetID} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })

  const friDay = time.map((data, idx)=>{ // 배열로 반복하는 금요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.num, weekFri)}>{data.num}시:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "금")} targetID={targetID} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })

  const setDay = time.map((data, idx)=>{ // 배열로 반복하는 토요일 배열
    return(
      <div className="mt-4" key={idx}>  
        <span className='mr-2 text-blue-500' onClick={()=>viweAddTodo(data.num, weekEnd)}>{data.num}시:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.num, todoData, "토")} targetID={targetID} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState} />
          </>
          :
          <span>데이터를 불러오는 중입니다.</span>
        }          
      </div>
    )
  })




  const nextWeek = () => {
    const nextDate = (getDate) => {
      var result = new Date(getDate);
      result.setDate(result.getDate() + 7);
      return result;
    }
    return setGetDate(nextDate(getDate));
  }

  const prevWeek = () => {
    const nextDate = (getDate) => {
      var result = new Date(getDate);
      result.setDate(result.getDate() - 7);
      return result;
    }
    return setGetDate(nextDate(getDate));
  }
  return(
    <>
      <div className="w-full h-32 bg-blue-500 p-6 mt-24">
        <div className="font-Do flex item-center flex justify-center text-xl  float-none">{year}년</div>
        <div className="font-Do flex item-center flex justify-center text-xl mt-2 ">
          <button onClick={prevWeek} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
          <span className="text-xl font-bolds ml-4 mr-4">{weekStart.getMonth()}.{weekStart.getDate()}~{weekEnd.getMonth()}.{weekEnd.getDate()}</span>
          <button onClick={nextWeek} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
        </div>
      </div>

      <div className="text-xl w-full bg-sky-100 p-4 font-Do">
        <div className="cursor-pointer flex ml-6">
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100 text-red-500">{weekStart.getDate()} 일</div>
            {sunDay}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{monDate} 월</div>
            {monDay}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{tueDate} 화</div>
            {tueDay}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{wedDate} 수</div>
            {wedDay}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{thuDate} 목</div>
            {thuDay}
          </div>
          <div className="w-1/4">
            <span className="text-2xl bg-cyan-100">{friDate} 금</span>
            {friDay}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100 text-blue-500">{setdayDate} 토</div>
            {setDay}
          </div>
        </div>
      </div>
    </>
  )
}

export default Weekly;