import React, { useState } from "react";
import context from "./taskContext";


const taskState = (props)=>{
    const stateInitial = {
        add:false,
        data:"",
        edit:false
    }

    const [state,setState] = useState(stateInitial)

    return(
        <taskState.provider value={{state,setState}}>
            {props.children}
        </taskState.provider>
    )
}


export default taskState;