import React, { useEffect, useState } from 'react';
import { today } from "../context/today"
import { time } from "../baseData"
import DaillyItem from "../parts/dailyItem"
import axios from 'axios';

function Daily({dateDate, setDateData, loggedUser, stateData, setStateData, date, setDate, targetID, setTargetID}){

  const [todoData, setTodoData] = useState(null);

  useEffect(()=>{ //컴포넌트가 실행됐을 때
    // 서버와 통신해서 데이터를 todo 가져옴
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

  /**
   * 일정추가 컴포넌트 실행 함수 
   * @param {*} time 일정을 추가할 시간을 받아옴
   * 해당일짜로 dateDate 세팅
   */
  const viweAddTodo = (time) => { 
    const setDate = {...dateDate, selectedTime: time, selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()};
    setDateData(setDate);
    const setState = {...stateData, todoState: true, selectedTodo: "addTodo"};
    setStateData(setState);
  };

  /**
   * 다음날 버튼함수
   * 다음날 날짜로 dateData세팅
   * @returns 계산된 다음날 날짜를 date에 세팅한다
   */
  const nextDay = () => {
    /**
     * 다음날 계산 함수
     * @param {*} date 현재 보고있는 날짜
     * @returns 계산된 다음날 날짜 반환
     */
    const adddDate = (date) => { 
      let result = new Date(date); 
      result.setDate(result.getDate() + 1);
      return result;
    };
    const setAddDate = {...dateDate, addDate: date.getFullYear()+"."+(date.getMonth()+1)+"."+(date.getDate()+1), selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()+1};
    setDateData(setAddDate);
    return setDate(adddDate(date)); 
  };

  /**
   * 전날 버튼함수
   * dateData전날 날짜로 세팅
   * @returns 계산된 전날 날짜를 date에 세팅한다
   */
  const prevDay = () => {
    /**
     * 
     * @param {*} date 현재 보고있는 날짜
     * @returns 게산된 전날 날짜 반환
     */
    const minusDate = (date) => {
      var result = new Date(date);
      result.setDate(result.getDate() - 1);
      return result;
    };
    const setMinusDate = {...dateDate, addDate: date.getFullYear()+"."+(date.getMonth()+1)+"."+(date.getDate()-1), selectYear: date.getFullYear(), selectMonth: date.getMonth()+1, selectDate: date.getDate()-1};
    setDateData(setMinusDate);
    return setDate(minusDate(date)); 
  };

  /**
   * 가져온 데이터에서 원하는 값을 찾는 함수
   * @param {*} time 시간값을 받아옴
   * @param {*} data 모든 데이터를 받아옴
   * @returns 원하는 값을 찾아서 반환
   */
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