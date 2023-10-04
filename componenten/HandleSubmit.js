import BerechneBienenweide from "./BerechneBeinenweide";
import { setDispatch } from "./BluehstreifenReducer";


// export default  handleSubmit = (state,dispatch) => {
//     const ergebnisValue = BerechneBienenweide(state);
//     const aktulisierteErgebnisse = [...state.ergebnis, ergebnisValue];
//     setDispatch(dispatch, "SET_ERGEBNIS", aktulisierteErgebnisse);
//   };

  export function handleSubmit  (state,dispatch)  {
    const ergebnisValue = BerechneBienenweide(state);
    const aktulisierteErgebnisse = [...state.ergebnis, ergebnisValue];
    setDispatch(dispatch, "SET_ERGEBNIS", aktulisierteErgebnisse);
  };