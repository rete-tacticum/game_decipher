import { createRoot } from "react-dom/client";
import DecipherGame from "../src/components/DecipherGame";
import type { ConfigParams } from "../src/logic/types";

export default function renderDecipherGame(
  element: HTMLElement,
  props: ConfigParams
) {
  const root = createRoot(element);
  root.render(<DecipherGame {...props} />);
}

export type { ConfigParams };
