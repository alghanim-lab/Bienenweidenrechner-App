import { setDispatch } from "./BluehstreifenReducer";
import ErgebnisseZusammenfasen from "./ErgebnisseZusammenfasen";


export function onPressBerechnen (state,dispatch) {
  
    if (state.ergebnis.length > 0)
    {
       {
        setDispatch(dispatch, "SET_ZEIGE_VIEW", true);
        setDispatch(dispatch, "SET_GEMEINSAME_DATEN", ErgebnisseZusammenfasen(state));
        setDispatch(dispatch, "SET_IS_FLAG", true);
      }
    }
  }