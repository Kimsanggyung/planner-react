import {useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  // 시계컴포넌트 1초마다 현재시간를 세팅하고 컴포넌트가 종료되면 실행을 종료
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(interval))
  }, []);
  
  return (
    <div className="text-3xl font-Do">
      <span id="clock">{time.toLocaleTimeString()}</span>
    </div>
  );
};

export default Clock;