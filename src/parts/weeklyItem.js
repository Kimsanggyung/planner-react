function WeeklyItem({getList, setTargetID, stateData, setStateData}){

  const viweDetails = (id) => { // 상세내용 보기 함수
    if(getList){ // getList가 있으면
      const setState = {...stateData, todoState: true, selectedTodo: "checkDetail"};
      setTargetID(id); // parameter로 받아온 id로 setTargetID
      setStateData(setState);
    };
  };

  return(
   <span className="text-cyan-800" onClick={()=>viweDetails(getList.id)}>
    {getList? getList.setTodoList.setTodo : ''}
   </span>
  );
};

export default WeeklyItem;