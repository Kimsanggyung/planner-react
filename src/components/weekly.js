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

  let weekStart = new Date(year, month, date - day);
  let weekMon = new Date(year, month, date - (day-1));
  let weekTue = new Date(year, month, date - (day-2));
  let weekWed = new Date(year, month, date - (day-3));
  let weekThu = new Date(year, month, date - (day-4));
  let weekFri = new Date(year, month, date - (day-5));
  let weekEnd = new Date(year, month, date - (day-6)); 

  let sunDate = weekStart.getDate()
  let monDate = getAddDate(weekStart, 1);
  let tueDate = getAddDate(weekStart, 2);
  let wedDate = getAddDate(weekStart, 3);
  let thuDate = getAddDate(weekStart, 4);
  let friDate = getAddDate(weekStart, 5);
  let setdayDate = weekEnd.getDate()           

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},{num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  useEffect(()=>{
    getItem().then((data)=> setTodoData(data));
  },[]);

  const viweAddTodo = (num, date) => {
    setSelectedTime(num);
    setTodoState(true);
    setAddTodoState(true)
    const selectDate = date.getFullYear()+"."+date.getMonth()+"."+date.getDate()
    setAddDate(selectDate)
  }

  const findWeekData = (time, data, weekStr) => {
    const weekDataArr = [
      {day: "일", weekInt: sunDate}, {day: "월", weekInt: monDate}, {day: "화", weekInt: tueDate}, {day: "수", weekInt: wedDate}, {day: "목", weekInt: thuDate}, {day: "금", weekInt: friDate}, {day: "토", weekInt: setdayDate}
    ];
    const findWeekDay = weekDataArr.find((data)=>{
      return data.day === weekStr
    });
    const result = data.find(({setTodoList})=>{
      if (!setTodoList) return false;
      const {setTime, setDate, setUser} = setTodoList;
      const dateCheck = (setDate === year+"."+(month)+'.'+(findWeekDay.weekInt)) || (setDate === year+"."+(month-1)+'.'+(findWeekDay.weekInt)) || (time && setDate === year+"."+(month+1)+'.'+(findWeekDay.weekInt))
      return (parseInt(setTime) === time && dateCheck && setUser === loggedUser)
    });
    return result;
  };

  const sunDay = time.map((data, idx)=>{
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

  const monDay = time.map((data, idx)=>{
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

  const tueDay = time.map((data, idx)=>{
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

  const wedDay = time.map((data, idx)=>{
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

  const thuDay = time.map((data, idx)=>{
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

  const friDay = time.map((data, idx)=>{
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

  const setDay = time.map((data, idx)=>{
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