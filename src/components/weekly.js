import React, { useState } from 'react';

function Weekly(){
  const [getDate, setGetDate] = useState(new Date());
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let week = getDate.getDay();

  let weekStart = new Date(year, month, date - week);
  let weekEnd = new Date(year, month, date + (6 - week));
  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},{num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]
  const timeLoop =  time.map((data, idx)=>{
    return <div className="mt-4"key={idx}>  
      <span>{data.num}시:</span> 
    </div>
  })

/*<div className="mt-4">  
  <span on:click={()=>viweAddTodo(num, {getWeekStart})}>{num}시:</span> 
  <WeeklyItem data={findWeekData(num, data, "일")} />
</div>*/


  const getAddDate = (date, num) => {
    const temp = new Date(date);
    temp.setDate(temp.getDate() + num);
    return temp.getDate();
  }
  let monDate = getAddDate(weekStart, 1);
  let tueDate = getAddDate(weekStart, 2);
  let wedDate = getAddDate(weekStart, 3);
  let thuDate = getAddDate(weekStart, 4);
  let friDate = getAddDate(weekStart, 5);

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
            <div className="text-2xl bg-cyan-100 ">{weekStart.getDate()} 일</div>
            {timeLoop}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{monDate} 월</div>
            {timeLoop}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{tueDate} 화</div>
            {timeLoop}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{wedDate} 수</div>
            {timeLoop}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{thuDate} 목</div>
            {timeLoop}
          </div>
          <div className="w-1/4">
            <span className="text-2xl bg-cyan-100">{friDate} 금</span>
            {timeLoop}
          </div>
          <div className="w-1/4">
            <div className="text-2xl bg-cyan-100">{weekEnd.getDate()} 토</div>
            {timeLoop}
          </div>
        </div>
      </div>
    </>
  )
}

export default Weekly;