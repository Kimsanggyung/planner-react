import Login from "./components/login";
import Clock from "./components/clock";
import Today from "./components/today";
import Daily from "./components/daily"
function App(){
  return (
    <div>
      <Today/>
      <Clock/>
      <Login/>
      <Daily/>
    </div>
  )
}

export default App