import { Modal,Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, View, FlatList, SafeAreaView ,ScrollView,Dimensions} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'




export default function ViewModal(props) {

    const testID=props.testID;
    const visible =props.visible;
    const onCancel = props.onCancel;
    const gemeinsameDaten = props.gemeinsameDaten;
    //  const [ergebnis, setErgebnis] = useState([props.ergebnis]);
     const ergebnis = props.ergebnis;
    
   
    // useEffect(() => {
    //     setErgebnis(props.ergebnis);

    // }, [props.ergebnis])

    
return (

<Modal
visible={visible}
animationType='slide'
onRequestClose={onCancel} // required on Android
>


<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.KeyboardAvoidingView} >  

 <View style={styles.modalContent}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View testID={testID} style={styles.resultContainer}>

    {ergebnis.map((ergebnis, i) => (
      <View key={i}>


      <View style={styles.resultItem}>
          <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>Pflanzename:</Text>
          <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{ergebnis.pflanzeName}</Text>
        </View>
    
        <View style={styles.resultItem}>
          <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>Benötigte Saatgutmenge (Gramm):</Text>
          <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{ergebnis.benötigteMenge}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.aussatzeitpunkt`} style={styles.resultLabel}>Aussaatzeitpunkt:</Text>
          <Text testID={`${testID}.aussatzeitpunktValue`}style={styles.resultValue}>{ergebnis.saatzeitpunkt}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.flaeche`} style={styles.resultLabel}>Fläche bietet Nahrung für Bienen pro Tag:</Text>
          <Text testID={`${testID}.flaecheValue`} style={styles.resultValue}>{ergebnis.gesamtAnzahlBienenProQm}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.vegetationszeit`} style={styles.resultLabel}>Vegetationszeit:</Text>
          <Text testID={`${testID}.vegetationszeitValue`} style={styles.resultValue}>{ergebnis.bluetezeit}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.gesamterZeitraum`} style={styles.resultLabel}>Gesamter Zeitraum (Monate):</Text>
          <Text testID={`${testID}.gesamterZeitraumValue`} style={styles.resultValue}>{ergebnis.gesamterZeitraum}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.nahrungfuerBienen`} style={styles.resultLabel}>Nahrung für Bienen über die Vegetationszeit:</Text>
          <Text testID={`${testID}.nahrungfuerBienenValue`} style={styles.resultValue}>{ergebnis.nahrungFürBienen}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.co2Bindung`} style={styles.resultLabel}>CO2-Bindung (in KG):</Text>
          <Text testID={`${testID}.co2BindungValue`} style={styles.resultValue}>{ergebnis.co2Bindung}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.positiverBeitrag`} style={styles.resultLabel}>Positiver Beitrag (CO2 übrig in Millionen Tonnen):</Text>
          <Text testID={`${testID}.positiverBeitragValue`} style={styles.resultValue}>{ergebnis.positiverBeitrag}</Text>
        </View>
        </View>


     ))}

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

               

        {/* <View style={styles.resultItem}>
        <Text>{console.log("viewModel")}</Text>
          <Text>{console.log(ergebnis)}</Text>
          <Text testID={`${testID}.saatMenge`} style={styles.resultLabel}>Benötigte Saatgutmenge (Gramm):</Text>
          <Text testID={`${testID}.saatMengeValue`} style={styles.resultValue}>{ergebnis.benötigteMenge}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.aussatzeitpunkt`} style={styles.resultLabel}>Aussaatzeitpunkt:</Text>
          <Text testID={`${testID}.aussatzeitpunktValue`}style={styles.resultValue}>{ergebnis.saatzeitpunkt}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.flaeche`} style={styles.resultLabel}>Fläche bietet Nahrung für Bienen pro Tag:</Text>
          <Text testID={`${testID}.flaecheValue`} style={styles.resultValue}>{ergebnis.gesamtAnzahlBienenProQm}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.vegetationszeit`} style={styles.resultLabel}>Vegetationszeit:</Text>
          <Text testID={`${testID}.vegetationszeitValue`} style={styles.resultValue}>{ergebnis.bluetezeit}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.gesamterZeitraum`} style={styles.resultLabel}>Gesamter Zeitraum (Monate):</Text>
          <Text testID={`${testID}.gesamterZeitraumValue`} style={styles.resultValue}>{ergebnis.gesamterZeitraum}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.nahrungfuerBienen`} style={styles.resultLabel}>Nahrung für Bienen über die Vegetationszeit:</Text>
          <Text testID={`${testID}.nahrungfuerBienenValue`} style={styles.resultValue}>{ergebnis.nahrungFürBienen}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.co2Bindung`} style={styles.resultLabel}>CO2-Bindung (in KG):</Text>
          <Text testID={`${testID}.co2BindungValue`} style={styles.resultValue}>{ergebnis.co2Bindung}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text testID={`${testID}.positiverBeitrag`} style={styles.resultLabel}>Positiver Beitrag (CO2 übrig in Millionen Tonnen):</Text>
          <Text testID={`${testID}.positiverBeitragValue`} style={styles.resultValue}>{ergebnis.positiverBeitrag}</Text>
        </View> */}

      
     </View>
 
    </ScrollView>
     
  </View> 
{/* {ergebnis.benötigteMenge !== null ? check: <View>No data</View> } */}
    {/* <Pressable
            style= {styles.close}
            onPress={onCancel}> 
            <MaterialIcons name="close" size={Dimensions.get("window").width * 0.1} color="#228b22" />
     </Pressable>   */}
     
     </KeyboardAvoidingView>
 
     <Pressable
              style= {styles.close}
              onPress={onCancel}> 
              <MaterialIcons name="close" size={Dimensions.get("window").width * 0.1} color="#228b22" />
      </Pressable> 
</Modal> 

)};



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
});
