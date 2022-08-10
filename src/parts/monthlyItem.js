function MonthlyItem({getList, setTargetID, setCheckTodoState, setTodoState, setEditTodoState, setCheckDetailState, setAddTodoState}){
    
  const viweDetails = (id) => { // 상세내용 보기 함수
    if(getList){ // getList가 있으면
      setTargetID(id); // parameter로 받아온 id로 setTargetID
      setTodoState(true); // 상세 내용 컴포넌트가 보이기 위해 todoState를 true로
      setCheckDetailState(true); // 상세 내용 컴포넌트가 보이기 위해 todoState를 false로
      setAddTodoState(false); // 상세 내용 컴포넌트가 보이기 위해 addTodoState를 false로
      setEditTodoState(false); // 상세 내용 컴포넌트가 보이기 위해 editTodoState를 false로
      setCheckTodoState(false); // 상세 내용 컴포넌트가 보이기 위해 checkTodoState를 false로
    }
  }
  
  let parts;
  if(getList){
    parts = <div onClick={()=>viweDetails(getList.id)} className="w-48 h-7 pb-1 ml-4 border-2 border-indigo-300 text-cyan-800 overflow-hidden">
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

