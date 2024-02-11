import * as React from "react";
import { useState, Children } from "react";
import { RadioGroupType } from "./types";
import { Radio } from "./index";
import { RadioGroupWarpperStyle } from "./radioGroupStyle.css";
import { clsx } from "clsx";

export const RadioGroup = (props: RadioGroupType) => {
  const { children, className, direction = "column", value, setValue } = props;
  
  return (
    <div className={`${clsx(RadioGroupWarpperStyle({"flexDirection": direction}))}`}>
      {
        Children.map(children, (child, idx)=>{        
          const modifiedProps = {
            key : idx,
            checked: child.props.value === value,
            onClick: ()=>{ setValue(child.props.value) }
          }
          
          return React.cloneElement(child, modifiedProps);
        })
      }
    </div>
  )
}