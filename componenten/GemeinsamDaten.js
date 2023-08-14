import { Modal,Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, View, FlatList, SafeAreaView ,ScrollView,Dimensions} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import MultipleViewMap from "./MultipleViewMap";

export default function GemeinsamDaten(props) {

    const gemeinsameDaten = props.gemeinsameDaten;
    let [visible,setVisible] = useState(true);
    const onCancel = false;
    const testID = props.testID;
    const ergebnis = props.ergebnis;
    const setIsFlag=props.setIsFlag;
    const ergebnisDargestellt = props.ergebnisDargestellt;
    const isErgebnis= props.isErgebnis;

    console.log('GemeinsameDaten')
    console.log(visible)
    console.log('Gemeinsam ergebnisD: ' + ergebnisDargestellt)

  return (
   ergebnisDargestellt === false ? <MultipleViewMap ergebnis = {ergebnis} /> : 
   <Modal
    visible = {visible}
    animationType='fade'
    >
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.KeyboardAvoidingView} >  
  <View style={styles.modalContent}>
     <ScrollView contentContainerStyle={styles.scrollViewContent}>
     <View testID={testID} style={styles.resultContainer}>
 
    <View style={styles.resultItem}>
              <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>Bienenernährung pro Quadratmeter:</Text>
              <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{gemeinsameDaten.bienenernaehrungProQm}</Text>
            </View>
    <View style={styles.resultItem}>
              <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>Gesamtnahrung für Bienen während der Vegetationszeit:</Text>
              <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{gemeinsameDaten.gesamtnahrungBienen}</Text>
            </View>
    <View style={styles.resultItem}>
              <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>CO2-Bindung und -Reduktion:</Text>
              <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{gemeinsameDaten.co2Bindung}</Text>
            </View>
    <View style={styles.resultItem}>
              <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>Positiver CO2-Beitrag in Millionen Tonnen:</Text>
              <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{gemeinsameDaten.positiverCo2Beitrag}</Text>
            </View>
  <Pressable
          style= {styles.close}
          onPress= { ()=>
            {isErgebnis(false);
              setVisible(false);
            setIsFlag(false);
             }}> 
          <MaterialIcons name="close" size={Dimensions.get("window").width * 0.1} color="#228b22" />
  </Pressable> 

  </View>
   
   </ScrollView>
    
 </View> 
    </KeyboardAvoidingView>


    </Modal>
  )
}


const styles = StyleSheet.create({
  
  KeyboardAvoidingView: {
      flex: 1,
    },
    modalContent: {
       flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    scrollViewContent: {
      //  flexGrow: 3,
      // flex : 1,
    },
    resultTitle: {

      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    resultContainer: {
      flex: 1,
      marginTop: 100,


    },
    resultItem: {
       flex : 0.1,
      //  top: 120,
      borderWidth: 3,
      flexDirection: 'column',
      // justifyContent: 'space-between',
      alignItems: 'baseline',
      marginVertical: 5,
      flexWrap:'wrap',
      width: Dimensions.get('window').width * 0.9, // 80% of screen's width
      height: Dimensions.get('window').height * 0.1 // 10% of screen's height
    },
    resultLabel: {
      fontSize: Dimensions.get('window').width * 0.0328,
      fontWeight: 'bold',
      flex: 1,
    },
    resultValue: {
      fontSize:  Dimensions.get('window').width * 0.037,
      flex: 1,
      textAlign: 'right',
    },
    close: {
      marginTop: 20,
      position: 'absolute',
      top: Dimensions.get('window').width * 0.1,
      right: 20,
    },
    next: {
      marginTop: 20,
      position: 'absolute',
      top: Dimensions.get('window').width * 0.1,
      left: 20,
    },
});