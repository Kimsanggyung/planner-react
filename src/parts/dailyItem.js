function DaillyItem({getList, stateData, setStateData, setTargetID}){

  const viweDetails = (id) => { // 상세내용 보기 함수
    if(getList){ // getList가 있으면
      setTargetID(id); // parameter로 받아온 id로 setTargetID
      const setState = {...stateData, todoState: true, selectedTodo: "checkDetail", };
      setStateData(setState);
    };
  };

  return(
   <span className="text-cyan-800" onClick={()=>viweDetails(getList.id)}>
   {getList? getList.setTodo : ''}
   </span>
  );
};

export default DaillyItem;