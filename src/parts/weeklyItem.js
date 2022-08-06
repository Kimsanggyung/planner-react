function WeeklyItem({getList, setTargetID, setTodoState, setCheckDetailState, setEditTodoState, setCheckTodoState, setAddTodoState}){

  const viweDetails = (id) => {
    if(getList){
      setTargetID(id);
      setTodoState(true);
      setCheckDetailState(true);
      setAddTodoState(false);
      setCheckTodoState(false);
      setEditTodoState(false);
    }
  }

  return(
   <span onClick={()=>viweDetails(getList.id)}>
    {getList? getList.setTodoList.setTodo : ''}
   </span>
  )
}

export default WeeklyItem;