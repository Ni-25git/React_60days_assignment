import React,{useRef} from 'react'

const TabFocus = () => {
    const ref1= useRef(null)
    const ref2= useRef(null)
    const ref3= useRef(null)
    const ref4= useRef(null)

    const handleTab=(e,ref)=>{
        if(e.Key=="Tab"){
                ref.current.focus();
              
        }
    }
  return (
    <div>
        <h1>Dynamic Form Input Focus</h1>
      <input type='text' ref={ref1} placeholder='Enter your name' onKeyDown={(e)=>handleTab(e,ref2)}/>
      <input type='text' ref={ref2} placeholder='Enter your email'onKeyDown={(e)=>handleTab(e,ref3)}/>
      <input type='text' ref={ref3} placeholder='Enter your password' onKeyDown={(e)=>handleTab(e,ref4)}/>
      <input type='text' ref={ref4} placeholder='Enter your password' onKeyDown={(e)=>handleTab(e,ref1)}/>
    </div>
  )
}

export default TabFocus
