import { setDispatch } from "./BluehstreifenReducer";

export const setErgebnisNull = (dispatch) => {
    setDispatch(dispatch, "SET_ERGEBNIS", []); // setze die Ergebnise Liste auf Null , wenn der User in Laufzeit der App erneut eine neue Liste aussuchen möchte
  };

export const setGemeinsamsameDatenNull = (dispatch) => {
    setDispatch(dispatch, "SET_GEMEINSAME_DATEN", {});
  };
