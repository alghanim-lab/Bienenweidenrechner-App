import React, { useState, useEffect } from 'react';
import { Alert, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Dimensions, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
// import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NeuePflanzenart from './NeuePflanzenart';
import ViewModal from './ViewModal';





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
  const [ausgewähltePflanzenart, setAusgewähltePflanzenart] = useState('');
  const [co2InDerStadt, setCo2InDerStadt] = useState('0');
  const [ergebnis, setErgebnis] = useState(null);
  const [zeigeNeueDialog, setZeigeNeueDialog] = useState(false);

  const [zeigeView, setZeigeView] = useState(false);

  const [pflanzenarten, setPfalnzenarten] = useState([data]);

  const [index, setIndex] = useState(index)


  // Pflanzenarten beim Start der App Laden
  useEffect(() => {
    loadPflanzenarten();
  }, []) // []---> einmalige Ausführeung 



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

    if (pflanzenartenFromDB !== null) {

      console.log('Pflanzen form Db ' + pflanzenartenFromDB.length);

      // die String wieder in Array Form umwandeln
      pflanzenartenFromDB = JSON.parse(pflanzenartenFromDB)
      console.log('Pflanzen form Db ' + pflanzenartenFromDB.length);

      // TODO: Planzenarten im State ablegen 
      setPfalnzenarten(pflanzenartenFromDB)

    }

  }


  const berechneBienenweide = () => {
    const ausgewähltePflanze = pflanzenarten.find(
      (pflanze) => pflanze.name === ausgewähltePflanzenart
    );

    if (ausgewähltePflanze) {

      const benötigteMenge = parseFloat(aussaatFläche) * ausgewähltePflanze.saatgutProQuadratmeter;
      const gesamtAnzahlBienenProQm = parseFloat(aussaatFläche) * 32.62; // Bienen pro Quadratmeter
      const vegetationszeitInMonaten = ausgewähltePflanze.vegetationszeit / 30; // Umwandlung der Vegetationszeit in Monate
      const co2Bindung = parseFloat(aussaatFläche) / 10000 * 0.48 * 1000; // Co2 pro hektar umrechenen * Megagramm in Kg umrechnen
      const gesamterZeitraum = vegetationszeitInMonaten.toFixed(1);
      const nahrungFürBienen = gesamtAnzahlBienenProQm * parseFloat(aussaatFläche) * ausgewähltePflanze.vegetationszeit;
      const saatzeitpunkt = ausgewähltePflanze.saatzeitpunkt;
      const bluetezeit = ausgewähltePflanze.bluetezeit;
      const positiverBeitrag = parseFloat(co2InDerStadt) - (co2Bindung / 1000000000); // umrechnen in Millionen Tonnen 
      return { benötigteMenge, gesamtAnzahlBienenProQm, gesamterZeitraum, nahrungFürBienen, co2Bindung, saatzeitpunkt, bluetezeit, positiverBeitrag };
    }

    return {
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
    const ergebnis = berechneBienenweide();
    setErgebnis(ergebnis);
  };


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
                style={styles.addIcon}
                onPress={() => setZeigeNeueDialog(true)}
              >
                <MaterialIcons
                  name="add-circle"
                  size={Dimensions.get("window").width * 0.1}
                  color="#483d8b"
                />
              </Pressable>
              <NeuePflanzenart
                visible={zeigeNeueDialog}
                onCancel={() => setZeigeNeueDialog(false)}
                onSave={neuePlanzenartHinzufuegen}
              />
            </View>

              <View>
                <Pressable
                  style={styles.deleteIcon}
                  onPress={() => alertDeletePflanzenart()}
                >
                  <MaterialIcons
                    name="delete"
                    size={Dimensions.get("window").width * 0.1}
                    color="#483d8b"
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
            />
          </View>

          <View style={[styles.field]}>
            <Text style={[styles.label, { flex: 0.3 }]}>
              Gewünschte Pflanzenart:
            </Text>
            <Picker
              style={[
                styles.picker,
                { flex: 2 },
                width > "700"
                  ? { transform: [{ scaleX: 2 }, { scaleY: 2 }], top: 180 }
                  : { transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] },
              ]}
              selectedValue={ausgewähltePflanzenart}
              onValueChange={(value, index) => {
                setAusgewähltePflanzenart(value);
                setIndex(index); // der Index wird benötigt um den entsprechenden Element beim Entfernen Funktion zu erhalten
              }}
              required
            >
              <Picker.Item label="Bitte wählen" value="" />
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
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                setZeigeView(true);
                handleSubmit();
              }} //hadlesubmit
              style={styles.berechnen}
            >
              <ViewModal
                visible={zeigeView}
                onCancel={() => setZeigeView(false)}
                // ergebnis = {ergebnis}
                ergebnis={ergebnis !== null ? ergebnis : ""}
              />
              <Text style={styles.berechnenText}>Berechnen</Text>
            </Pressable>
            {/* <Button title="Berechnen" onPress={handleSubmit} 
           /> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};




export default BluehstreifenrechnerApp;
