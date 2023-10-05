'use client'
import { useState } from "react";

export default function But({disabled, initialValue}:{disabled?:boolean, initialValue?:number}){
    const [count, setCount] = initialValue?useState(initialValue):useState(0);
    return(
        <div className="block w-fit">
        <button className="block bg-amber-300 border-solid border-black border rounded-sm" disabled={disabled} onClick={()=>{setCount(count+1)}}>
            fuk {count}
        </button>
        </div>
    )
}