import React, { useRef, useEffect } from 'react';
import DynamicButton from './DynamicButton';

function App() {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = () => {
    inputRef.current.style.backgroundColor = "lightblue";
  };

  const handleChangeUncontrol = (e) => {
    e.preventDefault();
    console.log(inputRef2.current.value);
  };



  return (
    <div>
      <h1>Control Input field</h1>
      <input type='text' ref={inputRef} onChange={handleChange} />
      <h1>Uncontrol Input Field</h1>
      <input type='text' ref={inputRef2} onChange={handleChangeUncontrol} />
      <DynamicButton />
    </div>
  );
}

export default App;
