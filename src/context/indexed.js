export let db;
const dbReq = window.indexedDB.open('todoDatas',3);

dbReq.addEventListener('success', function(event){
  db = event.target.result;
});
dbReq.addEventListener('error', function(event){
  const error = event.target.result;
  console.log('error', error.name);
});
dbReq.addEventListener('upgradeneeded',function(event){
  db = event.target.result;
  let oldVersion = event.oldVersion;
  if(oldVersion < 1 ){
    db.createObjectStore('datas',{keyPath:'id',autoIncrement:true})
  }
})

export const setItem = (data) => {
  let store = db.transaction('datas', 'readwrite').objectStore('datas')
  let addReq = store.add(data);
  addReq.addEventListener('success',function(event){
    console.log(event.target.result)
  })
}

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    let store = db.transaction('datas', 'readonly').objectStore('datas')
    let getIdReq = id? store.get(id) : store.getAll();
    getIdReq.addEventListener('success',function(event){
      resolve(event.target.result)
    })
    getIdReq.addEventListener('error',function(event){
      reject(event)
    })
  })
}

export const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    let store = db.transaction('datas','readwrite').objectStore('datas');
    let deleteReq = store.delete(id)
    deleteReq.addEventListener('success', function(event){
      resolve(event)
    })
    deleteReq.addEventListener('error',function(event){
      reject(event)
    })
  })
}


