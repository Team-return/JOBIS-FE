import * as React from "react";
import { RadioType } from "./types";
import {
  RadioStyleBackgroundStyle,
  LabelStyle,
  RadioStyle,
} from "./radioStyle.css";
import { clsx } from "clsx";
import { Text } from "../texts";

export const Radio = (props: RadioType, ref: React.Ref<HTMLInputElement>) => {
  const { checked, children, onClick } = props;

  return (
    <>
    <label className={clsx([LabelStyle({checked: checked})])} onClick={onClick}>
      <div className={clsx([RadioStyleBackgroundStyle])}>
        <input 
          style={{"display": "none"}}
          type="radio" 
          checked={checked}
        />
        <div className={clsx([RadioStyle({checked: checked})])}>
          <div />
        </div>
      </div>
      <Text fontSize="body1" fontWeight="medium" color="#000000">
        {children}
      </Text>
    </label>
    </>
  )
}