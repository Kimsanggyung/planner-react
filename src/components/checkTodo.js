import axios from "axios";
import { useEffect, useState } from "react";

function CheckTodo({loggedUser, stateData, setStateData, setTargetID, list, token, setList}){

  const [listView, setView] = useState()

  useEffect(()=>{ // list가 변경될때 마다 실행되도록

    /**
     * 일정취소 버튼 함수(삭제)
     * @param {string} todo 해당 데이터의 할일 제목을 받아옴
     * @param {number} id 해당 데이터의 아이디를 받아옴
     */
    const cancel = (todo, id) => {
      if (window.confirm(`${todo.setTodo} 일정을 취소 하시겠습니까?`) === true){ 
        axios.delete(`http://127.0.0.1:8000/todo/${id}`,{
          headers: {
            Authorization: `Token ${token}`
          }
        }).then(()=>{
          axios.get("http://127.0.0.1:8000/todo/", {
          headers: {
            Authorization: `Token ${token}`
          }
          })
          .then((response)=>{
            setList(response.data)
            console.log("success get")
          })
          .catch(function(error){
            console.log(error);
          })
        })
      }
    };

    /**
     * 일정 상세내용확인 버튼 함수
     * @param {number} id 상세내용을 확인할 데이터의 id 값을 받아옴
     */
    const checkDetail = (id) =>{ 
      const setTodoState = {...stateData, selectedTodo: "checkDetail"};
      setStateData(setTodoState);
      setTargetID(id); //targetID를 parameter로 받아온 id로 세팅
    };
    if(list!== null && list.length > 0 ){
      setView(
        list.map( (todo, index) => {
          if(todo.setUser === loggedUser){ //setTodoList에 setUser랑 loggedUser이 같다면
            return(
              <div className="mb-2 pl-4" key={index}>
                <div onClick={()=>checkDetail(todo.id)} className="float-left ">
                  일자:{todo.setDate} 제목:{todo.setTodo} 내용:{todo.setDetails}
                </div>
                <button className="text-red-500 ml-3" onClick={()=> {cancel(todo,todo.id)}}>X</button>
              </div>
            )
          } 
        })
      )
    }else{
      setView(<span className="pl-4">일정이 없습니다.</span>)
    }
  },[list])

  return(
    <div className="font-Do underline bg-sky-100 mt-32 h-full text-2xl">
      {listView}
    </div>
  )
}

export default CheckTodo;