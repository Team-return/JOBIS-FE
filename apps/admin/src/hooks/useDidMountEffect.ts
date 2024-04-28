/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

/** 처음 랜더링 되었을 때는 실행이 안 되었다가 두 번째 부터 실행되는 useEffect입니다. */
export const useDidMountEffect = (func: () => void, deps: Array<any>) => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    if (didMount) {
      func();
    } else {
      setDidMount(true);
    }
  }, deps);
};
