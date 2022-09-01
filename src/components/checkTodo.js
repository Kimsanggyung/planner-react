import axios from "axios";
import { useEffect, useState } from "react";

function CheckTodo({loggedUser, stateData, setStateData, setTargetID}){

  const [list, setList] = useState()

  useEffect(()=>{

    const cancel = (todo, id) => { //일정취소 버튼 함수
      if (window.confirm(`${todo.setTodo} 일정을 취소 하시겠습니까?`) === true){ 
        axios.delete(`http://127.0.0.1:8000/todo/${id}`)
      }
      // const setTodoState = {...stateData, todoState: false}
      // setStateData(setTodoState); // 삭제를 했다면 달력화면을 보여주기 위해 todoState false로
    };

    const checkDetail = (id) =>{ // 상세내용 확인 버튼 함수
      const setTodoState = {...stateData, selectedTodo: "checkDetail"};
      setStateData(setTodoState);
      setTargetID(id); //targetID를 parameter로 받아온 id로 세팅
    };
    
    axios
    .get("http://127.0.0.1:8000/todo/")
    .then((response)=>{
      const todoList = response.data;
      const result = todoList.find(todoList => todoList.setUser === loggedUser);
      if(todoList!== null && todoList.length > 0 && result !== undefined && result && loggedUser === result.setUser){
        setList(
          todoList.map( (todo, index) => {
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
        console.log("일정있음")
      }else{
        setList(<span className="pl-4">일정이 없습니다.</span>)
        console.log("일정없음")
        // setGetList(<span className="pl-4">일정이 없습니다.</span>)
      }
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    });
  },[list])

  return(
    <div className="font-Do underline bg-sky-100 mt-32 h-full text-2xl">
      {list}
    </div>
  )
}

export default CheckTodo;