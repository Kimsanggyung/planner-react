import axios from "axios";

function Logout({stateData, setStateData, token }){
  const logout = () => {
    let newObject = {...stateData};
    newObject.loginState = false;
    setStateData(newObject);
    localStorage.clear()
    sessionStorage.clear()
    axios.delete(`http://127.0.0.1:8000/logout`,{
      headers: {
        Authorization: `Token ${token}`
      }
    })
  };

  return(
    <button className="font-Do w-20 h-8 ml-4 rounded border-2 text-xl border-gray-500" onClick={logout}>로그아웃</button>
  );

};

export default Logout;