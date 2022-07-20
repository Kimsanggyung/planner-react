import {useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(id))
  }, []);
  
  return (
    <div className="text-4xl">
      <span id="clock">{time.toLocaleTimeString()}</span>
    </div>
  )
}

export default Clock;