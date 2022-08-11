function Logout({setLoginState}){
  const logout = () => {
    setLoginState(false);
    localStorage.removeItem('saveLogin');
  }

  return(
    <button className="font-Do w-20 h-8 ml-4 border-2 text-xl border-gray-500" onClick={logout}>로그아웃</button>
  )

} 

export default Logout;