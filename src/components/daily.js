import React, { useEffect, useState } from 'react';
import { getItem } from "../context/indexed"
import { today } from "../context/today"
import DaillyItem from "../parts/dailyItem"

function Daily({date, setDate, setTodoState, setCheckDetailState, setCheckTodoState, setEditTodoState, loggedUser, targetID, setSelectedTime, setTargetID, setAddTodoState, setAddDate, setSelectYear, setSelectMonth, setSelectDate}){

  const [todoData, setTodoData] = useState(null);

  const time = [ {time:"하루종일"},
    {time:"1시"},{time:"2시"},{time:"3시"},{time:"4시"},{time:"5시"},{time:"6시"},{time:"7시"},{time:"8시"},{time:"9시"},{time:"10시"},{time:"11시"},{time:"12시"},
    {time:"13시"},{time:"14시"},{time:"15시"},{time:"16시"},{time:"17시"},{time:"18시"},{time:"19시"},{time:"20시"},{time:"21시"},{time:"22시"},{time:"23시"},{time:"24시"}
  ];

  useEffect(()=>{ //컴포넌트가 실행됐을 때
    getItem().then((data)=> setTodoData(data)); //indexedDB에서 가져온 데이터를 todoData에 세팅
  },[]);

  const viweAddTodo = (time) => { //일정추가 함수
    setSelectedTime(time); //parameter로 받아온 숫자로 selectedTime 세팅
    setTodoState(true); // 일정추가 화면을 보여주기 위해 일정추가 컴포넌트의 부모컴포넌트 state를 true로
    setAddTodoState(true); //일정추가 화면을 보여주기 위해서 일정추가 컴포넌트의 state를 true로
    setSelectYear(date.getFullYear()); // 일정추가 화면에서 년도 입력창 값을 현재 년도로 설정
    setSelectMonth(date.getMonth()+1);  // 일정추가 화면에서 월 선택창 값을 현재 월로 설정
    setSelectDate(date.getDate()); // 일정추가 화면에서 일 선택창 값을 현재 일로 설정
  }

  const nextDay = () => { //다음날 버튼 함수
    const adddDate = (date) => { //날짜 추가 함수
      let result = new Date(date); //result date날짜로
      result.setDate(result.getDate() + 1);// data에 1을 더하기
      return result; // result값 반환
    }
    setAddDate(date.getFullYear()+"."+(date.getMonth()+1)+"."+(date.getDate()+1)); // addDate를 다음날 날짜로 세팅
    setSelectYear(date.getFullYear()); // selectYear를 다음날 년도로 세팅
    setSelectMonth(date.getMonth()+1); // selectMonth를 다음날 월로 세팅
    setSelectDate(date.getDate()+1); // selectDate를 다음날 날짜로 세팅
    return setDate(adddDate(date)); //data를 다음날 날짜로 세팅
  }

  const prevDay = () => { //전날 버튼 함수
    const minusDate = (date) => { //날짜 뻬기 함수
      var result = new Date(date); //result date날짜로
      result.setDate(result.getDate() - 1); // data에 1을 더하기
      return result; // result값 반환
    }
    setAddDate(date.getFullYear()+"."+(date.getMonth()+1)+"."+(date.getDate()-1)); // addDate를 전날 날짜로 세팅
    setSelectYear(date.getFullYear()); // // selectMonth를 전날 월로 세팅
    setSelectMonth(date.getMonth()+1); // selectMonth를 전날 월로 세팅
    setSelectDate(date.getDate()-1); // selectDate를 전날 날짜로 세팅
    return setDate(minusDate(date)); //data를 전날 날짜로 세팅
  } 
 
  const findData = (time, data) => { //inedxedDB에서 원하는 값찾기
    const result = data.find(({setTodoList})=>{ //setTodoList 찾음
      if (!setTodoList) return false; // setTodoList가 없다면 false반환
      const {setTime, setDate, setUser} = setTodoList; //setTodoList에 있는 setTime setDate setUser 상수로
      return (setTime === time && setDate === date.getFullYear()+"."+(date.getMonth()+1)+'.'+ date.getDate() && setUser === loggedUser)// 일정과 보고있는 날짜 시간이같고 세팅한 유저와 현제유저가 같은걸 반환
    })
    return result; //원하는 값 반환
  }

  const parts = time.map((data, idx)=>{ // time으로 반복
    return( 
            <div className="text-xl font-Do mb-4 underline cursor-pointer" key={idx}> 
              <span className='mr-4' onClick={()=>viweAddTodo(data.time)}>{data.time}:</span>
              {todoData? 
                <>
                <DaillyItem getList={findData(data.time, todoData)} targetID={targetID} setCheckTodoState={setCheckTodoState} setCheckDetailState={setCheckDetailState} setTodoState={setTodoState} setEditTodoState={setEditTodoState} setTargetID={setTargetID} setAddTodoState={setAddTodoState}/>
                </>
                :
                <span></span>
              }              
            </div>
    )
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
  )
}

export default Daily;