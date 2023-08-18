import React, { useState, useEffect, useRef } from 'react';
import { Alert, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Dimensions, StyleSheet, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
// import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NeuePflanzenart from './NeuePflanzenart';
import ViewModal from './ViewModal';
import MultipleViewMap from './MultipleViewMap';





const data = [
  { name: 'Buchweizen', saatgutProQuadratmeter: 7, saatzeitpunkt: 'Ab mitte Mai', bluetezeit: 'Mitte Juni bis Ende Septemper', vegetationszeit: 75 },
  { name: 'Sonnenblume', saatgutProQuadratmeter: 2.5, saatzeitpunkt: 'Ab April (im Beet) | Ab mitte Mai (in Töpfen)', bluetezeit: 'Juni bis Mitte Septemper', vegetationszeit: 105 },
  { name: 'Kornblume', saatgutProQuadratmeter: 1.5, saatzeitpunkt: 'Maerz bis Abril', bluetezeit: 'Ende Juni bis Ende Oktober', vegetationszeit: 120 },
  { name: 'Raps', saatgutProQuadratmeter: 1.25, saatzeitpunkt: 'Mitte August bis Anfang Septemper', bluetezeit: 'Anfang Mai bis Ende Septemper', vegetationszeit: 150 },
  { name: 'Gelbsenf', saatgutProQuadratmeter: 2, saatzeitpunkt: 'Ab April', bluetezeit: 'Anfang Juni bis Mitte Oktober', vegetationszeit: 135 },
  { name: 'Bienenweide - Phacelia', saatgutProQuadratmeter: 1.3, saatzeitpunkt: 'Ab Mitte April im Hauptfruchtanbau und bis Mitte September im Zwischenfruchtanbau', bluetezeit: 'Anfang Mai bis Ende Oktober', vegetationszeit: 180 },
  { name: 'Klatschmohn', saatgutProQuadratmeter: 0.5, saatzeitpunkt: 'Maers bis April', bluetezeit: 'Anfang Mai bis Ende Juli', vegetationszeit: 60 },
  { name: 'Cephalaria transsylvanica', saatgutProQuadratmeter: 3, saatzeitpunkt: 'Mitte November', bluetezeit: 'Juni bis August', vegetationszeit: 60 }
];

const BluehstreifenrechnerApp = () => {

  const width = Dimensions.get('window').width;

  const [aussaatFläche, setAussaatFläche] = useState('0');
  const [ausgewähltePflanzenart, setAusgewähltePflanzenart] = useState(null);
  const [co2InDerStadt, setCo2InDerStadt] = useState('0');
  // const [ergebnis, setErgebnis] = useState(null);
  const [ergebnis, setErgebnis] = useState([]);

  const [zeigeNeueDialog, setZeigeNeueDialog] = useState(false);

  const [zeigeView, setZeigeView] = useState(false);

  const [pflanzenarten, setPfalnzenarten] = useState([]);

  const [index, setIndex] = useState(index)

  
  const [gemeinsameDaten,setGemensameDaten] = useState({});

  const [isFlag,setIsFlag] = useState(false)  // zur Kontrolle der Map methode benötigt 

const setErgebnisNull = ()=> {
  setErgebnis([])  // setze die Ergebnise Liste auf Null , wenn der User in Laufzeit der App erneut eine neue Liste aussuchen möchte
}

  // Pflanzenarten beim Start der App Laden
  useEffect(() => {
    loadPflanzenarten();
  }, []) // []---> einmalige Ausführeung 

  

  function checkAusgewaehlterPfalnzenart (ausgewähltePflanzenart) {

    // Beim ersten Laden der App muss ein Value für Detox Test gesetzt werden
    if (ausgewähltePflanzenart== null) {
      setAusgewähltePflanzenart ('Buchweizen')
      return
      
    }
    else { 
      
      return ausgewähltePflanzenart;
    }
  }

  function neuePlanzenartHinzufuegen(pflanze, saatgutqm, zeitpunkt, bluetZeit, vegatationZeit) {


    setZeigeNeueDialog(false) // als nächstes muss der Dialog geschlosswn werden 
    // neue Pflanzenart den bisherigen hinzufügen
    const neuePflanzen = [
      ...pflanzenarten,  //...-> spread-Operator
      { name: pflanze, saatgutProQuadratmeter: saatgutqm, saatzeitpunkt: zeitpunkt, bluetezeit: bluetZeit, vegetationszeit: vegatationZeit },
    ];
    setPfalnzenarten(neuePflanzen);
    speicherePflanzenarten(neuePflanzen);
    // speicherePflanzenarten(name,saatgutProQuadratmeter,saatzeitpunkt,bluetezeit,vegetationzeit, neuePflanzen); 

  }

  function entfernePflanzeVonListe() {

    const updateList = pflanzenarten.filter((pflanze) => pflanze.name !== ausgewähltePflanzenart);
    setPfalnzenarten(updateList);
    speicherePflanzenarten(updateList);
    ;

  }

  function alertDeletePflanzenart() {
    Alert.alert(
      'Pflanze löschen',
      'soll die Pflanzenart wirkloch gelöscht werden?',
      [{ text: 'Abbrechen', style: 'cancel' },
      { text: 'Bestätigen', style: 'destructive', onPress: entfernePflanzeVonListe }
      ]
    );
  }

  function speicherePflanzenarten(neueListe) {
    //speicherun der Pflanzenarten in AsyncStorage
    AsyncStorage.setItem('pflanzenarten', JSON.stringify(neueListe))


  }

  async function loadPflanzenarten() {

    

    let pflanzenartenFromDB = await AsyncStorage.getItem('pflanzenarten');
    
    if (pflanzenartenFromDB !== null && pflanzenartenFromDB!=='[]' ) {

      // console.log('Pflanzen form Db ' + pflanzenartenFromDB.length);

      // die String wieder in Array Form umwandeln
      pflanzenartenFromDB = JSON.parse(pflanzenartenFromDB)
      // console.log('Pflanzen form Db ' + pflanzenartenFromDB.length);

      // TODO: Planzenarten im State ablegen 
      setPfalnzenarten(pflanzenartenFromDB)

    }
    else {
      
       setPfalnzenarten(data);
       speicherePflanzenarten(data);
    }
  }


  const berechneBienenweide = () => {
    const ausgewähltePflanze = pflanzenarten.find(
      (pflanze) => pflanze.name === ausgewähltePflanzenart
    );

    if (ausgewähltePflanze) {
      const pflanzeName = ausgewähltePflanze.name;
      const benötigteMenge = parseFloat(aussaatFläche) * ausgewähltePflanze.saatgutProQuadratmeter;
      const bienenernaehrungProQm = (parseFloat(aussaatFläche) * 32.62).toFixed(); // Bienen pro Quadratmeter
      const vegetationszeitInMonaten = ausgewähltePflanze.vegetationszeit / 30; // Umwandlung der Vegetationszeit in Monate
      const co2Bindung = (parseFloat(aussaatFläche) / 10000 * 0.48 * 1000).toFixed(3); // Co2 pro hektar umrechenen * Megagramm in Kg umrechnen
      const gesamterZeitraum = vegetationszeitInMonaten.toFixed(1);
      const gesamtnahrungBienen = (bienenernaehrungProQm * parseFloat(aussaatFläche) * ausgewähltePflanze.vegetationszeit).toFixed();
      const saatzeitpunkt = ausgewähltePflanze.saatzeitpunkt;
      const bluetezeit = ausgewähltePflanze.bluetezeit;
      const positiverCo2Beitrag = parseFloat(co2InDerStadt) - (co2Bindung / 1000000000); // umrechnen in Millionen Tonnen 
      
      return { pflanzeName,benötigteMenge, gesamtAnzahlBienenProQm: bienenernaehrungProQm, gesamterZeitraum, nahrungFürBienen: gesamtnahrungBienen, co2Bindung, saatzeitpunkt, bluetezeit, positiverBeitrag: positiverCo2Beitrag };
    }

    return {
  
      pflanzeName:'', 
      benötigteMenge: 0,
      gesamtAnzahlBienenProQm: 0,
      gesamterZeitraum: 0,
      nahrungFürBienen: 0,
      co2Bindung: 0,
      saatzeitpunkt: '',
      bluetezeit: '',
      positiverBeitrag: ''
    };
  };

  const handleSubmit = () => {
    const ergebnisValue = berechneBienenweide();
    // setErgebnis(ergebnis)
      const aktulisierteErgebnisse = [...ergebnis,ergebnisValue]; 
     
      setErgebnis(aktulisierteErgebnisse);

      
  
    

  };

  const ergeebnisseZusammenfassen = (ergebnisse) => {

    if (ergebnis.length> 0) {
      let bienenernaehrungProQm=0;
      let gesamtnahrungBienen = 0;
      let co2Bindung = 0;
      let positiverCo2Beitrag = 0;
      for (let i=0; i< ergebnis.length ; i++) {
        
        bienenernaehrungProQm = parseInt(ergebnis[i].gesamtAnzahlBienenProQm ) + bienenernaehrungProQm
        gesamtnahrungBienen = parseFloat(ergebnis[i].nahrungFürBienen) + gesamtnahrungBienen;
        co2Bindung = parseFloat(ergebnis[i].co2Bindung,5) + co2Bindung;
        positiverCo2Beitrag = parseFloat(co2InDerStadt) - (co2Bindung / 1000000000); // umrechnen in Millionen Tonnen 
        
      }
        setGemensameDaten({'bienenernaehrungProQm':bienenernaehrungProQm,'gesamtnahrungBienen':gesamtnahrungBienen,'co2Bindung':co2Bindung,'positiverCo2Beitrag':positiverCo2Beitrag})
        console.log(gemeinsameDaten);
    }
  };

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  
  const AnimatedSpeichern = <Animated.View
    style={[{
    opacity: fadeAnim,
    // position: 'absolute', //absolute //relativ
    top: 0,
    // padding: 10,
    borderRadius: 10,
    borderColor: `#483d8b`, //darkslateblue
    backgroundColor: `#228b22`, //darkslateblue

    }]}
  >
    <Text style={styles.speichernText}>Speichern</Text>

  </Animated.View>
  
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
          <View style={[styles.field, { flexDirection: "row", flex: 0.2 }]}>
            <View>
              <Pressable
                testID='neuePlanzenart'
                style={styles.addIcon}
                onPress={() => setZeigeNeueDialog(true)}
              >
                <MaterialIcons
                  name="add-circle"
                  size={Dimensions.get("window").width * 0.1}
                  color="#228b22"
                />
              </Pressable>
              <NeuePflanzenart
                testID='neuePlanzenart'
                visible={zeigeNeueDialog}
                onCancel={() => setZeigeNeueDialog(false)}
                onSave={neuePlanzenartHinzufuegen}
              />
            </View>

              <View>
                <Pressable
                  testID='deleteButton'
                  style={styles.deleteIcon}
                  onPress={() => alertDeletePflanzenart()}
                >
                  <MaterialIcons
                    name="delete"
                    size={Dimensions.get("window").width * 0.1}
                    color="#228b22"
                  />
                </Pressable>
              </View>
            </View>

          <View style={[styles.field, { flex: 0.5 }]}>
            <Text style={styles.label}>Aussaatfläche (in Quadratmetern):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={aussaatFläche}
              onChangeText={(value) => setAussaatFläche(value)}
              required
              testID="aussaatFlächeInput" // TestID für das Aussaatfläche TextInput-Feld
            />
          </View>

          <View style={[styles.field]}>
            <Text style={[styles.label, { flex: 0.3 }]}>
              Gewünschte Pflanzenart:
            </Text>
            <Picker
              testID= "pflanzenartPicker" // TestID für den Pflanzenart-Picker
              style={[
                styles.picker,
                { flex: 2 },
                width > "700"
                  ? { transform: [{ scaleX: 2 }, { scaleY: 2 }], top: 180 }
                  : { transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] },
              ]}
              selectedValue= { checkAusgewaehlterPfalnzenart(ausgewähltePflanzenart)}
              onValueChange={(value, index) => {
                setAusgewähltePflanzenart(value);
                setIndex(index); // der Index wird benötigt um den entsprechenden Element beim Entfernen Funktion zu erhalten
              }}
              required
            >
              <Picker.Item label="Bitte wählen" value=""  />
              {pflanzenarten.map((pflanze, index) => (
                <Picker.Item
                  key={index}
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
              value={co2InDerStadt}
              onChangeText={(value) => setCo2InDerStadt(value)}
              required
              testID="co2Input" // TestID für das CO2-Emissionen TextInput-Feld

            />
          </View>

          <View style={styles.buttonContainer}>

                
              <Pressable 
                  onPress={()=>{
                    setIsFlag(false);
                    handleSubmit()
                  }}
                  onPressIn={fadeIn}
                  onPressOut={fadeOut}
                  style={styles.speichern}            
                >
                {AnimatedSpeichern}

              </Pressable>

              <Pressable
                 onPress={() => {
                  setZeigeView(true);
                  ergeebnisseZusammenfassen(ergebnis);
                  setIsFlag(true);
                }} 
                // onPress={() => {
                //   setZeigeView(true);
                //   handleSubmit();
                // }} 
                style={styles.berechnen}
                testID="berechnenButton" // TestID für den 'Berechnen'-Buttond
              
              >
                <ViewModal
                testID = "berechnenButton"
                  visible={zeigeView}
                  onCancel={() => setZeigeView(false)}
                  // ergebnis = {ergebnis}
                  ergebnis={ergebnis !== null ? ergebnis : ""} 
                  gemeinsameDaten={gemeinsameDaten !== null ? gemeinsameDaten : ""}
                  setErgebnisNull= {()=>setErgebnisNull()} 
                  // setErgebnisNull= {setErgebnisNull} // benötigt zum component MultipleViewMap
                  // isFlag= {isFlag} // benötigt zum component MultipleViewMap
                  // setIsFlag = {()=>setIsFlag()} // benötigt zum component MultipleViewMap
                />
                {/* <GemeinsamDaten
                isFlag= {isFlag}
                setIsFlag = {()=>setIsFlag()}
                /> */}
             
                <Text style={styles.berechnenText}>Berechnen</Text>
              </Pressable>
         
            {/* <Text style={styles.ergebnisLabel} testID="ergebnisLabel">Ergebnis: {ergebnis ? ergebnis.benötigteMenge : ''}</Text> */}

            {/* <Button title="Berechnen" onPress={handleSubmit} 
           /> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default BluehstreifenrechnerApp;
