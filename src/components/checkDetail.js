import { useState } from "react";
import { getItem } from "../context/indexed"

function CheckDetail({targetID, setTargetID, setCheckDetailState, setTodoState, setEditTodoState}){
  const [date, setDate] = useState('');
  const [todo, setTodo] = useState('');
  const [time, setTime] = useState('');
  const [detail, setDetail] = useState('');

  getItem(targetID).then(data => {
    setDate(data.setTodoList.setDate);
    setTodo(data.setTodoList.setTodo);
    setDetail(data.setTodoList.setDetails);
    setTime(data.setTodoList.setTime);
    return data;
  })

  console.log(date)
  console.log(todo)
  console.log(time)
  console.log(detail)

  const editMode = (id) =>{
    setCheckDetailState(false);
    setEditTodoState(true);
    setTargetID(id);
  }

  const exit = () => {
    setTodoState(false)
  }

  return(
    <div className="flex items-center flex justify-center mt-32 font-Do">
      <div className="bg-slate-50 w-2/5 h-96 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
        <div className="mb-4 text-4xl">
          <span>제목: </span>
          <span>{todo}</span>
        </div>
    
        <div className="mb-6 text-3xl">
          <span>세부내용: </span>
          <span>{detail}</span>
        </div>
    
        <div className="text-2xl">
          <span>예정일:</span>
          <span>{date}</span>
        </div>
        <div className="mb-10 text-2xl">
          <span>예정시간:</span>
          <span>{time}시</span>
        </div>
        <div className="float-left">
          <button onClick={() => editMode(targetID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">수정</button>
          <button onClick={exit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">닫기</button>
        </div>
      </div>
    </div>
  )

}

export default CheckDetail;