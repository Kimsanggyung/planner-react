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
        let checkedUser;

        const result = data.find(({setTodoList})=>{
          if (!setTodoList) return false;
          const {setUser} = setTodoList;
          return (setUser === loggedUser)
        });

        if(result){
          checkedUser = result.setTodoList.setUser;
        }

        console.log(checkedUser)
        console.log(loggedUser)

        if(getData!== null && getData.length > 0 && checkedUser !== undefined && result && loggedUser === checkedUser){
          setGetList(
            getData.map(({setTodoList, id}, index) => {
              if(setTodoList){
                if(setTodoList.setUser === loggedUser){
                  return(
                    <div className="mb-2 pl-4" key={id}>
                      <div onClick={()=>checkDetail(id)} className="float-left">
                        {index+1}. 일자:{setTodoList.setDate} 제목:{setTodoList.setTodo} 내용:{setTodoList.setDetails}
                      </div>
                      <button className="text-red-500" onClick={()=> {cancel(id)}}>X</button>
                    </div>
                  )
                } 
              }return true;     
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return(
    <div className="font-Do underline bg-sky-100 mt-32 h-full text-2xl">
      {getList}
    </div>
  )
}

export default CheckTodo;