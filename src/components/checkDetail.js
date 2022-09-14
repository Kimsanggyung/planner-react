import { useEffect, useState } from "react";
import axios from "axios"

function CheckDetail({stateData, setStateData, targetID, token}){
  const [date, setDate] = useState('');
  const [todo, setTodo] = useState('');
  const [time, setTime] = useState('');
  const [detail, setDetail] = useState('');

 /**
  * 컴포넌트가 실행될떄 최초1회 실행
  * 서버와 통신해서 해당데이터의 id로 데이터를 받아옴
  * 받아온 데이로 setState
  */

  useEffect(()=>{
    axios
      .get(`http://127.0.0.1:8000/todo/${targetID}`,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((response)=>{
        setDate(response.data.setDate); 
        setTodo(response.data.setTodo); 
        setDetail(response.data.setDetails);
        setTime(response.data.setTime); 
        console.log("success")
      })
      .catch(function(error){
        console.log(error);
      });
  },[])
  
  const editMode = () =>{ // 수정버튼함수
    const setState = {...stateData, selectedTodo: "editTodo"};
    setStateData(setState);
  };

  const exit = () => { // 닫기 버튼 함수
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