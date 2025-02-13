import { useState, useEffect } from 'react';

export default function TestFetch() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
    const timer = setInterval(() => {
      console.log('Timer tick');
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{padding: 20, background: 'white'}}>
      <h1>Pure Test Component</h1>
      <p>Counter: {count}</p>
    </div>
  );
} 