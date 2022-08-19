function MonthlyItem({getList, setTargetID, stateData, setStateData}){
    
  const viweDetails = (id) => { // 상세내용 보기 함수
    if(getList){ // getList가 있으면
      const setState = {...stateData, todoState: true, selectedTodo: "checkDetail"}
      setTargetID(id); // parameter로 받아온 id로 setTargetID
      setStateData(setState)
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

