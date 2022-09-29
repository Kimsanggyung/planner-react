import Daily from "../components/daily";
import Weekly from "../components/weekly";
import Monthly from "../components/monthly";

function Calendar({stateData, setStateData, dateDate, setDateData ,loggedUser, date, setDate, targetID, setTargetID, token, list, setList}){
  let selectedCalendar = null; //render를 위한 변수
  if(stateData.loginState && stateData.selectedCalendar === "daily"){ // 로그인상태이면서 dailyState가 참이면 selectedCalendar에 daily컴포넌트를 할당
    selectedCalendar =  <Daily 
                          dateDate={dateDate} setDateData={setDateData} loggedUser={loggedUser} stateData={stateData} token={token}
                          setStateData={setStateData} date={date} setDate={setDate} targetID={targetID} setTargetID={setTargetID} list={list}
                        />
  }else if(stateData.loginState && stateData.selectedCalendar === "week"){ // 로그인상태이면서 weeklyState가 참이면 selectedCalendar에 weekly컴포넌트를 할당
    selectedCalendar =  <Weekly 
                          dateDate={dateDate} setDateData={setDateData} stateData={stateData} setStateData={setStateData} 
                          loggedUser={loggedUser} odate={date} setDate={setDate} setTargetID={setTargetID} list={list}
                        />
  }else if(stateData.loginState && stateData.selectedCalendar === "month"){ // 로그인상태이면거 monthlyState가 참이면 selectedCalendar에 monthly컴포넌트 할당
    selectedCalendar =  <Monthly 
                          dateDate={dateDate} setDateData={setDateData} stateData={stateData} setStateData={setStateData} setList={setList}
                          loggedUser={loggedUser} odate={date} setDate={setDate} setTargetID={setTargetID} list={list} token={token}
                        />
  }

  return (
    <>{selectedCalendar}</>
  );
};

export default Calendar