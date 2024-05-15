import React,{useRef} from 'react'

const DynamicButton = () => {
    const divRef = useRef(null);

    const handleClick = () => {
      divRef.current.style.backgroundColor = 'lightblue';
    };
  return (
    <div>
    <h2>Click to Change Background Color</h2>
    <div ref={divRef} style={{ width: '200px', height: '200px', border: '1px solid black', padding: '20px', cursor: 'pointer' }} onClick={handleClick}>
      Click me to change background color
    </div>
  </div>
  )
}

export default DynamicButton
