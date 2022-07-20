function today(){
  const date = new Date();
  const getDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  }
  return (
    <div className="text-4xl font-Do">
      <span id="clock">오늘날짜: {getDate.year}년 {getDate.month}월 {getDate.date}일</span>
    </div>
  )
}

export default today