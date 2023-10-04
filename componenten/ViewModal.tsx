import {
  Modal,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { useStateContext, useDispatchContext } from "./StateProvider";
import { setErgebnisNull, setGemeinsamsameDatenNull } from "./SetErgebnisNull";
import { styles } from "./stylesViewModal";
import IconButton from "./IconButton";

interface TestIdProps {
  testID: any;
}

interface VisibilityProps {
  visible: boolean;
  onCancel: () => void;
}

interface ResultProps {
  ergebnis: Array<any>;
}
interface ModalViewProps extends TestIdProps, VisibilityProps, ResultProps {
  gemeinsameDaten: Record<string, any>;
}

export default function ViewModal(props: ModalViewProps) {
  const testID = props.testID;
  const visible = props.visible;
  const onCancel = props.onCancel;
  const gemeinsameDaten = props.gemeinsameDaten;
  const ergebnis = props.ergebnis;

  const state = useStateContext();
  const dispatch = useDispatchContext();

  const resetObject = () => {
    setErgebnisNull(dispatch);
    setGemeinsamsameDatenNull(dispatch);
    onCancel();
  };

  return ergebnis.length > 0 ? (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel} // required on Android
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.KeyboardAvoidingView}
      >
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View testID={testID} style={styles.resultContainer}>
              {ergebnis.map((ergebnis, i) => (
                <View key={i}>
                  <View style={styles.pflanzeItem}>
                    <Text
                      testID={`${testID}.pflanzeName`}
                      style={styles.pflanzeLabel}
                    >
                      Pflanzename:
                    </Text>
                    <Text
                      testID={`${testID}.pflanzeNameValue`}
                      style={styles.pflanzeValue}
                    >
                      {ergebnis.pflanzeName}
                    </Text>
                  </View>

                  <View style={styles.resultItem}>
                    <Text
                      testID={`${testID}.saatMenge`}
                      style={styles.resultLabel}
                    >
                      Benötigte Saatgutmenge (Gramm):
                    </Text>
                    <Text
                      testID={`${testID}.saatMengeValue`}
                      style={styles.resultValue}
                    >
                      {ergebnis.benötigteMenge}
                    </Text>
                  </View>
                  <View style={styles.resultItem}>
                    <Text
                      testID={`${testID}.aussatzeitpunkt`}
                      style={styles.resultLabel}
                    >
                      Aussaatzeitpunkt:
                    </Text>
                    <Text
                      testID={`${testID}.aussatzeitpunktValue`}
                      style={styles.resultValue}
                    >
                      {ergebnis.saatzeitpunkt}
                    </Text>
                  </View>
                  <View style={styles.resultItem}>
                    <Text
                      testID={`${testID}.vegetationszeit`}
                      style={styles.resultLabel}
                    >
                      Vegetationszeit:
                    </Text>
                    <Text
                      testID={`${testID}.vegetationszeitValue`}
                      style={styles.resultValue}
                    >
                      {ergebnis.bluetezeit}
                    </Text>
                  </View>
                  <View style={styles.resultItem}>
                    <Text
                      testID={`${testID}.gesamterZeitraum`}
                      style={styles.resultLabel}
                    >
                      Gesamter Zeitraum (Monate):
                    </Text>
                    <Text
                      testID={`${testID}.gesamterZeitraumValue`}
                      style={styles.resultValue}
                    >
                      {ergebnis.gesamterZeitraum}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.resultItemG}>
                <Text
                  testID={`${testID}.ernaehungProQm`}
                  style={styles.resultLabelG}
                >
                  Bienenernährung pro Quadratmeter (pro Tag):
                </Text>
                <Text
                  testID={`${testID}.ernaehungProQmValue`}
                  style={styles.resultValueG}
                >
                  {gemeinsameDaten.bienenernaehrungProQm}
                </Text>
              </View>
              <View style={styles.resultItemG}>
                <Text
                  testID={`${testID}.gesamtNahrungVegetationzeit`}
                  style={styles.resultLabelG}
                >
                  Gesamtnahrung während der Vegetationszeit:
                </Text>
                <Text
                  testID={`${testID}.gesamtNahrungVegetationzeitValue`}
                  style={styles.resultValueG}
                >
                  {gemeinsameDaten.gesamtnahrungBienen}
                </Text>
              </View>
              <View style={styles.resultItemG}>
                <Text
                  testID={`${testID}.co2Bindung`}
                  style={styles.resultLabelG}
                >
                  CO2-Bindung und -Reduktion (in KG):
                </Text>
                <Text
                  testID={`${testID}.co2BindungValue`}
                  style={styles.resultValueG}
                >
                  {gemeinsameDaten.co2Bindung}
                </Text>
              </View>
              <View style={styles.resultItemG}>
                <Text
                  testID={`${testID}.positiverBeitrag`}
                  style={styles.resultLabelG}
                >
                  Positiver CO2-Beitrag in Millionen Tonnen:
                </Text>
                <Text
                  testID={`${testID}.positiverBeitragValue`}
                  style={styles.resultValueG}
                >
                  {gemeinsameDaten.positiverCo2Beitrag}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <IconButton onPress={resetObject} icon="close" style={styles.close} />
    </Modal>
  ) : null;
}
