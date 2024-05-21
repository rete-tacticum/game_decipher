import React, { useReducer, useEffect } from "react";

import { getRandomFromArray } from "../../logic/helpers";

type RandomizeTextProps = {
  value: string;
  rate?: number;
  predelay?: number;
  replaceWith?: string;
  onStart?: () => void;
  onStop?: () => void;
};

type RandomizeActionState = {
  text: string[];
};

type RandomizeActionType = {
  type: string;
  idx: number;
  initial: string[];
};

const alpha = Array.from(Array(26)).map((_, i) => i + 65);
const special = `[!@#$%^&*]`.split("");
const alphabet = alpha.map((x) => String.fromCharCode(x)).concat(special);

const reducer = (
  state: RandomizeActionState,
  action: RandomizeActionType
): RandomizeActionState => {
  switch (action.type) {
    case "change":
      if (action.idx < action.initial.length) {
        return {
          text: state.text
            .slice(0, action.idx)
            .map(() => getRandomFromArray(alphabet))
            .concat(state.text.slice(action.idx)),
        };
      } else {
        return { text: action.initial };
      }
    default:
      return state;
  }
};

export const RandomizeText: React.FC<RandomizeTextProps> = ({
  value = "",
  rate = 600,
  predelay = 0,
  replaceWith = ".",
  onStart,
  onStop,
}) => {
  if (value === "") return <></>;

  const [state, dispatch] = useReducer(reducer, {
    text: Array.from(value).fill(replaceWith),
  });
  let symbols = value.split("") || [];

  useEffect(() => {
    const len = symbols.length;
    if (onStart) onStart();
    symbols.forEach((_, i) => {
      const idx = i + 1;
      const timer = setTimeout(() => {
        dispatch({
          type: "change",
          idx: idx,
          initial: symbols,
        });
        if (idx >= len && onStop) onStop();
      }, (rate / symbols.length) * idx + predelay);
      return () => clearTimeout(timer);
    });
  }, [value, rate]);

  return (
    <>
      <span style={{ wordBreak: "break-all" }}>{state.text}</span>
    </>
  );
};

export default RandomizeText;
