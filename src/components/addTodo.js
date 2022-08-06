import AddTodoError from "../parts/addTodoError";
import { setItem } from '../context/indexed'
import { useState } from "react";

function AddTodo({loggedUser, setTodoState, selectedTime, setSelectedTime, addDate, setAddDate}){
 
  const [todo, setTodo] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('')
  const pattern = /(^\d{4}).([1-9]|1[0-2]).([1-9]|[12][0-9]|3[01])$/

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]
  let setTodoList = {
	  setTodo: todo,
	  setDetails: details,
    setDate: addDate,
    setTime: selectedTime,
    setUser: loggedUser
  }

  const inputTodoChange = event => {
    setTodo(event.target.value)
  }
  const inputDetailsChange = event => {
    setDetails(event.target.value)
  }

  const selectTimeChange = event => { 
    setSelectedTime(event.target.value)
  }
  const setTodoDate = event => {
    setAddDate(event.target.value)
  }



  const submit = () => {
    if(selectedTime === "시간선택" || selectedTime === ""){ 
      setError("일정시간을 선택해주세요")
      console.log("일정시간을 선택해주세요")
    }
    if(details === ""){
      setError("상세내용을 입력해주세요")
      console.log("상세내용을 입력해주세요")
    }
    if(todo === ""){
      setError("제목을 입력해주세요")
      console.log("제목을 입력해주세요")
    }if(!pattern.test(addDate)){
      setError("정확한 날짜를 입력해주세요")
      console.log("정확한 날짜를 입력해주세요")
    }
    if(selectedTime !== "시간선택" && selectedTime !== "" && details !== "" && todo !== "" && pattern.test(addDate)){
      setError("");
      setItem({setTodoList});
      setTodoState(false);
    }
  }

  const cancel = () => {
    setTodoState(false);
  }

  const timeOptions =  time.map((data, idx)=>{
    return <option value={data.num} key={idx}>{data.num}시</option>
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
          <input type="text" name="start" onChange={setTodoDate} value={addDate} className="border border-gray-500 w-24"></input>
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