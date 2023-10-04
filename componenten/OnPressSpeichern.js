import { setDispatch } from "./BluehstreifenReducer";
import {handleSubmit} from "./HandleSubmit";

export function onPressSpeichern (state,dispatch) {
    setDispatch(dispatch, "SET_IS_FLAG", false);
    handleSubmit(state,dispatch);
}