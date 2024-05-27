import ReactDOM from "react-dom";
import DecipherGame from "../src/components/DecipherGame";
import type { ConfigParams } from "../src/logic/types";

export default function renderDecipherGame(
  element: HTMLElement,
  props: ConfigParams
) {
  ReactDOM.render(<DecipherGame {...props} />, element);
}
