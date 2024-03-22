import * as React from "react";
import { RadioType } from "./types";
import {
  LabelStyle,
  RadioStyleBackgroundStyle,
  RadioStyle,
  RadioInCircle,
} from "./style.css";
import { clsx } from "clsx";
import { Text } from "../texts";

export const Radio = React.forwardRef(
  (props: RadioType, ref: React.Ref<HTMLInputElement>) => {
    const { checked = false, children, onClick, ...rest } = props;

    return (
      <>
        <label className={clsx([LabelStyle])} onClick={onClick}>
          <div
            className={clsx([RadioStyleBackgroundStyle({ checked: checked })])}
          >
            <input
              style={{ display: "none" }}
              type="radio"
              checked={checked}
              ref={ref}
              {...rest}
            />
            <div className={clsx([RadioStyle({ checked: checked })])}>
              <div className={clsx([RadioInCircle({ checked: checked })])} />
            </div>
          </div>
          <Text fontSize="body1" fontWeight="medium" color="#000000">
            {children}
          </Text>
        </label>
      </>
    );
  }
);
