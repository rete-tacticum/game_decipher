import actionHandlers from "./handlers";
import { ActionType, GameStateType } from "./types";

const decipherGameReducer = (state: GameStateType, action: ActionType) => {
  // @ts-ignore
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action.payload) : state;
};

export default decipherGameReducer;