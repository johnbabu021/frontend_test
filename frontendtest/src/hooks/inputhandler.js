import { useState } from "react";

export default function InputHandler(data){
    const [state,setState]=useState(data)
    const onChange=(e)=>{
setState(e.target.value)
    }
    // console.log(state)
    return{
        onChange,
        value:state
    }


}