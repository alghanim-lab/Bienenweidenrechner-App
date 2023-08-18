import { Modal,Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, View, FlatList, SafeAreaView ,ScrollView,Dimensions} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
// import GemeinsamDaten from "./GemeinsamDaten";





export default function MultipleViewMap(props) {

    const setIsFlag= props.setIsFlag;
    let isFlag =props.isFlag;  
    const testID=props.testID;
    let visible =props.visible;
    let ergebnis = props.ergebnis;
    const onCancel = props.onCancel;
    const gemeinsameDaten = props.gemeinsameDaten;
    const setErgebnisNull = props.setErgebnisNull; 

  

    let currentIndex = 0;
    // let maxIndex = 0;
    const [ergebnisDargestellt,setErgebnisDargestellt]= useState(false);
    const [aktiveModalIndex, setAktiveModalIndex] = useState (0)
    const [zeigeModalErgebnis,setZeigeModalErgebnis] = useState(false);


  //  let aktiveModalIndex = 0 
  
    // nextModal = () => {
      
    //   const maxIndex = props.ergebnis.length - 1
    //   const currentIndex = aktiveModalIndex
    //   const isLastModal = currentIndex === maxIndex
    //   const newIndex = isLastModal?  -1: currentIndex +1
    //   setAktiveModalIndex (newIndex)
    //   if (aktiveModalIndex === maxIndex) {
    //     console.log('activeModalIndex === maxIndex')
    //   //  {onCancel}
    
    //   }

    
    // }

    resetObjects = () => {
     setErgebnisDargestellt(true);
     {onCancel};
      // console.log('ergebnisDar reset: ' + ergebnisDargestellt);
      ergebnis = [];
      setErgebnisNull();
      setAktiveModalIndex (0);
      // getGesamtDateninModal();
      // <GemeinsamDaten gemeinsameDaten={gemeinsameDaten} testID={testID}/>

    }

    nextModalMap = () =>{
      // const maxIndex = props.ergebnis.length - 1
      // console.log('maxIndex: ' +maxIndex )
      // const currentIndex = aktiveModalIndex
      // console.log('currentIndex: ' +currentIndex )

      // const isLastModal = currentIndex === maxIndex

        if (ergebnis.length> 0 ) {

          if (currentIndex < ergebnis.length -1)
                { 
                  console.log('iF statement: '+ currentIndex +' '+ aktiveModalIndex+ ' ' + ergebnis.length)
                  setAktiveModalIndex(aktiveModalIndex +1) // aktiveModalIndex wird mit setAktiveModalIndex() nicht sofort wirkend sondern
                                                           // nach durchführung des Map  
                    
                } 
        else {

            resetObjects ()

        }
      

    }
  }


  const getGesamtDateninModal = () => {
      
        if (ergebnisDargestellt)
          {
             console.log('1 ergebnisDargestellt :' + ergebnisDargestellt)

            let visibleErgebnis = true

            // setErgebnisDargestellt(false)

                return (
                  console.log('modal modal'),
                  console.log(visibleErgebnis),

                  <Modal
                  visible= {visibleErgebnis}
                  animationType='fade'
                  onRequestClose={onCancel} // required on Android
                  >
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
                        onPress={()=> {
                          onCancel,
                          ergebnisDargestellt = false,
                          visibleErgebnis=false}}> 
                        <MaterialIcons name="close" size={Dimensions.get("window").width * 0.1} color="#228b22" />
                </Pressable> 

                  </Modal>)
              
        }
         return console.log('2 ergebnisDargestellt: ' + ergebnisDargestellt)
      }

    
return ( 
  console.log('ergebnisDar return: ' + ergebnisDargestellt),
  ergebnisDargestellt === true ? 
  <GemeinsamDaten gemeinsameDaten = {gemeinsameDaten} ergebnis={ergebnis} setIsFlag={setIsFlag} ergebnisDargestellt={ergebnisDargestellt} isErgebnis= {()=> setErgebnisDargestellt()} /> : 
  (console.log('return statement: '+  currentIndex +' '+ aktiveModalIndex+ ' ' + ergebnis.length + ' ' + isFlag),
  ergebnis.map((ergebnis, i)=> ( aktiveModalIndex === i && isFlag ) ?  (
    // console.log('Map statement: '+  currentIndex +' '+ aktiveModalIndex+ ' ' + ergebnis.length),
  
    console.log(aktiveModalIndex +' '+ i + ' ' + isFlag + ' ' +ergebnisDargestellt ),
   
    currentIndex = i,
  
  <View key= {aktiveModalIndex}>
  
  <Modal
  visible= {visible}
  animationType='fade'
  onRequestClose={onCancel} // required on Android
  >
  
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.KeyboardAvoidingView} >  
  
   <View style={styles.modalContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View testID={testID} style={styles.resultContainer}>
  
  
  
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
   
      </ScrollView>
       
    </View> 
  
       </KeyboardAvoidingView>
  
   
       <Pressable
                style= {styles.close}
                onPress={()=> {
                  onCancel;
                  resetObjects();
                  }}> 
                <MaterialIcons name="close" size={Dimensions.get("window").width * 0.1} color="#228b22" />
        </Pressable> 
        <Pressable
                style= {styles.next}
                onPress={ ()=> {nextModalMap();} }> 
                <MaterialIcons name="arrow-forward-ios" size={Dimensions.get("window").width * 0.1} color="#228b22" />
        </Pressable>  
  </Modal> 
  
  </View>
  
  ) : null)
  
  )
  


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
