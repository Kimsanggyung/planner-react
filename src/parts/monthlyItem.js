function MonthlyItem({getList, setTargetID, setCheckTodoState, setTodoState, setCheckDetailState, setAddTodoState, loggedUser}){
    
  const viweDetails = (id) => {
    if(getList){
      setTargetID(id);
      setTodoState(true);
      setCheckDetailState(true);
      setAddTodoState(false);
      setCheckTodoState(false);
    }
  }
  
  let parts;
  if(getList){
    parts = <div onClick={()=>viweDetails(getList.id)} className="w-48 h-7 pb-1 ml-4 border-2 border-indigo-300 overflow-hidden">
              {getList? getList.setTodoList.setTodo : ''}
            </div>
  }else{
    parts = <div className="w-48 h-7 overflow-hidden"></div>
  }


  return(
    <>
      {parts}
    </>
  )
}

export default MonthlyItem;

