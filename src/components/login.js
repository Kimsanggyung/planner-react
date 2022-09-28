import { useEffect, useState } from 'react';
import CryptoJS from "crypto-js";
import axios from 'axios';
import LoginError from '../parts/loginError'
import { OuserData } from "../context/userData"

function Login({stateData, setStateData, setLoggedUser, token, setToken}){
  const [inputID, setInputID] = useState('');
  const [inputPWD, setInputPWD] = useState('');
  const [error, setError] = useState('');
  const [hashPwd, setHashPwd] =useState('');
  const [check, setCheck] = useState('');

  const setLogin = {...stateData, loginState: true};
  const setSignUp = {...stateData, signUpState: true};
  
  useEffect(()=>{// inputID inputPWD가 변경될 때 마다 실행
    setHashPwd(CryptoJS.MD5(inputID+inputPWD).toString()); //inputPWD saltKey를 합쳐서 hash처리
  },[inputID, inputPWD]);

  let saveID = localStorage.getItem('saveID');
  let loggedID = sessionStorage.getItem('loggedID')
  
  useEffect(()=>{ // 컴포넌트가 실행될 때
    if(saveID){
      setStateData(setLogin);
      setLoggedUser(saveID);
    }else if(loggedID){
      setStateData(setLogin);
      setLoggedUser(loggedID);
    }
  },[]);

  // const checkUser = (id, pwd) => { // 원하는 유저 찾기
	// 	const findUser = OuserData.find(user => user.id === id && user.pwd === pwd); 
	// 	return findUser;
	// };
 
  // const login = () => { // 로그인 버튼 함수
  //     // API 호출해서 유저 데이터 조회
  //     axios
  //     .post("http://127.0.0.1:8000/login/", {
  //       id: inputID,
  //       password: inputPWD
  //     })
  //     .then(function (response){
  //       console.log(response.status);
  //       localStorage.setItem('Token', response.data.Token)
  //       setToken(response.data.Token)
  //     })
  //     .catch(function (error){
  //       console.log(error)
  //     });
  //   axios
  //   .get("http://127.0.0.1:8000/user/")
  //   .then((response)=>{
  //     console.log(response.status)
  //     const userFromSever = response.data.find((data)=>{ // 서버에 등록되어 로그인하는 유저가 있는지 체크하기 위함
  //       return data;
  //     }); 
  //     if(response.data.length > 0){ // data 배열을 길이가 0보다 크면
  //       const checkUserAll = response.data.find((data)=>{ // 가져온 데이터에서 userData 찾기
  //         if(data){// userData가 있다면 
  //           const findUserInServer = data.userID === inputID && data.userPWD === hashPwd; // 로그인하는 유저와 가져온 데이터에 있는 유저정보와 비교
  //           const findUser = checkUser(inputID, inputPWD); //로그인하는 유저와 메모리에 있는 유저정보랑 비교
  //           return findUserInServer || findUser; //findIndexedUser findUser 둘중하나가 참인것 반환
  //         }else{ // 조건에 맞지 않은면
  //           return false; // 거짓이라고 반환
  //         };
  //       }); 
  //       if(inputPWD === ""){ //아이디 입력창이 비어있다면
  //         setError("비밀번호를 입력해주세요"); //에러메시지 세팅
  //         console.log("비밀번호를 입력해주세요"); // 콘솔로그에 에러보여주기
  //       };
  //       if(inputID === ""){ //비밀번호 입력창이 비어있다면
  //         setError("아이디를 입력해주세요"); //에러메시지 세팅
  //         console.log("아이디를 입력해주세요"); // 콘솔로그에 에러보여주기
  //       };
  //       if(inputID !== "" && inputPWD !== ""){ //입력창이 모두 비어있지않다면
  //         if(checkUserAll){ //checkUserAll가 참이면
  //           setLoggedUser(inputID); // loggedUser를 inputID로 세팅
  //           setStateData(setLogin); //loginState를 true로 해서 달력이나 다른 화면을 보여줌
  //         }else{//조건이 맞지 않으면
  //           setError("아이디 또는 비밀번호를 확인해주세요"); //에러메시지 세팅
  //           console.log("틀림"); // 콘솔로그에 에러보여주기
  //         };
  //       };
  //     }if(response.data.length === 0 || userFromSever === undefined){ // data배열 갈이가 0이거나 indexedUser가 없다면
  //       const findUser = checkUser(inputID, inputPWD); //로그인하는 유저정보와 메모리에 있는 유저정보랑 비교
  //       if(inputPWD === ""){ //아이디 입력창이 비어있다면
  //         setError("비밀번호를 입력해주세요"); //에러메시지 세팅
  //         console.log("비밀번호를 입력해주세요"); //콘솔로그에 에러보여주기
  //       };
  //       if(inputID === ""){ //비밀번호 입력창이 비어있다면
  //         setError("아이디를 입력해주세요"); //에러메시지 세팅
  //         console.log("아이디를 입력해주세요"); //콘솔로그에 에러보여주기
  //       };
  //       if(inputID !== "" && inputPWD !== ""){ //입력창이 모두 비어있지않다면
  //         if(findUser){ //findUser가 참이면
  //           setLoggedUser(inputID); // loggedUser를 inputID로 세팅
  //           setStateData(setLogin); //loginState를 true로 해서 달력이나 다른 화면을 보여줌
  //         }else{//조건이 맞지 않으면
  //           setError("아이디 또는 비밀번호를 확인해주세요"); //에러메시지 세팅
  //           console.log("틀림"); // 콘솔로그에 에러보여주기
  //         };
  //       };
  //     };
  //   })
  //   .catch(function(error){
  //     console.log(error);
  //   });
  //   if(check === "checked"){
  //     localStorage.setItem('saveID', inputID);
  //   };
  //   sessionStorage.setItem('loggedID', inputID)
  // };

  const login = () => { // 로그인 버튼 함수
    // API 호출해서 유저 데이터 조회
    if(inputPWD === ""){ //아이디 입력창이 비어있다면
      setError("비밀번호를 입력해주세요"); //에러메시지 세팅
      console.log("비밀번호를 입력해주세요"); // 콘솔로그에 에러보여주기
      };
    if(inputID === ""){ //비밀번호 입력창이 비어있다면
      setError("아이디를 입력해주세요"); //에러메시지 세팅
      console.log("아이디를 입력해주세요"); // 콘솔로그에 에러보여주기
    };
    if(inputID !== "" && inputPWD !== ""){
      axios
      .post("http://127.0.0.1:8000/login/", {
        id: inputID,
        password: inputPWD
      })
      .then(function (response){
        console.log(response.status);
        localStorage.setItem('Token', response.data.Token)
        setToken(response.data.Token)
        if(token){
          setLoggedUser(inputID); // loggedUser를 inputID로 세팅
          setStateData(setLogin); //loginState를 true로 해서 달력이나 다른 화면을 보여줌
          setError("")
          console.log(token)
          if(check === "checked"){
            localStorage.setItem('saveID', inputID);
          };
          sessionStorage.setItem('loggedID', inputID)
        };
      })
      .catch(function (error){
        console.log(error)
        setError("아이디 또는 비밀번호를 확인해주세요"); //에러메시지 세팅
        console.log("틀림"); // 콘솔로그에 에러보여주기
      });
    }
  };

  const inputIdChange = event => { // 아이디 입력창에 입력을 하는 등 이벤트가 발생하면 setInputID
    setInputID(event.target.value);
  };
  const inputPwdChange = event => { // 비밀번호 입력창에 입력을 하는 등 이벤트가 발생하면 setInputPWD
    setInputPWD(event.target.value);
  };
  const signUp = () => { // 회원가입 버튼 함수
    setStateData(setSignUp);
  };
  const clickCheck = () => { // 로그인 저장버튼 함수
    setCheck("checked");
  };

  if(!stateData.loginState){
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
            <button type="submit" onClick={login} className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">로그인</button>
          </div>
          <label><input onClick={clickCheck} className="mt-2" type="checkbox" id="id"></input>아이디 저장</label>
          <div className="flex items-center justify-between">
            <button onClick={signUp} className="text-blue-600 mt-4 underline underline-offset-2">회원가입</button>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Login;