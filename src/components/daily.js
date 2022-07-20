import React, { useState } from 'react';

function Daily(){
  const date = new Date(2022,1,19);
  let [month, setMonth] = useState(date.getMonth())
  let [year, setYear] = useState(date.getFullYear())
  let [day, setDay] = useState(date.getDate())
  let thisMonthlast = new Date(year, month+1, 0).getDate();
  let beforeMonthLast = new Date(year, month, 0).getDate();
  

  const nextDay = () => {
    console.log(thisMonthlast)
    if (day >= thisMonthlast) {
      setMonth(month+1)
      return setDay(day=1)
    }
    if(month >= 12){
      console.log(day)
      setYear(year+1)
      return setMonth(month = 0);
    }
    return setDay(day+1)
  }

  const prevDay = () => {
    console.log(beforeMonthLast)
    if (day <= 1) {
      setMonth(month-1)
      return setDay(beforeMonthLast);
    }
    if(month <= 0){
      setYear(year-1)
      return setMonth(month = 11);
    }
    return setDay(day-1);
  }
  return(
    <div>
      <div className="w-full h-32 bg-blue-400 mt-24 p-6 font-jua">
        <div className="font-jua flex item-center flex justify-center text-xl float-none">{year}년</div>
        <div className="font-jua flex item-center flex justify-center text-xl mt-2">
          <button onClick={prevDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">어제</button>
          <span className="text-xl ml-4 mr-4 font-bolds">{month+1}월{day}일</span>
          <button onClick={nextDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">내일</button>
        </div>
      </div>
    </div>
  )
}

export default Daily;