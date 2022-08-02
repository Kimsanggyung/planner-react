import { useEffect, useState } from "react";
import EditError from "../parts/editError"
import { getItem, db } from "../context/indexed"

function EditTodo({targetID, loggedUser, setTodoState}){

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
  ]

  const timeOptions =  time.map((data, idx)=>{
    return <option value={data.num} key={idx}>{data.num}시</option>
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
  const setTodoDate = event => {
    setDate(event.target.value);
  };
  useEffect(() => {
    getItem(targetID).then(value => {
      setDate(value.setTodoList.setDate);
      setTodo(value.setTodoList.setTodo);
      setDetails(value.setTodoList.setDetails);
      setTime(value.setTodoList.setTime);
    });
  },[]);

  let edidtDatas = {
    setDate: date,
    setTodo: todo,
    setDetails: details,
    setTime: selectTime,
    setUser: loggedUser
  }

  const editTodoDatas = () => {
    if(selectTime === "시간선택"){
      setError("일정시간을 선택해주세요");
      console.log("일정시간을 선택해주세요");
    };
    if(details === ""){
      setError("상세내용을 입력해주세요");
      console.log("상세내용을 입력해주세요");
    };
    if(todo === ""){
      setError("제목을 입력해주세요");
      console.log("제목을 입력해주세요");
    };
    if(!pattern.test(date)){
      setError("정확한 날짜를 입력해주세요");
      console.log("정확한 날짜를 입력해주세요");
    };
    if(todo !== "" && details !== "" && selectTime !== "시간선택" && pattern.test(date)){
      let store = db.transaction('datas', 'readwrite').objectStore('datas');
      let putReq = store.put({
        id:(targetID),
        setTodoList: edidtDatas 
      });
      putReq.onsuccess = () => {
        console.log('success')
        setTodoState(false)
      }
      putReq.addEventListener('error',function(event){
        console.log(event)
      })
    }
  }

  const cancel = () =>{
    setTodoState(false)
  } 

  console.log(selectTime)

  return(
    <div className="flex items-center flex justify-center mt-32 font-Do">
      <div className="bg-slate-50 w-full h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
        <div className="mb-4">
          <span>일자: </span>
          <input type="text" value={date} onChange={setTodoDate} className="border border-gray-500 w-48"></input>
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
          <button onClick={editTodoDatas} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">등록</button>
          <button onClick={cancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">취소</button>
        </div>
      </div>
    </div>
  )
}

export default EditTodo;