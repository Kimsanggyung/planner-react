function DaillyItem({getList, setTargetID, setTodoState, setCheckDetailState, setAddTodoState}){

  const viweDetails = (id) => {
    if(getList){
      setTargetID(id)
      setTodoState(true)
      setCheckDetailState(true)
      setAddTodoState(false)
    }
  }



  return(
   <span onClick={()=>viweDetails(getList.id)}>
   {getList? getList.setTodoList.setTodo : ''}
   </span>
  )
}

export default DaillyItem;