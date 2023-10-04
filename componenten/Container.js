import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {data,} from "./BluehstreifenReducer";


 
 export function speicherePflanzenarten(neueListe) {

  //speicherun der Pflanzenarten in AsyncStorage
  AsyncStorage.setItem("pflanzenarten", JSON.stringify(neueListe));
  console.log('neueListe')
  console.log(neueListe)
}

 

 export async function loadPflanzenarten(dispatch) {
    try {
      const pflanzenartenFromDB = await AsyncStorage.getItem("pflanzenarten");

      if (pflanzenartenFromDB !== null && pflanzenartenFromDB !== "[]" && pflanzenartenFromDB.length> 0 ) {

        // String wieder in Array Form umwandeln
        const parsedPflanzenarten = JSON.parse(pflanzenartenFromDB);

        // Pflanzenarten im State ablegen
        dispatch({ type: "SET_PFLANZENARTEN", payload: parsedPflanzenarten });
      } else {
        dispatch({ type: "SET_PFLANZENARTEN", payload: data });
        speicherePflanzenarten(data);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Pflanzenarten: " + error);
    }
  }
