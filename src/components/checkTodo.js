import { useEffect, useState } from "react";
import {getItem, deleteTodo, } from "../context/indexed"

function CheckTodo({loggedUser, stateData, setStateData, setTargetID}){
  const [getList, setGetList] = useState(null);

  useEffect(() => { // 컴포넌트가 실행됐을 때 1회 실행을 되도록

    const cancel = (id) => { //일정취소 버튼 함수
      const setTodoState = {...stateData, todoState: false}
      deleteTodo(id); //parameter로 받은 id로 indexedDB 데이터 삭제
      setStateData(setTodoState); // 삭제를 했다면 달력화면을 보여주기 위해 todoState false로
    }

    const checkDetail = (id) =>{ // 상세내용 확인 버튼 함수
      const setTodoState = {...stateData, selectedTodo: "checkDetail"};
      setStateData(setTodoState);
      setTargetID(id); //targetID를 parameter로 받아온 id로 세팅
    }

    const callItem = () => { // indexedDB 데이터를 가져오는 함수
      getItem().then(data => { //데이터 가져옴

        let getData = data; // getData에 data할당
        let checkedUser;

        const result = data.find(({setTodoList})=>{ //데이터에서 setTodoList를 찾는다
          if (!setTodoList) return false; // setTodoList가 없다면 fales 반환
          const {setUser} = setTodoList; // setTodoList에 있는 setUser을 상수로 지정
          return (setUser === loggedUser); // setUser과 loggedUesr이 같은 것을 반환
        });

        if(result){ //setUser과 loggedUesr이 같은 데이터가 있다면
          checkedUser = result.setTodoList.setUser; //checkedUser에 result에 있는setTodoList안에 있는 setUser를 할당
        }

        if(getData!== null && getData.length > 0 && checkedUser !== undefined && result && loggedUser === checkedUser){ //getData가 있고 getData가 1이상이고 result가 있고 loggedUser랑 checkedUser가 같다면
          setGetList( //getList 세팅
            getData.map(({setTodoList, id}, index) => { //getDate로 반복문 
              if(setTodoList){ //setTodoList가 있으면
                if(setTodoList.setUser === loggedUser){ //setTodoList에 setUser랑 loggedUser이 같다면
                  return(
                    <div className="mb-2 pl-4" key={id}>
                      <div onClick={()=>checkDetail(id)} className="float-left">
                        {index+1}. 일자:{setTodoList.setDate} 제목:{setTodoList.setTodo} 내용:{setTodoList.setDetails}
                      </div>
                      <button className="text-red-500" onClick={()=> {cancel(id)}}>X</button>
                    </div>
                  )
                } 
              }return true;     
            })
          )
        }else{ //모든조건이 아니면
          return(
            setGetList(<span className="pl-4">일정이 없습니다.</span>)
          )
        }
      })
    }
    callItem()// 함수호출
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return(
    <div className="font-Do underline bg-sky-100 mt-32 h-full text-2xl">
      {getList}
    </div>
  )
}

export default CheckTodo;