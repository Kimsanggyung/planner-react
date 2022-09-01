import axios from "axios";
import { useState } from "react";
import { time, monthArray, dateArray } from "../baseData";


function RestAPI({dateData, setDateData, loggedUser}){
  const [text, setText] = useState([])
  const [todo, setTodo] = useState('');
  const [details, setDetails] = useState('');

  const post = () => {
    axios
      .post("http://127.0.0.1:8000/review/", {
        setTodo: todo,
        setDetails: details,
        setDate: dateData.addDate,
        setTime: dateData.selectedTime,
        setUser: loggedUser,
        selectYear: dateData.selectYear,
        selectMonth: dateData.selectMonth,
        selectDate: dateData.selectDate
      })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.log(error)
      });
  } 

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/review/")
      .then((response)=>{
        setText([...response.data]);
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error);
      })
  };

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
    <>
        <div className="mb-4">
          <span>제목: </span>
          <input type="text" onChange={inputTodoChange} className="border border-gray-500"></input>
        </div>

        <div>세부내용: </div>
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
      <div key="sdasdadsa">
        <button className="mr-8" onClick={post}>post</button>
        <button onClick={getData}>get</button>
      </div>
      {text.map((e) => (
        <div>
          {""}
          <div>
            <span key={e.id} className="mr-3">
              {e.id}번, {e.setTodo}, {e.setDetails}, {e.setDate}, {e.setTime}, {e.setUser}, {e.selectYear}, {e.selectMonth}, {e.selectDate}, {e.update_at} 
            </span>
            <button
              onClick={
                ()=>{
                  axios
                  .put(`http://127.0.0.1:8000/review/${e.id}/`,{
                    setTodo: todo,
                    setDetails: details,
                    setDate: dateData.addDate,
                    setTime: dateData.selectedTime,
                    setUser: loggedUser,
                    selectYear: dateData.selectYear,
                    selectMonth: dateData.selectMonth,
                    selectDate: dateData.selectDate
                  })
                  .then(function (response){
                    console.log(response);
                  })
                  .catch(function (error){
                    console.log(error)
                  });
                }
              }
            >
            수정
            </button>
            <button
              onClick={
                ()=>{
                  axios.delete(`http://127.0.0.1:8000/review/${e.id}`)
                  setText(text.filter((text)=> text.id !== e.id))
                }
              }
            >
            삭제
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default RestAPI;