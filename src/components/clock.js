import {useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => { //컴포넌트가 실행되면
    const interval = setInterval(() => { //1초마다 실행
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(interval)) //컴포넌트가 실행이 끝나면 interval실행끝내기
  }, []);
  
  return (
    <div className="text-3xl font-Do">
      <span id="clock">{time.toLocaleTimeString()}</span>
    </div>
  )
}

export default Clock;