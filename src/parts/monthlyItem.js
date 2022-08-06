import { useEffect, useState } from "react";
import { getItem } from "../context/indexed"


function MonthlyItem({getDate, setTargetID, setCheckTodoState, setTodoState, setCheckDetailState, setAddTodoState, loggedUser}){

  const [todoData, setTodoData] =useState(null);
  
  useEffect(()=>{
    getItem().then(data=> {
      const getList = data.find(({setTodoList})=>{
        if(!setTodoList)return false;
        const {setDate, setUser} = setTodoList;
        return(setDate===getDate && setUser===loggedUser);
      })
      if(getList){
        console.log('success')
        setTodoData(getList)
      }
    });  
  },[]);

  const viweDetails = (id) => {
    if(todoData){
      setTargetID(id);
      setTodoState(true);
      setCheckDetailState(true);
      setAddTodoState(false);
      setCheckTodoState(false);
    }
  }

  const parts = 
    todoData?
      <div onClick={()=>viweDetails(todoData.id)} className="w-48 h-7 pb-1 ml-4 border-2 border-indigo-300 overflow-hidden">
        {todoData.setTodoList.setTodo}
      </div>
      :
      <div className="w-48 h-7 overflow-hidden"></div>

  return(
    <>
      {parts}
    </>
  )
}

export default MonthlyItem;

