export let db;
const dbReq = window.indexedDB.open('todoDatas',3); //indexedDB열기

dbReq.addEventListener('success', function(event){  //open성공하면
  db = event.target.result; //db에 할당
});
dbReq.addEventListener('error', function(event){ //open 실패하면
  const error = event.target.result; // 에러
  console.log('error', error.name); // 콘솔로그에 에러메시지 보여주기
});
dbReq.addEventListener('upgradeneeded',function(event){ //업그레이드가 필요하면
  db = event.target.result; // db에 할당
  let oldVersion = event.oldVersion; //버전확인을 위한 변수
  if(oldVersion < 1 ){ //oldVersion이 1보다 작으면
    db.createObjectStore('datas',{keyPath:'id',autoIncrement:true}) //store생성
  };
});

export const setItem = (data) => { // indexedDB에 데이터 추가하는 함수
  let store = db.transaction('datas', 'readwrite').objectStore('datas') // datas store에 접근
  let addReq = store.add(data); // parameter로 받아온 데이터를 스토어에 추가
  addReq.addEventListener('success',function(event){ // 성공이벤트
    console.log(event.target.result);
  });
};

export const getItem = (id) => { // indexedDB에서 데이터를 가져오는 함수 
  return new Promise((resolve, reject) => { //비동기 처리
    let store = db.transaction('datas', 'readonly').objectStore('datas') // datas store에 접근
    let getIdReq = id? store.get(id) : store.getAll();  // parameter로 받아온 id로 데이터 가져오기
    getIdReq.addEventListener('success',function(event){ // 성공이벤트
      resolve(event.target.result);
    });
    getIdReq.addEventListener('error',function(event){ // 실패 이벤트
      reject(event);
    });
  });
};

export const deleteTodo = (id) => { // indexedDB에서 데이터를 삭제하는 함수 
  return new Promise((resolve, reject) => { //비동기 처리
    let store = db.transaction('datas','readwrite').objectStore('datas'); // datas store에 접근
    let deleteReq = store.delete(id); // parameter로 받아온 id로 데이터 삭제하기 
    deleteReq.addEventListener('success', function(event){ // 성공이벤트
      resolve(event);
    });
    deleteReq.addEventListener('error',function(event){ // 실패 이벤트
      reject(event);
    });
  });
};


