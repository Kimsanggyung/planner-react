import { useState } from 'react';
import LoginError from '../parts/loginError'

function Login({signUpState, setSignUpState, loginState, setLoginState}){
  const [inputID, setInputID] = useState('');
  const [inputPWD, setInputPWD] = useState('');
  const [error, setError] = useState('')

  const userData = [
    {id: 'a', pwd: '123'},
    {id: 'b', pwd: '1234'}
  ];

  const checkUser = () => {
		const findUser = userData.find(user => user.id === inputID && user.pwd === inputPWD)
    if(findUser){
      console.log("성공")
      setLoginState(!loginState)
    }
    else{
      setError("아이디 또는 비밀번호를 확인해주세요")
      console.log("틀림")
    }
    if(inputPWD === ''){
      setError("비밀번호를 입력해주세요")
    }
    if(inputID === ''){
      setError("아이디를 입력해주세요")
    }
		return findUser;
	}

  const inputIdChange = event => {
    setInputID(event.target.value)

  }
  const inputPwdChange = event => {
    setInputPWD(event.target.value)
  } 

  const signUp = () => {
    setSignUpState(true)
  }

  if(!loginState){
    return( 
      <div className="flex items-center flex justify-center mt-48 font-Do">
        <div className="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
          <div className="mb-4">
            <input 
              type="text"
              onChange={inputIdChange}
              value={inputID}
              placeholder="아이디를 입력해주세요."
              className="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <input 
              type="password"
              onChange={inputPwdChange}
              value={inputPWD}
              placeholder="비밀번호를 입력해주세요"
              className="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="text-red-500">
            <LoginError error = {error}/>
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" onClick={checkUser} className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">로그인</button>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={signUp} className="text-blue-600 mt-4 underline underline-offset-2">회원가입</button>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Login