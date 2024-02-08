import { useState } from "react";
import { RadioGroupType } from "./types";

export const RadioGroup = (props: RadioGroupType) => {
  const { children } = props
  const [selectRadioId, setSelectRadioId] = useState<number>(0)
  
  return (
    <div>
      <p>RadioGroup</p>
    </div>
  )
}