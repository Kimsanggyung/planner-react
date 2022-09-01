import { useEffect, useState } from "react";
import EditError from "../parts/editError";
import axios from "axios";
import { time, monthArray, dateArray } from "../baseData";

function EditTodo({targetID, loggedUser, stateData, setStateData, dateData, setDateData}){

  const [date, setDate] = useState('');
  const [todo, setTodo] = useState('');
  const [details, setDetails] = useState('');
  const [selectTime, setTime] = useState('');
  const [error, setError] = useState('');
  const pattern = /^\d{4}$/; // 년도는 4자리 숫자여야한다

  const timeOptions =  time.map((data, idx)=>{ // 시간 선택 반복문
    return <option value={data.time} key={idx}>{data.time}</option> // 값을 배열에 있는 숫자로 키값을 index로
  });
  const monthOptions = monthArray.map((num , idx)=>{ // 월 선택 반복문
    return <option value={num} key={idx}>{num}월</option>
  });
  const dateOptions = dateArray.map((num, idx)=>{ // 일 선택 빈복문
    return <option value={num} key={idx}>{num}일</option> // 값을 배열에 있는 숫자로 키값을 index로
  });

  const inputTodoChange = event => { // 제목 입력창에 입력을 하는 등 이벤트가 발생하면 setTodo
    setTodo(event.target.value);
  };
  const inputDetailsChange = event => { // 상세 입력창에 입력을 하는 등 이벤트가 발생하면 setDetail
    setDetails(event.target.value);
  };
  const selectTimeChange = event => { // 시간선택창에서 시간을 선택하면 그 시간으로 setSelectedTime
    const selectYear = {...dateData, selectedTime: event.target.value};
    setDateData(selectYear);
  };
  const selectYearChange = event => { // 년도 입력창에 입력을 하는 등 이벤트가 발생하면 setSelectYear
    const selectYear = {...dateData, selectYear: event.target.value};
    setDateData(selectYear);
  };
  const selectMonthChange = event => { // 월 산텍창에서 선택을을 하는 등 이벤트가 발생하면 setSelectMonth
    const selectMonth = {...dateData, selectMonth: event.target.value};
    setDateData(selectMonth);  
  };
  const selectDateChange = event => { // 일 산텍창에서 선택을을 하는 등 이벤트가 발생하면 setSelectDate
    const selectDate = {...dateData, selectDate: event.target.value};
    setDateData(selectDate);
  };

  useEffect(() => { // 컴포넌트가 실행될 떄 1회 실행

    axios
      .get(`http://127.0.0.1:8000/todo/${targetID}`)
      .then((response)=>{
        setDate(response.data.setDate); // 가져온 데이터에 있는 setDate를 date에 세팅
        setTodo(response.data.setTodo); // 가져온 데이터에 있는 setTodo를 todo에 세팅
        setDetails(response.data.setDetails); // 가져온 데이터에 있는 setDeatils를 details에 세팅
        setTime(response.data.setTime); // 가져온 데이터에 있는 setTime을 time에 세팅
        const setSelect = {
          ...dateData, 
          selectYear: response.data.selectYear,
          selectMonth: response.data.selectMonth,
          selectDate: response.data.selectDate,
          selectedTime: response.data.setTime
        };
        setDateData(setSelect);
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error);
      })
    
  },[]);

  useEffect(()=>{ // selectYear, selectMonth, selectDate가 변경될 때 마다 실행
    setDate(dateData.selectYear+"."+dateData.selectMonth+"."+dateData.selectDate);
  }, [dateData.selectDate, dateData.selectMonth, dateData.selectYear]);

  const editTodoDatas = () => { //수정후 등록버튼
    if(dateData.selectedTime === "시간선택"){ //시간선택을 안했으면 
      setError("일정시간을 선택해주세요"); //에러메시지 세팅
      console.log("일정시간을 선택해주세요"); //콘솔로그에 에러 보여주기
    };
    if(details === ""){ //상세내용을 입력하지 않았으면
      setError("상세내용을 입력해주세요"); //에러메시지 세팅
      console.log("상세내용을 입력해주세요"); //콘솔로그에 에러 보여주기
    };
    if(todo === ""){ //제목을 입력하지 않았으면
      setError("제목을 입력해주세요"); //에러메시지 세팅
      console.log("제목을 입력해주세요"); //콘솔로그에 에러 보여주기
    };
    if(!pattern.test(dateData.selectYear)){ //정확한 날짜을 입력하지 않았으면
      setError("정확한 날짜를 입력해주세요"); //에러메시지 세팅
      console.log("정확한 날짜를 입력해주세요"); //콘솔로그에 에러 보여주기
    };
    if(todo !== "" && details !== "" && dateData.selectedTime !== "시간선택" && pattern.test(dateData.selectYear)){
      //입력창이 모두 입력되고 시간선택이 되고 올바른 날짜를 입력했다면
      axios
      .put(`http://127.0.0.1:8000/todo/${targetID}/`,{
        setTodo: todo,
        setDetails: details,
        setDate: dateData.addDate,
        setTime: dateData.selectedTime,
        setUser: loggedUser,
        selectYear: dateData.selectYear,
        selectMonth: dateData.selectMonth,
        selectDate: dateData.selectDate,
      })
      .then(function (response){
        const setTodoState = {...stateData, todoState: false};
        setStateData(setTodoState);
        console.log(response);
      })
      .catch(function (error){
        console.log(error)
      });
    };
  };

  const cancel = () =>{ //취소버튼 함수
    const setTodoState = {...stateData, todoState: false};
    setStateData(setTodoState);
  };

  const nullCheck = dateData.selectYear && dateData.selectMonth && dateData.selectDate && todo && details && selectTime; //입력창과 선택창에 연결되어있는 값들이 빈값이 아닌지 확인

  if(nullCheck){
    return(
      <div className="flex items-center flex justify-center mt-32 font-Do">
        <div className="bg-slate-50 w-full h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
          <div className="mb-4">
            <div>일자: {date} </div>
            <input type="text" value={dateData.selectYear} onChange={selectYearChange} className="border border-gray-500 w-10"></input>
            <span>년</span>
            <select id="month" value={dateData.selectMonth} onChange={selectMonthChange}>
              {monthOptions}
            </select>
            <select id="month" value={dateData.selectDate} onChange={selectDateChange}>
              {dateOptions}
            </select>
          </div>
          

          <div className="mb-4">
            <span>제목: </span>
            <input type="text" value={todo} onChange={inputTodoChange} className="border border-gray-500"></input>
          </div>
          <span>세부내용: </span>
          <div className="mb-4">
            <textarea type="text" value={details} onChange={inputDetailsChange} className="border border-gray-500 w-80"></textarea>
          </div>
          <div className="mb-4">
            <label>시간:</label>
            <select value={dateData.selectedTime} onChange={selectTimeChange}>
              <option>시간선택</option>
              {timeOptions}
            </select>
          </div>
          <div>
            <EditError error = {error}/>  
          </div>
          <div className="mt-4">
            <button onClick={editTodoDatas} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">등록</button>
            <button onClick={cancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">취소</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditTodo;