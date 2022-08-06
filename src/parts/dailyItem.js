function DaillyItem({getList, setTargetID, setCheckTodoState, setTodoState, setCheckDetailState, setEditTodoState, setAddTodoState}){

  const viweDetails = (id) => {
    if(getList){
      setTargetID(id)
      setTodoState(true)
      setCheckDetailState(true)
      setAddTodoState(false)
      setEditTodoState(false)
      setCheckTodoState(false)
    }
  }



  return(
   <span onClick={()=>viweDetails(getList.id)}>
   {getList? getList.setTodoList.setTodo : ''}
   </span>
  )
}

export default DaillyItem;