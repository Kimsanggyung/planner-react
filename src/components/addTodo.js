import AddTodoError from "../parts/addTodoError";
import axios from "axios";
import { useEffect, useState } from "react";
import { time, monthArray, dateArray } from "../baseData";

function AddTodo({dateData, setDateData, loggedUser, stateData, setStateData, token}){

  const [todo, setTodo] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [list, setList] = useState(undefined);
  const pattern = /^\d{4}$/;

  /**
   * dataData의 일부데이터가 변경됐을때 실행
   * 서버와 통신해서 원하는 데이터를 
   */
  useEffect(()=>{
    axios
      .get("http://127.0.0.1:8000/todo/",{
        headers: {
          Authorization: `${token}`
        }
      })
      .then((response)=>{
        if(response.data.length > 0){
          const list = response.data;
          const checkUserTodo = list.find(data => data.setTime === dateData.selectedTime && data.setDate === dateData.addDate && data.setUser === loggedUser)
          setList(checkUserTodo)
        }
        console.log("success")
      })
      .catch(function(error){
        console.log(error);
      });
  },[dateData.addDate, dateData.selectedTime, loggedUser])
  
  /**
   * selectYear, selectMonth, selectDate가 변경 될때 마다 실행
   * 변경된 데이터로 setDateData  
   */
  useEffect(()=>{ // selectYear, selectMonth, selectDate가 변경 될때 마다 실행
    const setAddDate = {...dateData, addDate: dateData.selectYear+"."+dateData.selectMonth+"."+dateData.selectDate };
    setDateData(setAddDate);
  },[dateData.selectYear, dateData.selectMonth, dateData.selectDate]);

  const inputTodoChange = event => { // 제목 입력창에 입력을 하는 등 이벤트가 발생하면 setTodo
    setTodo(event.target.value);
  };
  const inputDetailsChange = event => { // 상세 입력창에 입력을 하는 등 이벤트가 발생하면 setDetail
    setDetails(event.target.value);
  };
  const selectTimeChange = event => { // 시간선택창에서 시간을 선택하면 그 시간으로 setSelectedTime
    const selectedTime = {...dateData, selectedTime: event.target.value};
    setDateData(selectedTime);
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


  const setTodoState = {...stateData, todoState: false};
  
  const submit = () => { // 등록버튼 함수
    if(list !==undefined){
      setError("해당 일자에 일정이 있습니다"); // 날짜가 정확하지 않다면 에러메시지 세팅
      console.log("해당 일자에 일정이 있습니다");
    };
    if(dateData.selectedTime === "시간선택" || dateData.selectedTime === ""){  //시간을 선택했는지 확인
      setError("일정시간을 선택해주세요"); //선택을 안했다면 에러메시지 세팅
      console.log("일정시간을 선택해주세요"); // 콘솔로그에 에러메시지 보여주기
    };
    if(details === ""){ //상세내용 입력창이 비어있는것을 확인
      setError("상세내용을 입력해주세요"); // 비어있다면 에러메시지 세팅
      console.log("상세내용을 입력해주세요"); // 콘솔로그에 에러메시지 보여주기
    };
    if(todo === ""){ // 제목창이 비어있는 것을 확인
      setError("제목을 입력해주세요"); // 비어있다면 에러메시지 세팅
      console.log("제목을 입력해주세요"); // 콘솔로그에 에러메시지 보여주기
    };
    if(!pattern.test(dateData.selectYear)){ //날짜가 정확한지 정규표현식을 통해 확인
      setError("정확한 년도를 입력해주세요"); // 날짜가 정확하지 않다면 에러메시지 세팅
      console.log("정확한 년도를 입력해주세요"); // 콘솔로그에 에러메시지 보여주기
    };
    if(dateData.selectedTime !== "시간선택" && dateData.selectedTime !== "" && details !== "" && todo !== "" && pattern.test(dateData.selectYear) && list === undefined){ //시간선택을 했고 모든 입력창이 빈칸이 아니고 날짜를 정확하게 입력했다면 
      setError("");// 에러메시지 없애기
      console.log(token)
      axios
      .post("http://127.0.0.1:8000/todo/", {
        setTodo: todo,
        setDetails: details,
        setDate: dateData.addDate,
        setTime: dateData.selectedTime,
        setUser: loggedUser,
        selectYear: dateData.selectYear,
        selectMonth: dateData.selectMonth,
        selectDate: dateData.selectDate
      },
      {
        headers: {
          Authorization: `Token ${token}`
        },
      })
      .then(function (response){
        console.log(response.status);
      })
      .catch(function (error){
        console.log(error)
      });
      setStateData(setTodoState); // 할일 추가를 완료했다면 달력화면으로 가도록 state값 변경
    };
  };

  const cancel = () => { // 취소버튼 함수
    setStateData(setTodoState);  // 취소를 누르면 할일 추가 화면을 안보이게 하고 달력하면을 보여주기 위해 state값 변경
  };

  const timeOptions =  time.map((data, idx)=>{ //시간 선택 반복문
    return <option value={data.time} key={idx}>{data.time}</option> // 값을 배열에 있는 숫자로 키값을 index로
  });
  const monthOptions = monthArray.map((time , idx)=>{ // 월 선택 반복문
    return <option value={time} key={idx}>{time}월</option> // 값을 배열에 있는 숫자로 키값을 index로
  });
  const dateOptions = dateArray.map((time, idx)=>{ // 일 선택 빈복문
    return <option value={time} key={idx}>{time}일</option> // 값을 배열에 있는 숫자로 키값을 index로
  });

  return(
    <div className="flex items-center flex justify-center mt-32 font-Do">
      <div className="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
        <div className="mb-4">
          <span>제목: </span>
          <input type="text" onChange={inputTodoChange} className="border border-gray-500"></input>
        </div>
        <span>세부내용: </span>
        <div className="mb-6">
          <textarea type="text" onChange={inputDetailsChange} className="w-60 h-20 border border-gray-500"></textarea>
        </div>

        <div className="mb-8">
          <label>예정일:</label>
          <input type="text" name="start" onChange={selectYearChange} value={dateData.selectYear} className="border border-gray-500 w-10"></input>
          <span>년</span>
          <select id="month" value={dateData.selectMonth} onChange={selectMonthChange}>
            {monthOptions}
          </select>
          <select id="month" value={dateData.selectDate} onChange={selectDateChange}>
            {dateOptions}
          </select>
          <select id="time" value={dateData.selectedTime} onChange={selectTimeChange}>
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
  );
};

export default AddTodo;