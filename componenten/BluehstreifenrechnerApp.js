import React, {useRef} from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import NeuePflanzenart from "./NeuePflanzenart";
import ViewModal from "./ViewModal";
import { ButtonAnimiert, setAnimtedName } from "./ButtonAnimation";
import {setDispatch,} from "./BluehstreifenReducer";
import { useDispatchContext, useStateContext } from "./StateProvider";
import {alertDeletePflanzenart} from "./LoeschePflanzeart"
import {onPressBerechnen} from "./OnPressBerechnen";
import {onPressSpeichern} from "./OnPressSpeichern";
import BigButton from "./BigButton";
import IconButton from "./IconButton";
import { setPickerWidth } from "./SetPickerWidth";


const BluehstreifenrechnerApp = () => {

  const state = useStateContext();
  const dispatch = useDispatchContext();

  
  function checkAusgewaehlterPfalnzenart() {
    // Beim ersten Laden der App muss ein Value für Detox Test gesetzt werden
    if (state.ausgewähltePflanzenart == null) {
      setDispatch(dispatch, "SET_AUSGEWÄHLTE_PFLANZENART", "Buchweizen");
      setDispatch(dispatch, "SET_AUSGEWÄHLTE_PFLANZENART", "Buchweizen");
      return;
    } else {
      return state.ausgewähltePflanzenart;
    }
  }



  // Button Animation (Speichern und Berechnen)
  const fadeAnimSpeichern = useRef(new Animated.Value(1)).current;
  const fadeAnimBerechnen = useRef(new Animated.Value(1)).current;

  const fadeInSpeichern = ButtonAnimiert(fadeAnimSpeichern, 0.4);
  const fadeOutSpeichern = ButtonAnimiert(fadeAnimSpeichern, 1);

  const fadeInBerechnen = ButtonAnimiert(fadeAnimBerechnen, 0.4);
  const fadeOutBerechnen = ButtonAnimiert(fadeAnimBerechnen, 1);

  const AnimatedSpeichern = setAnimtedName(
    fadeAnimSpeichern,
    styles.ButtonText,
    "Speichern"
  );
  const AnimatedBerechnen = setAnimtedName(
    fadeAnimBerechnen,
    styles.ButtonText,
    "Berechnen"
  );

  

  return (
   <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.container}
     >
       <ScrollView
         contentContainerStyle={styles.contentContainer}
         keyboardShouldPersistTaps="handled"
       >
         <View style={styles.form}>
           <View style={[styles.fieldHeader, { flexDirection: "row", flex: 0.2 }]} >
              <View>
                  <IconButton
                  onPress={ ()=>setDispatch(dispatch, "SET_ZEIGE_NEUE_DIALOG", true) }
                  icon = "add-circle"
                  style={styles.addIcon}
                  />
                  <NeuePflanzenart
                    testID="neuePlanzenart"
                    visible={state.zeigeNeueDialog}
                    onCancel={() =>
                      setDispatch(dispatch, "SET_ZEIGE_NEUE_DIALOG", false)
                    }
                  />
              </View>
  
              <View>
                  <IconButton
                  onPress={() => alertDeletePflanzenart(state,dispatch)}
                  icon="delete"
                  style={styles.deleteIcon}
                  />
              </View>
           </View>
 
           <View style={[styles.field, { flex: 0.5 }]}>
             <Text style={styles.label}>Aussaatfläche (in Quadratmetern):</Text>
             <TextInput
               style={styles.input}
               keyboardType="numeric"
               value={state.aussaatFläche}
               onChangeText={(value) =>
                 setDispatch(dispatch, "SET_AUSSAAT_FLÄCHE", value)
               }
               required
               testID="aussaatFlächeInput" 
             />
           </View>
 
           <View style={[styles.field]}>
             <Text style={[styles.label, { flex: 0.3 }]}>
               Gewünschte Pflanzenart:
             </Text>
             <Picker
               testID="pflanzenartPicker" 
               style={ [ styles.picker,{ flex: 2 },setPickerWidth() ] }
               selectedValue={state.ausgewähltePflanzenart}
               onValueChange={ (value) => { setDispatch(dispatch, "SET_AUSGEWÄHLTE_PFLANZENART", value) } }
               required
             >
               <Picker.Item label="Bitte wählen" value="" />
               {state.pflanzenarten.map((pflanze) => (
                 <Picker.Item
                   key={state.index}
                   label={pflanze.name}
                   value={pflanze.name}
                 />
               ))}
             </Picker>
           </View>
 
           <View style={[styles.field, { flex: 0.5 }]}>
             <Text style={[styles.label, { flex: 0.5 }]}>
               CO2-Emissionen in Millionen Tonnen:
             </Text>
             <TextInput
               style={[styles.input, { flex: 0.5 }]}
               keyboardType="numeric"
               value={state.co2InDerStadt}
               onChangeText={(value) =>
                 setDispatch(dispatch, "SET_CO2_IN_DER_STADT", value)
               }
               required
               testID="co2Input" 
             />
           </View>
 
           <View style={styles.buttonContainer}>
                <BigButton 
                onPress={()=>onPressSpeichern(state,dispatch)} 
                onPressIn={fadeInSpeichern}
                onPressOut={fadeOutSpeichern}
                animateName={AnimatedSpeichern}
                style={styles.extraSpeichern}
                testID="speichernnButton"
                  />

                <BigButton
                onPress={()=> onPressBerechnen(state,dispatch)} 
                onPressIn={fadeInBerechnen}
                onPressOut={fadeOutBerechnen}
                animateName={AnimatedBerechnen}
                style={styles.extraBerchnen}
                >
                    <ViewModal
                        testID="berechnenButton"
                        visible={state.zeigeView}
                        onCancel={() => setDispatch(dispatch, "SET_ZEIGE_VIEW", false)}
                        ergebnis={state.ergebnis !== null ? state.ergebnis : ""}
                        gemeinsameDaten={
                          state.gemeinsameDaten !== null ? state.gemeinsameDaten : ""
                        }
                      />
                </BigButton>

           </View>
         </View>
       </ScrollView>
     </KeyboardAvoidingView>
  );
};

export default BluehstreifenrechnerApp;
