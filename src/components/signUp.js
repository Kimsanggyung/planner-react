import { useEffect, useState } from "react"
import SignUpError from "../parts/signUpError"
import { getItem, setItem } from "../context/indexed"
import CryptoJS from "crypto-js";
import { OuserData } from "../context/userData"
import axios from "axios";

function SignUp({stateData, setStateData}){
  const [inputID, setInputID] = useState("");
  const [inputPWD, setInputPWD] = useState("");
  const [checkPWD, setCheckPWD] = useState("");
  const [error, setError] = useState("")
  const [checkState, setCheckState] = useState(false);
  const [userData, setUserData] = useState(OuserData);
  const [hashPwd, setHashPwd] = useState(null);
  const [checked, setChecked] = useState('');
  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 10자리이상에 문자와 숫자가 같이있어한다는 정규표현식
  let saltKey = "nuguseyo";
  let newObject = {...stateData};
  newObject.signUpState = false;

  useEffect(()=>{ // inputPWD가 변경될 때 마다 실행
     
    setHashPwd(CryptoJS.MD5(inputPWD+saltKey).toString()); // inputPWD랑 saltKey를 합쳐서 hash처리
  
  }, [inputPWD, saltKey]);

  useEffect(()=>{ // inputID hashPwd가 변경될 때 마다 실행

    setUserData({ //userData 세팅
      userId: inputID,
      userPwd: hashPwd
    });

  }, [inputID, hashPwd]);

  

  const checkUser = (id) => { //기존유저 아이디중 같은게 있는지 확인하는 함수
		const findUser = OuserData.find(user => user.id === id); // parameter로 받아온 id로 같은게 있는지 확인
		return findUser;
	};

  const inputIdChange = event => { 
    setInputID(event.target.value); // 아이디 입력창에 입력을 하는 등 이벤트가 발생하면 setInputID
  };
  const inputPwdChange = event => {
    setInputPWD(event.target.value); // 비밀번호 입력창에 입력을 하는 등 이벤트가 발생하면 setInputPWD
  };
  const checkPwdChange = event => {
    setCheckPWD(event.target.value); // 비밀번호확인 입력창에 입력을 하는 등 이벤트가 발생하면 setCheckPWD
  };

  const checkSameID = () => {
    axios
    .get("http://127.0.0.1:8000/user/")
    .then((response)=>{
      const indexedUser = response.data.find((data)=>{ //indexedDB를 통해 회원 가입을 한 사용자가 있는지 확인
        return data;
      });
      if(response.data.length > 0){ // indexedDB에 저장된 데이터가 있으면
        // 이미 사용중인 아이디인지 체크
        const checkSameId = response.data.find((data) => { // indexedDB를 통해 회원 가입을 한 사용자를 찾는다
          if(data){ //indexedDB를 통해 회원 가입을 한 사용자기 있다면
            const checkInputId = data.userID === inputID; // indexedDB에 기존사용자 아이디 중에 같은게 있는지 확인
            const findId = checkUser(inputID); // 메모리에 저징된 사용지 아이디 중에 같은게 있는지 확인
            return checkInputId || findId // 둘중하나라도 있으면 반환
          }else{ // 둘다 없다면
            console.log(response.data.userID)
            return false // false반환
          };
        });
        if(checkSameId){ // 이미사용되고 있는 아이디라면
          setError("이미사용되고있는 아이디입니다."); // 에러메시지 세팅
          console.log("이미사용되고있는 아이디입니다."); // 콘솔에 에러메시지
          setChecked(''); // 사용가능 여부 메시지를 빈칸으로
          setCheckState(false); // 회원가입이 안되도록 checkState를 false로 
        } else { //같은게 없다면
          setError(""); // 에러메시지 없애기
          setChecked("사용가능한 아이디입니다."); // 사용가능하다는 메시지 보여주기
          console.log()
          setCheckState(true); // 회원가입이 가능하도록 checkState를 true로
        }
      }
      if(response.data.length === 0 || indexedUser === undefined){ // indexedDB에 저장된 데이터가 없거나 indexedDB를 통해 회원 가입한 사용자가 없으면
        const findId = checkUser(inputID); // 메모리에 저장된 사용자 아이디 중에 같은게 있는지 체크
        if(findId){ // 같은게 있다면
          setError("이미사용되고있는 아이디입니다."); // 에러메시지 세팅
          console.log("이미사용되고있는 아이디입니다."); // 콘솔에 에러메시지
          setChecked(''); // 사용가능 여부 메시지를 빈칸으로
          setCheckState(false); //회원가입이 안되도록 checkState를 false로     
        }else{
          setError(""); // 에러메시지 없애기
          setChecked("사용가능한 아이디입니다."); // 사용가능하다는 메시지 보여주기
          setCheckState(true); // 회원가입이 가능하도록 checkState를 true로
        };
      };
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error);
    })
  }

  const checkId = () => { //종복아이디 확인 버튼 함수
    getItem().then(data => { //indexedDB에서 데이터 가져오기
      const indexedUser = data.find(({userData})=>{ //indexedDB를 통해 회원 가입을 한 사용자가 있는지 확인
        return userData;
      });
      if(data.length > 0){ // indexedDB에 저장된 데이터가 있으면
        // 이미 사용중인 아이디인지 체크
        const checkSameId = data.find(({userData}) => { // indexedDB를 통해 회원 가입을 한 사용자를 찾는다
          if(userData){ //indexedDB를 통해 회원 가입을 한 사용자기 있다면
            const checkInputId = userData.userId === inputID; // indexedDB에 기존사용자 아이디 중에 같은게 있는지 확인
            const findId = checkUser(inputID); // 메모리에 저징된 사용지 아이디 중에 같은게 있는지 확인
            return checkInputId || findId // 둘중하나라도 있으면 반환
          }else{ // 둘다 없다면
            return false // false반환
          };
        });
        if(checkSameId){ // 이미사용되고 있는 아이디라면
          setError("이미사용되고있는 아이디입니다."); // 에러메시지 세팅
          console.log("이미사용되고있는 아이디입니다."); // 콘솔에 에러메시지
          setChecked(''); // 사용가능 여부 메시지를 빈칸으로
          setCheckState(false); // 회원가입이 안되도록 checkState를 false로 
        } else { //같은게 없다면
          setError(""); // 에러메시지 없애기
          setChecked("사용가능한 아이디입니다."); // 사용가능하다는 메시지 보여주기
          setCheckState(true); // 회원가입이 가능하도록 checkState를 true로
        }
      }
      if(data.length === 0 || indexedUser === undefined){ // indexedDB에 저장된 데이터가 없거나 indexedDB를 통해 회원 가입한 사용자가 없으면
        const findId = checkUser(inputID); // 메모리에 저장된 사용자 아이디 중에 같은게 있는지 체크
        if(findId){ // 같은게 있다면
          setError("이미사용되고있는 아이디입니다."); // 에러메시지 세팅
          console.log("이미사용되고있는 아이디입니다."); // 콘솔에 에러메시지
          setChecked(''); // 사용가능 여부 메시지를 빈칸으로
          setCheckState(false); //회원가입이 안되도록 checkState를 false로     
        }else{
          setError(""); // 에러메시지 없애기
          setChecked("사용가능한 아이디입니다."); // 사용가능하다는 메시지 보여주기
          setCheckState(true); // 회원가입이 가능하도록 checkState를 true로
        };
      };
    });
  };

  const submit = () => { //등록 버튼 함수
    if(checkState === false){ //중복확인을 하지않았다면
      setError("아이디 중복확인을 해주세요."); // 에러메시지 세팅
    };
    if(!password.test(inputPWD)){ // 비밀번호가 10자리이상에 슷자나 문자를 포함하지 않았다면
      setError("비밀변호는 최소 8 자, 최소 하나의 문자 및 하나의 숫자를 포함하고 있어야합니다"); // 에러메시지 세팅
    };
    if(checkPWD === null){ // 비밀번호 확인 창에 입력을 하지 않았다면
      setError("비밀번호를 한번더 입력해주세요."); //에러 메시지 세팅
    };
    if(inputPWD !== checkPWD){ // 입력한 비밀번호와 비밀번호확인이 서로 다르면
      setError("입력하신 비밀번호가 다릅니다."); // 에러메시지 세팅
    };
    if(inputID === ""){ //아이디 입력창이 비어있다면
      setError("아이디를 입력해주세요"); //에러메시지 세팅
      console.log("아이디를 입력해주세요"); //콘솔로그에 에러보여주기
    };
    if(inputID !== null && inputPWD !== null && inputPWD !== null && checkPWD === inputPWD && password.test(inputPWD) && checkState === true){ // 입력창에 모두 비어있지 않고 중복확인을 하고 입력한 비밀번호와 비밀번호 확인이 같다면
      setItem({userData}); // indexedDB에 userData 저장
      console.log('회원이 되신 것을 환영합니다'); // 회원가입성공시 콘솔에 메시지보여주기
      setStateData(newObject); // 로그인화면이 보이도록 singUpState를 false로
      axios
      .post("http://127.0.0.1:8000/user/", {
        userID: inputID,
        userPWD: hashPwd
      })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.log(error)
      });
    };
  };

  const cancel = () => { // 취소버튼 함수
    setStateData(newObject); //회원 가입을 취소하고 로그인화면을 보여주기 위해 signUpState를 false로
  };

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
          <button onClick={checkSameID}>중복확인</button>
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