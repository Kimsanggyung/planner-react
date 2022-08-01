import React, { useState } from 'react';

function Weekly({ loginState }){
  const [getDate, setGetDate] = useState(new Date());
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let week = getDate.getDay();

  let weekStart = new Date(year, month, date - week);
  let weekEnd = new Date(year, month, date + (6 - week));


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
    <div className="w-full h-32 bg-blue-500 p-6 mt-24">
      <div className="font-jua flex item-center flex justify-center text-xl  float-none">{year}년</div>
      <div className="font-jua flex item-center flex justify-center text-xl mt-2 ">
        <button onClick={prevWeek} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
        <div className="text-xl font-bolds ml-4 mr-4">{weekStart.getMonth()}.{weekStart.getDate()}-{weekEnd.getMonth()}.{weekEnd.getDate()}</div>
        <button onClick={nextWeek} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
      </div>
      <div>{weekStart.getDate()} 일 {monDate} 월 {tueDate} 화 {wedDate} 수 {thuDate} 목 {friDate} 금 {weekEnd.getDate()} 토</div>
    </div>
  )
}

export default Weekly;