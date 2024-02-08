import * as React from "react";
import { RadioType } from "./types";
import {
  RadioStyleBackgroundStyle,
  LabelStyle,
  RadioStyle,
} from "./style.css";
import { clsx } from "clsx";
import { Text } from "@jobis/ui";

export const Radio = (props: RadioType, ref: React.Ref<HTMLInputElement>) => {
  const { checked, children } = props;

  return (
    <label className={clsx([LabelStyle])}>
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
      <div>
        {"children"}
      </div>
    </label>
  )
}