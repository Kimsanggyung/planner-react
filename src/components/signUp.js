import { useEffect, useState } from "react"
import SignUpError from "../parts/signUpError"
import { getItem, setItem } from "../context/indexed"
import CryptoJS from "crypto-js";
import { OuserData } from "../context/userData"

function SignUp({setSignUpState}){
  const [inputID, setInputID] = useState("");
  const [inputPWD, setInputPWD] = useState("");
  const [checkPWD, setCheckPWD] = useState("");
  const [error, setError] = useState("")
  const [checkState, setCheckState] = useState(false);
  const [userData, setUserData] = useState(OuserData)
  const [hashPwd, setHashPwd] = useState(null);
  const [checked, setChecked] = useState('');
  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  let saltKey = "nuguseyo"

  useEffect(()=>{

    const test = 'qwerqwer12'
    setHashPwd(CryptoJS.MD5(inputPWD+saltKey).toString());
    console.log(CryptoJS.MD5(test+saltKey).toString())

    setUserData({
      userId: inputID,
      userPwd: hashPwd
    })
    console.log(inputID)
    console.log(inputPWD)
    console.log(hashPwd)
    console.log(userData)
  }, [inputID,hashPwd])

  useEffect(()=>{
    
    setHashPwd(CryptoJS.MD5(inputPWD+saltKey).toString());

    console.log(hashPwd)
  
  }, [inputPWD])

  

  const checkUser = (id) => {
		const findUser = OuserData.find(user => user.id === id)
		return findUser;
	}

  const inputIdChange = event => {
    setInputID(event.target.value);

  };
  const inputPwdChange = event => {
    setInputPWD(event.target.value);
  };

  const checkPwdChange = event => {
    setCheckPWD(event.target.value);
  };

  const submit = () => {
    if(checkState === false){
      setError("아이디 중복확인을 해주세요.");
    }
    if(inputID === null){
      setError("아이디를 입력해 주세요.");
    }
    if(!password.test(inputPWD)){
      setError("비밀변호는 최소 8 자, 최소 하나의 문자 및 하나의 숫자를 포함하고 있어야합니다");
    }
    if(checkPWD === null){
      setError("비밀번호를 한번더 입력해주세요.");
    }
    if(inputPWD !== checkPWD){
      setError("입력하신 비밀번호가 다릅니다.")
      console.log("error")
    }
    if(inputID !== null && inputPWD !== null && inputPWD !== null && checkPWD === inputPWD && password.test(inputPWD) && checkState === true){
      setItem({userData})
      console.log('성공')
      setSignUpState(false);
    }
  }

  const cancel = () => {
    setSignUpState(false)
  }

  const checkId = () => {
    getItem().then(data => {
      const indexedUser = data.find(({userData})=>{
        return userData;
      });
      if(data.length > 0){
        // 이미 사용중인 아이디인지 체크
        const checkSameId = data.find(({userData}) => {
          if(userData){
            const checkInputId = userData.userId === inputID
            const findId = checkUser(inputID);
            return checkInputId || findId
          }else{
            return false
          }
        });

        if(checkSameId){
          setError("이미사용되고있는 아이디입니다.");
          console.log("이미사용되고있는 아이디입니다.")
          setChecked('')
          setCheckState(false)      
        } else {
          setError("");
          setChecked("사용가능한 아이디입니다.")
          setCheckState(true);
        }
      }
      if(data.length === 0 || indexedUser ===undefined){
        const findId = checkUser(inputID);
        if(findId){
          setError("이미사용되고있는 아이디입니다.");
          console.log("이미사용되고있는 아이디입니다.");
          setChecked('')
          setCheckState(false);
        }else{
          setError("");
          setChecked("사용가능한 아이디입니다.")
          setCheckState(true);
        }
      }
    })
  }


  return(
    <div className="flex items-center flex justify-center mt-48 font-Do">
      <div className="bg-slate-50 w-96 h-full shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
        <div className="mb-4">
          <input 
            type="text"
            onChange={inputIdChange}
            value={inputID}
            placeholder="아이디를 입력해주세요."
            className="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <button onClick={checkId}>중복확인</button>
          <div>{checked}</div>
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

        <div className="mb-6">
          <input 
            type="password"
            onChange={checkPwdChange}
            value={checkPWD}
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="text-red-500">
          <SignUpError error = {error}/>
        </div>
    
        <div className="flex items-center justify-between float-left">
          <button type="submit" onClick={submit} className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">등록</button>
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" onClick={cancel} className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">취소</button>
        </div>
        
      </div>
    </div>
  )
}

export default SignUp;