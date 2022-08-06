function DaillyItem({getList, setTargetID, setTodoState, setCheckDetailState, setEditTodoState, setAddTodoState}){

  const viweDetails = (id) => {
    if(getList){
      setTargetID(id)
      setTodoState(true)
      setCheckDetailState(true)
      setAddTodoState(false)
      setEditTodoState(false)
    }
  }



  return(
   <span onClick={()=>viweDetails(getList.id)}>
   {getList? getList.setTodoList.setTodo : ''}
   </span>
  )
}

export default DaillyItem;