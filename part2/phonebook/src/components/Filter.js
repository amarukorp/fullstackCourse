import React from "react";

const Filter = ({ value, onchange})=>{

    return(
        <div>
        Filter shown with  <input 
          value={value}
          onChange={onchange}>
        </input>
      </div>
    )

}
export default Filter