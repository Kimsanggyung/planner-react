import React, { useEffect, useState } from 'react';
import { today } from "../context/today"
import { time } from "../baseData"
import DaillyItem from "../parts/dailyItem"
import axios from 'axios';

function Daily({dateDate, setDateData, loggedUser, stateData, setStateData, date, setDate, targetID, setTargetID}){

  const [todoData, setTodoData] = useState(null);

  useEffect(()=>{ //컴포넌트가 실행됐을 때

    axios
      .get("http://127.0.0.1:8000/todo/")
      .then((response)=>{
        setTodoData([...response.data]);
        console.log("success")
      })
      .catch(function(error){
        console.log(error);
      });

  },[]);

  const viweAddTodo = (time) => { //일정추가 함수
    const setDate = {...dateDate, selectedTime: time, selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()};
    setDateData(setDate);
    const setState = {...stateData, todoState: true, selectedTodo: "addTodo"};
    setStateData(setState);
  };

  const nextDay = () => { //다음날 버튼 함수
    const adddDate = (date) => { //날짜 추가 함수
      let result = new Date(date); //result date날짜로
      result.setDate(result.getDate() + 1);// data에 1을 더하기
      return result; // result값 반환
    };
    const setAddDate = {...dateDate, addDate: date.getFullYear()+"."+(date.getMonth()+1)+"."+(date.getDate()+1), selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()+1};
    setDateData(setAddDate);
    return setDate(adddDate(date)); //data를 다음날 날짜로 세팅
  };

  const prevDay = () => { //전날 버튼 함수
    const minusDate = (date) => { //날짜 뻬기 함수
      var result = new Date(date); //result date날짜로
      result.setDate(result.getDate() - 1); // data에 1을 더하기
      return result; // result값 반환
    };
    const setMinusDate = {...dateDate, addDate: date.getFullYear()+"."+(date.getMonth()+1)+"."+(date.getDate()-1), selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()-1};
    setDateData(setMinusDate);
    return setDate(minusDate(date)); //data를 전날 날짜로 세팅
  };
 
  const findData = (time, data) => { //inedxedDB에서 원하는 값찾기
    const result = data.find((data)=>{ //setTodoList 찾음
      if (!data) return false; // setTodoList가 없다면 false반환
      return (data.setTime === time && data.setDate === date.getFullYear()+"."+(date.getMonth()+1)+'.'+ date.getDate() && data.setUser === loggedUser)// 일정과 보고있는 날짜 시간이같고 세팅한 유저와 현제유저가 같은걸 반환
    });
    return result; //원하는 값 반환
  };

  const parts = time.map((data, idx)=>{ // time으로 반복
    return( 
            <div className="text-xl font-Do mb-4 underline cursor-pointer" key={idx}> 
              <span className='mr-4' onClick={()=>viweAddTodo(data.time)}>{data.time}:</span>
              {todoData? 
                <>
                <DaillyItem getList={findData(data.time, todoData)} stateData={stateData} setStateData={setStateData} setTargetID={setTargetID}/>
                </>
                :
                <span></span>
              }              
            </div>
    );
  });

  let dateCheck = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate(); // 현재 날짜를 오늘과 비교
  let dateClass = dateCheck? "text-xl ml-4 mr-4 text-purple-700 font-bolds" : "text-xl ml-4 mr-4 font-bolds"; // 현재 날짜와 오늘 날짜가 같다면 글씨색을 바꿔 오늘날짜라는 것을 표현

  return(
    <div>
      <div className="w-full h-32 bg-blue-400 mt-24 p-6 font-Do">
        <div className="font-Do flex item-center flex justify-center text-xl float-none">{date.getFullYear()}년</div>
        <div className="font-Do flex item-center flex justify-center text-xl mt-2">
          <button onClick={prevDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">어제</button>
          <span className={dateClass}>{date.getMonth()+1}월 {date.getDate()}일</span>
          <button onClick={nextDay} className="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">내일</button>
        </div>
      </div>

      <div className="p-6 bg-violet-100">
        <div className="text-xl font-Do mb-4 underline cursor-pointer"> 
          {parts}
        </div>
      </div>

    </div>
  );
};

export default Daily;