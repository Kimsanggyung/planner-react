import axios from "axios";

function Logout({stateData, setStateData, token }){
  const logout = () => {
    let newObject = {...stateData};
    newObject.loginState = false;
    setStateData(newObject);
    axios
      .get(`https://port-0-djangoproject-11er1a24lbd3kpne.gksl2.cloudtype.app/logout/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(()=>{
        localStorage.clear()
        sessionStorage.clear()
        console.log("success")
      })
      .catch(function(error){
        console.log(error);
      });
  }
  return(
    <button className="font-Do w-20 h-8 ml-4 rounded border-2 text-xl border-gray-500" onClick={logout}>로그아웃</button>
  );

};

export default Logout;