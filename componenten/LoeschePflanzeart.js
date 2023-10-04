import {Alert} from "react-native";
import { setDispatch } from "./BluehstreifenReducer";
import {speicherePflanzenarten} from "./Container";

 function entfernePflanzeVonListe(state,dispatch) {
    const updateList = state.pflanzenarten.filter(
      (pflanze) => pflanze.name !== state.ausgewähltePflanzenart
    );
    setDispatch(dispatch, "SET_PFLANZENARTEN", updateList);
    speicherePflanzenarten(updateList);
  }

  export  function alertDeletePflanzenart(state,dispatch) {
    Alert.alert(
      "Pflanze löschen",
      "soll die Pflanzenart wirkloch gelöscht werden?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Bestätigen",
          style: "destructive",
          onPress: () =>entfernePflanzeVonListe(state,dispatch),
        },
      ]
    );
  }