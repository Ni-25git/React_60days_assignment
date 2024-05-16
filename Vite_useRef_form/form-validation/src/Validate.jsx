import React,{useRef,useState} from 'react'

const Validate = () => {
    const ref = useRef(null);;
    const [isValid , setIsValid] = useState(false)

    const handleValidate=()=>{
        setIsValid(ref.current.value.length>=5)
    }
  return (
    <div>
        <h1>Validate input </h1>
      <input ref={ref} type='text' style={{borderColor: isValid ? "green" : "red"}} onChange={handleValidate}/>
      {isValid ? (<h3 style={{color:"green"}}>Valid Input</h3>) : (<h3 style={{color:"red"}}>Input have atleast 5 character</h3>)}
    </div>
  )
}

export default Validate
