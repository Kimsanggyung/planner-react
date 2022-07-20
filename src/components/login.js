import { useState } from "react"

function Login(){
  const [inputID, setInputID] = useState('');
  const [inputPWD, setInputPWD] = useState('');
  const userData = [
    {id: 'a', pwd: '123'},
    {id: 'b', pwd: '1234'}
  ];

  const checkUser = () => {
		const findUser = userData.find(user => user.id === inputID && user.pwd === inputPWD)
    if(findUser){
      console.log("성공")
    }
    else{
      console.log("틀림")
    }
		return findUser;
	}

  const inputIdChange = event => {
    setInputID(event.target.value)

  }
  const inputPwdChange = event => {
    setInputPWD(event.target.value)
  }


  return(
    <div className="font-Do">
      <input 
        type="text"
        onChange={inputIdChange}
        value={inputID}
        placeholder="아이디를 입력해주세요."
      />

      <input 
        type="password"
        onChange={inputPwdChange}
        value={inputPWD}
        placeholder="비밀번호를 입력해주세요"
        />

      <button type="submit" onClick={checkUser}>로그인</button>
    </div>
  )
}

export default Login