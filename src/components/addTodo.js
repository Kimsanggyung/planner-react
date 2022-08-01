import AddTodoError from "../parts/addTodoError";

function AddTodo(){
  let todo = '';
  let details = '';
  let error = '';

  const submit = () => {
    if(details === ''){
      error = "상세내용을 입력해주세요"
      console.log("상세내용을 입력해주세요")
    }
    if(todo === ""){
      error = "제목을 입력해주세요"
      console.log("제목을 입력해주세요")
    }
  }

  return(
    <div className="flex items-center flex justify-center mt-32 font-jua">
      <div className="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
        <div className="mb-4">
          <span>제목: </span>
          <input type="text" className="border border-gray-500"></input>
        </div>

        <div className="mb-6">
          <span>세부내용: </span>
          <input type="text" className="border border-gray-500"></input>
        </div>

        <div className="mb-8">
          <label for="start" >예정일:</label>
          <input type="text" name="start" className="border border-gray-500 w-24"></input>
          <select id="time">
            <option value="시간선택">시간선택</option>
            {/* {#each time as {num}}
              <option value={num}> {num}시 </option>
            {/each} */}
          </select>
        </div>
        <div>
          <AddTodoError error = {error}/>
        </div>
        <div>
          <button onClick={submit}>등록</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodo;