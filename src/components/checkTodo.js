import { useEffect, useState } from "react";
import {getItem, deleteTodo, } from "../context/indexed"

function CheckTodo({loggedUser, setTodoState, setCheckTodoState, setTargetID, setCheckDetailState}){
  const [getList, setGetList] = useState(null);

  useEffect(() => {

    const cancel = (id) => {
      deleteTodo(id);
      setTodoState(false)
    }

    const checkDetail = (id) =>{
      setCheckDetailState(true)
      setCheckTodoState(false)
      setTargetID(id)
    }

    const callItem = () => {
      getItem().then(data => {
        let getData = data;
        let checkID = getData.find(value => value.setTodoList.setUser === loggedUser);
        let checkedUser;
        if(checkID){
          checkedUser = checkID.setTodoList.setUser;
        }
        if(getData!== null && getData.length > 0 && checkedUser !== null && checkID !== null && loggedUser === checkedUser){
          setGetList(getData.map(({setTodoList, id}, index) => {
            if(setTodoList.setUser === loggedUser){
              return(
                <div className="mb-2 pl-4" key={id}>
                  <div onClick={()=>checkDetail(id)} className="float-left">
                    {index+1}. 일자:{setTodoList.setDate} 제목:{setTodoList.setTodo} 내용:{setTodoList.setDetails}
                  </div>
                  <button className="text-red-500" onClick={()=> {cancel(id)}}>X</button>
                </div>
              )
            }return false;     
          })
        )
        }else{
          return(
          setGetList(<span className="pl-4">일정이 없습니다.</span>)
          )
        }
      })
    }
    callItem()
  },[]);

  return(
    <div className="font-Do underline bg-sky-100 mt-32 h-full text-2xl">
      {getList}
    </div>
  )
}

export default CheckTodo;