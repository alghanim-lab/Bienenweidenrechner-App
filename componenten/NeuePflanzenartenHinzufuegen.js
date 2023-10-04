import { setDispatch } from "./BluehstreifenReducer";
import {speicherePflanzenarten} from "./Container";




export default function NeuePflanzenartenHinzufuegen(    pflanze,
    saatgutqm,
    zeitpunkt,
    bluetZeit,
    vegatationZeit,
    state,
    dispatch
) {
   

  // console.log('state from NeuePflanzenartenHinzufuegen')
  // console.log(state) 
    setDispatch(dispatch, "SET_ZEIGE_NEUE_DIALOG", false); // als nächstes muss der Dialog geschlosswn werden
    // neue Pflanzenart den bisherigen hinzufügen
    const neuePflanzen = [
      ...state.pflanzenarten, //...-> spread-Operator
      {
        name: pflanze,
        saatgutProQuadratmeter: saatgutqm,
        saatzeitpunkt: zeitpunkt,
        bluetezeit: bluetZeit,
        vegetationszeit: vegatationZeit,
      },
    ];
    setDispatch(dispatch, "SET_PFLANZENARTEN", neuePflanzen);
    speicherePflanzenarten(neuePflanzen);
}



