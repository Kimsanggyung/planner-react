import { useContext } from "react";
import  { stateContext } from "../context/stateContext"

function Select({dailyState, setDailyState, weeklyState, setWeeklyState, monthlyState, setMonthlyState}){
  const { loginState } = useContext(stateContext)

  const viweMonth = () => {
    if(weeklyState === true){
      setWeeklyState(false)
    }
    if(dailyState === true){
      setDailyState(false)
    }
    setMonthlyState(true)
    console.log(monthlyState)
  }
  const viweWeek = () =>{
    if(monthlyState === true){
      setMonthlyState(false)
    }
    if(dailyState === true){
      setDailyState(false)
    }
    setWeeklyState(true)
    console.log(weeklyState)
  }

  const viweDaily = () => {
    if(monthlyState === true){
      setMonthlyState(false)
    }
    if(weeklyState === true){
      setWeeklyState(false)
    }
    setDailyState(true)
    console.log(dailyState)
  }

  if(loginState){
    return(
      <div>
        <span className="font-jua flex item-center text-white flex flex justify-center text-xl float-left float-right ml-96 mt-6">
          <span onClick={viweMonth} className="bg-red-500 hover:bg-green-500 text-white py-2 px-4 border border-blue-700 rounded mr-1">
            <button>월간</button>
          </span>
          <span onClick={viweWeek} className="bg-orange-500 hover:bg-blue-500 text-white py-2 px-4 border border-blue-700 rounded mr-1">
            <button>주간</button>
          </span>
          <span onClick={viweDaily} className="bg-green-500 hover:bg-orange-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <button>일간</button>
          </span>
        </span>
      </div>
    )
  }
}

export default Select;