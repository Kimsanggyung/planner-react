import React, { useState } from 'react';

function Daily(){
  const [date, setDate] = useState(new Date());

  const nextDay = () => {
    const adddDate = (date) => {
      var result = new Date(date);
      result.setDate(result.getDate() + 1);
      return result;
    }
    return setDate(adddDate(date))
  }

  const prevDay = () => {
    const minusDate = (date) => {
      var result = new Date(date);
      result.setDate(result.getDate() - 1);
      return result;
    }
    return setDate(minusDate(date))
  }
  return(
    <div>
      <div className="w-full h-32 bg-blue-400 mt-24 p-6 font-jua">
        <div className="font-jua flex item-center flex justify-center text-xl float-none">{date.getFullYear()}년</div>
        <div className="font-jua flex item-center flex justify-center text-xl mt-2">
          <button onClick={prevDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">어제</button>
          <span className="text-xl ml-4 mr-4 font-bolds">{date.getMonth()+1}월{date.getDate()}일</span>
          <button onClick={nextDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">내일</button>
        </div>
      </div>
    </div>
  )
}

export default Daily;