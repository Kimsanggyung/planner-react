import { useEffect, useState } from "react";
import EditError from "../parts/editError"
import { getItem, db } from "../context/indexed"

function EditTodo({targetID, loggedUser, setTodoState, selectYear, setSelectYear, selectMonth, setSelectMonth, selectDate, setSelectDate}){

  // const [todayDate, setDate] = useState(year + '.' + month + '.' + date)
  const [date, setDate] = useState('');
  const [todo, setTodo] = useState('');
  const [details, setDetails] = useState('');
  const [selectTime, setTime] = useState('');
  const [error, setError] = useState('');
  const pattern = /(^\d{4}).([1-9]|1[0-2]).([1-9]|[12][0-9]|3[01])$/
  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:'8'},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ];
  const monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  const dateArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  const timeOptions =  time.map((data, idx)=>{
    return <option value={data.num} key={idx}>{data.num}시</option>
  })
  const monthOptions = monthArray.map((num , idx)=>{
    return <option value={num} key={idx}>{num}월</option>
  })
  const dateOptions = dateArray.map((num, idx)=>{
    return <option value={num} key={idx}>{num}일</option>
  })

  const inputTodoChange = event => {
    setTodo(event.target.value);
  };
  const inputDetailsChange = event => {
    setDetails(event.target.value);
  };
  const selectTimeChange = event => {
    setTime(event.target.value);
  };
  const selectYearChange = event => { //일짜 입력창에 입력을 하는 등 이벤트가 발생하면 setAddDate
    setSelectYear(event.target.value)
  }
  const selectMonthChange = event => {
    setSelectMonth(event.target.value)
  }
  const selectDateChange = event => {
    setSelectDate(event.target.value)
  }

  useEffect(() => {
    getItem(targetID).then(value => {
      setDate(value.setTodoList.setDate);
      setTodo(value.setTodoList.setTodo);
      setDetails(value.setTodoList.setDetails);
      setTime(value.setTodoList.setTime);
      setSelectYear(value.setTodoList.selectYear);
      setSelectMonth(value.setTodoList.selectMonth);
      setSelectDate(value.setTodoList.selectDate)
    });
  },[]);

  useEffect(()=>{
    setDate(selectYear+"."+selectMonth+"."+selectDate)
  }, [selectYear, selectMonth, selectDate])

  let edidtDatas = {
    setDate: date,
    setTodo: todo,
    setDetails: details,
    setTime: selectTime,
    setUser: loggedUser
  }

  const editTodoDatas = () => { //수정후 등록버튼
    if(selectTime === "시간선택"){ //시간선택을 안했으면 
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
    if(!pattern.test(date)){ //정확한 날짜을 입력하지 않았으면
      setError("정확한 날짜를 입력해주세요"); //에러메시지 세팅
      console.log("정확한 날짜를 입력해주세요"); //콘솔로그에 에러 보여주기
    };
    if(todo !== "" && details !== "" && selectTime !== "시간선택" && pattern.test(date)){ //입력창이 모두 입력되고 시간선택이 되고 올바른 날짜를 입력했다면
      let store = db.transaction('datas', 'readwrite').objectStore('datas'); // indexedDB에 datas접근
      let putReq = store.put({ //indexedDB 수정
        id:(targetID), //id는 props로 받아온 targetID
        setTodoList: edidtDatas //setTodoList에 edidtDatast세팅
      });
      putReq.onsuccess = () => { //성공했을떄 함수
        console.log('success'); // 성공했다는 콘솔로그
        setTodoState(false); //달력화면을 보여주기 위해 todoState false로 세팅
      }
      putReq.addEventListener('error',function(event){ //실패했을 때
        console.log(event) //콘솔로그에 보여주기
      })
    }
  }

  const cancel = () =>{ //취소버튼 함수
    setTodoState(false); //달력화면을 보여주기 위해 todoState false로 세팅
  } 

  const nullCheck = selectYear && selectMonth && selectDate && todo && details && selectTime

  if(nullCheck){
    return(
      <div className="flex items-center flex justify-center mt-32 font-Do">
        <div className="bg-slate-50 w-full h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
          <div className="mb-4">
            <div>일자: {date} </div>
            <input type="text" value={selectYear} onChange={selectYearChange} className="border border-gray-500 w-10"></input>
            <span>년</span>
            <select id="month" value={selectMonth} onChange={selectMonthChange}>
              {monthOptions}
            </select>
            <select id="month" value={selectDate} onChange={selectDateChange}>
              {dateOptions}
            </select>
          </div>
          

          <div className="mb-4">
            <span>제목: </span>
            <input type="text" value={todo} onChange={inputTodoChange} className="border border-gray-500"></input>
          </div>

          <div className="mb-4">
            <span>세부내용: </span>
            <input type="text" value={details} onChange={inputDetailsChange} className="border border-gray-500 w-80"></input>
          </div>
          <div className="mb-4">
            <label>시간:</label>
            <select value={selectTime} onChange={selectTimeChange}>
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