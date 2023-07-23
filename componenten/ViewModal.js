import { Modal,Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, View, FlatList, SafeAreaView ,ScrollView,Dimensions} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'




export default function ViewModal(props) {
    const visible =props.visible;
    const onCancel = props.onCancel;
    //  const [ergebnis, setErgebnis] = useState([props.ergebnis]);
     const ergebnis = props.ergebnis;
   
    // useEffect(() => {
    //     setErgebnis(props.ergebnis);

    // }, [props.ergebnis])


 
//  const check =   (<View style={styles.modalContent}>
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <Text style={styles.resultTitle}>Ergebnis:</Text>
//       <View style={styles.resultContainer}>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Benötigte Saatgutmenge (Gramm):</Text>
         
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Aussaatzeitpunkt:</Text>
//           <Text style={styles.resultValue}>{ergebnis.saatzeitpunkt}</Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Fläche bietet Nahrung für Bienen pro Tag:</Text>
//           <Text style={styles.resultValue}>{ergebnis.gesamtAnzahlBienenProQm}</Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Vegetationszeit:</Text>
//           <Text style={styles.resultValue}>{ergebnis.bluetezeit}</Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Gesamter Zeitraum (Monate):</Text>
//           <Text style={styles.resultValue}>{ergebnis.gesamterZeitraum}</Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Nahrung für Bienen über die Vegetationszeit:</Text>
//           <Text style={styles.resultValue}>{ergebnis.nahrungFürBienen}</Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>CO2-Bindung (in KG):</Text>
//           <Text style={styles.resultValue}>{ergebnis.co2Bindung}</Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Positiver Beitrag (CO2 übrig in Millionen Tonnen):</Text>
//           <Text style={styles.resultValue}>{ergebnis.positiverBeitrag}</Text>
//         </View>
//       </View>
//     </ScrollView>
//   </View>
   
//  )

return (

<Modal
visible={visible}
animationType='slide'
onRequestClose={onCancel} // required on Android
>


<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.KeyboardAvoidingView} >  

 <View style={styles.modalContent}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.resultTitle}>Ergebnis:</Text>
      <View style={styles.resultContainer}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Benötigte Saatgutmenge (Gramm):</Text>
          <Text style={styles.resultValue}>{ergebnis.benötigteMenge}</Text>

        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Aussaatzeitpunkt:</Text>
          <Text style={styles.resultValue}>{ergebnis.saatzeitpunkt}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Fläche bietet Nahrung für Bienen pro Tag:</Text>
          <Text style={styles.resultValue}>{ergebnis.gesamtAnzahlBienenProQm}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Vegetationszeit:</Text>
          <Text style={styles.resultValue}>{ergebnis.bluetezeit}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Gesamter Zeitraum (Monate):</Text>
          <Text style={styles.resultValue}>{ergebnis.gesamterZeitraum}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Nahrung für Bienen über die Vegetationszeit:</Text>
          <Text style={styles.resultValue}>{ergebnis.nahrungFürBienen}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>CO2-Bindung (in KG):</Text>
          <Text style={styles.resultValue}>{ergebnis.co2Bindung}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Positiver Beitrag (CO2 übrig in Millionen Tonnen):</Text>
          <Text style={styles.resultValue}>{ergebnis.positiverBeitrag}</Text>
        </View>
      </View>
    </ScrollView>
  </View> 
{/* {ergebnis.benötigteMenge !== null ? check: <View>No data</View> } */}
    <Pressable
            style= {styles.close}
            onPress={onCancel}> 
            <MaterialIcons name="close" size={36} color="#483d8b" />
     </Pressable>  
     
     </KeyboardAvoidingView>

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
        flexGrow: 1,
        flex : 1,
      },
      resultTitle: {

        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      resultContainer: {
        flex: 1,


      },
      resultItem: {
        flex : 1,
        borderWidth: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginVertical: 5,
        flexWrap:'wrap',
        width: Dimensions.get('window').width * 0.9, // 80% of screen's width
        height: Dimensions.get('window').height * 0.2 // 20% of screen's height
      },
      resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
      },
      resultValue: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
      },
      close: {
        position: 'absolute',
        top: 25,
        right: 20,
      },
});

