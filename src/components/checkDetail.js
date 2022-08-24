import { useState } from "react";
import { getItem } from "../context/indexed"

function CheckDetail({stateData, setStateData, targetID, setTargetID}){
  const [date, setDate] = useState('');
  const [todo, setTodo] = useState('');
  const [time, setTime] = useState('');
  const [detail, setDetail] = useState('');

  getItem(targetID).then(data => { //indexedDB에서 props로 받은 아이디로 데이터 가져오기
    setDate(data.setTodoList.setDate); //data에 있는 setDate로 date 세팅
    setTodo(data.setTodoList.setTodo); //data에 있는 setTodo로 todo 세팅
    setDetail(data.setTodoList.setDetails); // data에 있는 setDetail로 detail 세팅
    setTime(data.setTodoList.setTime); // data에 있는 setTime로 time 세팅
    return data;
  })

  const editMode = (id) =>{ //수정버튼함수 parameter id 받음
    const setState = {...stateData, selectedTodo: "editTodo"};
    setStateData(setState);
    setTargetID(id); // parameter로 받아온 아이디로 targetID 설정
  };

  const exit = () => { //닫기 버튼 함수
    const setTodoState = {...stateData, todoState: false};
    setStateData(setTodoState); // 달력이 보이도록 todoState 값을 false로
  };

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
          <span>예정일: </span>
          <span>{date}</span>
        </div>
        <div className="mb-10 text-2xl">
          <span>예정시간: </span>
          <span>{time}</span>
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