import React,{useRef, useState} from 'react'

const ValidateForm = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [error , setError] = useState("")

    const handleSubmit=(e)=>{
        e.preventDefault();

        const formData={
            name: ref1.current.value,
            email:ref2.current.value
        }

        if(formData.name==""){
            setError("Name field cannot be empty");
            return;
        }
        if(formData.email==""){
            setError("Email  field cannot be empty");
            return;
        }
    }
  return (
    <>
    <h1>Form Validation</h1>
    <form onSubmit={handleSubmit}>
      <input type='text' ref={ref1} placeholder='name'/>
      <input type='text' ref={ref2} placeholder='email'/>
      {error && <h2 style={{color:"red"}}>{error}</h2>}
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default ValidateForm
