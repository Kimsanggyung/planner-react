function Logout({stateData, setStateData}){
  const logout = () => {
    let newObject = {...stateData};
    newObject.loginState = false;
    setStateData(newObject);
    localStorage.removeItem('saveID');
  };

  return(
    <button className="font-Do w-20 h-8 ml-4 rounded border-2 text-xl border-gray-500" onClick={logout}>로그아웃</button>
  );

};

export default Logout;