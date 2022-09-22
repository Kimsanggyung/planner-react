import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { today } from "../context/today";
import { time } from "../baseData"
import WeeklyItem from '../parts/weeklyItem';


function Weekly({dateDate, setDateData, stateData, setStateData, loggedUser, odate, setDate, setTargetID, token}){
  const [getDate, setGetDate] = useState(odate);
  const [todoData, setTodoData] = useState(null);
  let year = getDate.getFullYear();
  let month = getDate.getMonth();
  let date = getDate.getDate();
  let day = getDate.getDay();

  useEffect(()=>{ // odate 변경될 때 마다 실행
    setGetDate(odate); // getDate에 odate세팅
  }, [odate]);

  const getAddDate = (date, time) => { // 이번주날짜를 계산하기 위한 함수
    const temp = new Date(date); // parameter로 받아온 date를 계산할 날짜로
    temp.setDate(temp.getDate() + time); // parameter로 받아온 숫자를 더해 날짜 계산
    return temp.getDate(); // 계산한 날짜 반환
  };

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
  let satdayDate = weekEnd.getDate()// 토요일 날짜는 이번주가 끝나는 날짜
  
  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/todo/",{
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then((response)=>{
      setTodoData(response.data);
      console.log("success")
    })
    .catch(function(error){
      console.log(error);
    })
  },[token])

  const viweAddTodo = (time, date) => { // 일정추가 할 수 있게 하는 버튼 함수
    const selectDate = date.getFullYear()+"."+date.getMonth()+"."+date.getDate(); // 선택 날짜 상수
    const setAddDate = {...dateDate, 
      selectedTime: time, addDate: selectDate, selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()
    };
    setDateData(setAddDate);
    const setState = {...stateData, todoState: true , selectedTodo: "addTodo"};
    setStateData(setState);
  };

  const findWeekData = (time, data, weekStr) => { // 원하는 데이터를 찾는 함수
    const weekDataArr = [ // 일주일 날짜 배열
      {day: "일", weekInt: sunDate}, {day: "월", weekInt: monDate}, {day: "화", weekInt: tueDate}, {day: "수", weekInt: wedDate}, {day: "목", weekInt: thuDate}, {day: "금", weekInt: friDate}, {day: "토", weekInt: satdayDate}
    ];
    const findWeekDay = weekDataArr.find((weekData)=>{ // 위에 선언한 배열에서 원하는 값을 찾는 함수
      return weekData.day === weekStr; // parameter로 받아온 weekStr와 배열에 있는 day와 같은걸 반환
    });
    const result = data.find((data)=>{ // 원하는 데이터를 찾는 함수
      if (!data) return false; // data가 없으면 false반환
      const dateCheck = data.setDate === year+"."+(month+1)+'.'+(findWeekDay.weekInt); // 데이터와 날짜 비교
      return (data.setTime === time && dateCheck && data.setUser === loggedUser); // 지정한 시간, 날짜가 같고 사용자가 같은걸 반환
    });
    return result; // 찾은 데이터 반환
  };

  const sunDay = time.map((data, idx)=>{ // 배열로 반복하는 일요일 배열
    return(
      <div className="mt-4 pl-8" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekStart)}>{data.time}:</span>
        {todoData? 
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "일")} 
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    );
  });

  const monDay = time.map((data, idx)=>{ // 배열로 반복하는 월요일 배열
    return(
      <div className="mt-4 pl-2" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekMon)}>{data.time}:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "월")}
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    );
  });

  const tueDay = time.map((data, idx)=>{ // 배열로 반복하는 화요일 배열
    return(
      <div className="mt-4 pl-2" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekTue)}>{data.time}:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "화")} 
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    );
  });

  const wedDay = time.map((data, idx)=>{ // 배열로 반복하는 수요일 배열
    return(
      <div className="mt-4 pl-2" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekWed)}>{data.time}:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "수")} 
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    )
  })

  const thuDay = time.map((data, idx)=>{ // 배열로 반복하는 목요일 배열
    return(
      <div className="mt-4 pl-2" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekThu)}>{data.time}:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "목")}
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    )
  })

  const friDay = time.map((data, idx)=>{ // 배열로 반복하는 금요일 배열
    return(
      <div className="mt-4 pl-2" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekFri)}>{data.time}:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "금")} 
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    )
  })

  const satDay = time.map((data, idx)=>{ // 배열로 반복하는 토요일 배열
    return(
      <div className="mt-4 pl-2" key={idx}>  
        <span className='mr-2' onClick={()=>viweAddTodo(data.time, weekEnd)}>{data.time}:</span>
        {todoData?
          <>
            <WeeklyItem getList={findWeekData(data.time, todoData, "토")}
              setTargetID={setTargetID} stateData={stateData} setStateData={setStateData}
            />
          </>
          :
          <span></span>
        }          
      </div>
    )
  })




  const nextWeek = () => { // 다음주 버튼 함수
    const nextDate = (getDate) => { // 다음주 날짜를 계산하느 함수
      let result = new Date(getDate); // 현재보고 있는 날짜 세팅
      result.setDate(result.getDate() + 7); // 현재에서 7일 뒤를 계산
      return result; // 계산한 값 반환
    }
    setDate(nextDate(getDate)); // odate에 다음주 날짜 세팅
    return setGetDate(nextDate(getDate)); //getDate에 다음주 날짜 세팅
  };

  const prevWeek = () => { // 전주 버튼 함수
    const pastDate = (getDate) => { // 전주 날짜를 계산하느 함수
      let result = new Date(getDate); // 현재보고 있는 날짜 세팅
      result.setDate(result.getDate() - 7); // 현재에서 7일 전를 계산
      return result; // 계산한 값 반환
    };
    setDate(pastDate(getDate)); // odate에 다음주 날짜 세팅
    return setGetDate(pastDate(getDate)); //getDate에 다음주 날짜 세팅
  };

  let sunCheck = weekStart.getFullYear() === today.getFullYear() && weekStart.getMonth() === today.getMonth() && weekStart.getDate() === today.getDate(); // 일요일 날짜를 오늘과 비교
  let monCheck = weekMon.getFullYear() === today.getFullYear() && weekMon.getMonth() === today.getMonth() && weekMon.getDate() === today.getDate(); // 월요일 날짜를 오늘과 비교
  let tueCheck = weekTue.getFullYear() === today.getFullYear() && weekTue.getMonth() === today.getMonth() && weekTue.getDate() === today.getDate(); // 화요일 날짜를 오늘과 비교
  let wedCheck = weekWed.getFullYear() === today.getFullYear() && weekWed.getMonth() === today.getMonth() && weekWed.getDate() === today.getDate(); // 수요일 날짜를 오늘과 비교
  let thuCheck = weekThu.getFullYear() === today.getFullYear() && weekThu.getMonth() === today.getMonth() && weekThu.getDate() === today.getDate(); // 목요일 날짜를 오늘과 비교
  let friCheck = weekFri.getFullYear() === today.getFullYear() && weekFri.getMonth() === today.getMonth() && weekFri.getDate() === today.getDate(); // 금요일 날짜를 오늘과 비교
  let satChrck = weekEnd.getFullYear() === today.getFullYear() && weekEnd.getMonth() === today.getMonth() && weekEnd.getDate() === today.getDate(); // 토요일 날짜를 오늘과 비교

  let sunClass = sunCheck? "text-2xl text-red-400 bg-cyan-500 pl-8" : "text-2xl text-red-400 bg-cyan-100 pl-8"; // 일요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현
  let monClass = monCheck? "text-2xl bg-cyan-500 pl-2" : "text-2xl bg-cyan-100 pl-2"; // 월요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현
  let tueClass = tueCheck? "text-2xl bg-cyan-500 pl-2" : "text-2xl bg-cyan-100 pl-2"; // 회요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현
  let wedClass = wedCheck? "text-2xl bg-cyan-500 pl-2" : "text-2xl bg-cyan-100 pl-2"; // 수요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현
  let thuCalss = thuCheck? "text-2xl bg-cyan-500 pl-2" : "text-2xl bg-cyan-100 pl-2"; // 목요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현
  let friClass = friCheck? "text-2xl bg-cyan-500 pl-2" : "text-2xl bg-cyan-100 pl-2"; // 금요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현
  let satClass = satChrck? "text-2xl text-blue-400 bg-cyan-500 pl-2" : "text-2xl text-blue-400 bg-cyan-100 pl-2"; // 토요일 날짜와 오늘 날짜가 같다면 배경색을 바꿔 오늘이라는 것을 표현

  return(
    <>
      <div className="w-full h-32 bg-blue-500 p-6 mt-24">
        <div className="font-Do flex item-center flex justify-center text-xl  float-none">{year}년</div>
        <div className="font-Do flex item-center flex justify-center text-xl mt-2 ">
          <button onClick={prevWeek} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
          <span className="text-xl font-bolds ml-4 mr-4">{weekStart.getMonth()+1}.{weekStart.getDate()}~{weekEnd.getMonth()+1}.{weekEnd.getDate()}</span>
          <button onClick={nextWeek} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
        </div>
      </div>

      <div className="text-xl w-full bg-sky-100 font-Do">
        <div className="cursor-pointer flex">
          <div className="w-1/4">
            <div className={sunClass}>{weekStart.getDate()} 일</div>
            {sunDay}
          </div>
          <div className="w-1/4">
            <div className={monClass}>{monDate} 월</div>
            {monDay}
          </div>
          <div className="w-1/4">
            <div className={tueClass}>{tueDate} 화</div>
            {tueDay}
          </div>
          <div className="w-1/4">
            <div className={wedClass}>{wedDate} 수</div>
            {wedDay}
          </div>
          <div className="w-1/4">
            <div className={thuCalss}>{thuDate} 목</div>
            {thuDay}
          </div>
          <div className="w-1/4">
            <div className={friClass}>{friDate} 금</div>
            {friDay}
          </div>
          <div className="w-1/4">
            <div className={satClass}>{satdayDate} 토</div>
            {satDay}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weekly;