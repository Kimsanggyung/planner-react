import AddTodoError from "../parts/addTodoError";
import { setItem } from '../context/indexed'
import { useEffect, useState } from "react";

function AddTodo({loggedUser, setTodoState, selectedTime, setSelectedTime, addDate, setAddDate, selectYear, setSelectYear, selectMonth, setSelectMonth, selectDate, setSelectDate}){

  const [todo, setTodo] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const pattern = /^\d{4}$/;

  useEffect(()=>{
    setAddDate(selectYear+"."+selectMonth+"."+selectDate)
  },[selectYear, selectMonth, selectDate])

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]
  
  const monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  const dateArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  let setTodoList = {
	  setTodo: todo,
	  setDetails: details,
    setDate: addDate,
    setTime: selectedTime,
    setUser: loggedUser,
    selectYear: selectYear,
    selectMonth: selectMonth,
    selectDate: selectDate
  }

  const inputTodoChange = event => { // 제목 입력창에 입력을 하는 등 이벤트가 발생하면 setTodo
    setTodo(event.target.value)
  }
  const inputDetailsChange = event => { //상세 입력창에 입력을 하는 등 이벤트가 발생하면 setDetail
    setDetails(event.target.value)
  }
  const selectTimeChange = event => { // 시간선택창에서 시간을 선택하면 그 시간으로 setSelectedTime
    setSelectedTime(event.target.value)
  }
  const selectYearChange = event => { //일짜 입력창에 입력을 하는 등 이벤트가 발생하면 setAddDate
    setSelectYear(event.target.value)
  }
  const selectMonthChange = event => {
    setSelectMonth(event.target.value)
  }
  const selectDateChange = event => {
    setSelectDate(event.target.value)
  }

  const submit = () => { // 등록버튼 함수
    if(selectedTime === "시간선택" || selectedTime === ""){  //시간을 선택했는지 확인
      setError("일정시간을 선택해주세요") //선택을 안했다면 에러메시지 세팅
      console.log("일정시간을 선택해주세요") // 콘솔로그에 에러메시지 보여주기
    }
    if(details === ""){ //상세내용 입력창이 비어있는것을 확인
      setError("상세내용을 입력해주세요") // 비어있다면 에러메시지 세팅
      console.log("상세내용을 입력해주세요")// 콘솔로그에 에러메시지 보여주기
    }
    if(todo === ""){ // 제목창이 비어있는 것을 확인
      setError("제목을 입력해주세요") // 비어있다면 에러메시지 세팅
      console.log("제목을 입력해주세요") // 콘솔로그에 에러메시지 보여주기
    }if(!pattern.test(selectYear)){ //날짜가 정확한지 정규표현식을 통해 확인
      setError("정확한 년도를 입력해주세요") // 날짜가 정확하지 않다면 에러메시지 세팅
      console.log("정확한 년도를 입력해주세요") // 콘솔로그에 에러메시지 보여주기
    }
    if(selectedTime !== "시간선택" && selectedTime !== "" && details !== "" && todo !== "" && pattern.test(selectYear)){ //시간선택을 했고 모든 입력창이 빈칸이 아니고 날짜를 정확하게 입력했다면 
      setError("");// 에러메시지 없애기
      setItem({setTodoList}); // indexedDB에 setTodoList 저장
      setTodoState(false); // 할일 추가를 완료했다면 달력화면으로 가도록 state값 변경
    }
  }

  const cancel = () => { // 취소버튼 함수
    setTodoState(false);  // 취소를 누르면 할일 추가 화면을 안보이게 하고 달력하면을 보여주기 위해 state값 변경
  }

  const timeOptions =  time.map((data, idx)=>{ //시간 선택 반복문
    return <option value={data.num} key={idx}>{data.num}시</option> // 값을 배열에 있는 숫자로 키값을 index로
  })
  const monthOptions = monthArray.map((num , idx)=>{
    return <option value={num} key={idx}>{num}월</option>
  })
  const dateOptions = dateArray.map((num, idx)=>{
    return <option value={num} key={idx}>{num}일</option>
  })

  return(
    <div className="flex items-center flex justify-center mt-32 font-Do">
      <div className="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
        <div className="mb-4">
          <span>제목: </span>
          <input type="text" onChange={inputTodoChange} className="border border-gray-500"></input>
        </div>

        <div className="mb-6">
          <span>세부내용: </span>
          <input type="text" onChange={inputDetailsChange} className="border border-gray-500"></input>
        </div>

        <div className="mb-8">
          <label>예정일:</label>
          <input type="text" name="start" onChange={selectYearChange} value={selectYear} className="border border-gray-500 w-10"></input>
          <span>년</span>
          <select id="month" value={selectMonth} onChange={selectMonthChange}>
            {monthOptions}
          </select>
          <select id="month" value={selectDate} onChange={selectDateChange}>
            {dateOptions}
          </select>
          <select id="time" value={selectedTime} onChange={selectTimeChange}>
            <option value="시간선택">시간선택</option>
            {timeOptions}
          </select>
          
        </div>
        <div className="text-red-500">
          <AddTodoError error = {error}/>
        </div>
        <div>
          <button onClick={submit} className="text-blue-500">등록</button>
          <button onClick={cancel} className="ml-2 text-red-500">취소</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodo;