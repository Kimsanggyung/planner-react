import React, { useState } from 'react';

function Daily(){
  const [date, setDate] = useState(new Date());

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},{num:11},{num:12},
    {num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ];


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
  const spans =  time.map((data, idx)=>{
    return <div className='mb-4' key={idx}>{data.num}시</div>
  }) 
  return(
    <div>
      <div className="w-full h-32 bg-blue-400 mt-24 p-6 font-Do">
        <div className="font-Do flex item-center flex justify-center text-xl float-none">{date.getFullYear()}년</div>
        <div className="font-Do flex item-center flex justify-center text-xl mt-2">
          <button onClick={prevDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">어제</button>
          <span className="text-xl ml-4 mr-4 font-bolds">{date.getMonth()+1}월{date.getDate()}일</span>
          <button onClick={nextDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">내일</button>
        </div>
      </div>

      <div className="p-6 bg-violet-100">
        <div className="text-xl font-Do mb-4 underline cursor-pointer"> 
          {spans}
        </div>
      </div>

    </div>
  )
}

export default Daily;