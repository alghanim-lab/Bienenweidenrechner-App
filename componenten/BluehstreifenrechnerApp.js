import React, { useState } from 'react';
import { View, Text, TextInput, Button,Pressable ,ScrollView, KeyboardAvoidingView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons'; 
import NeuePflanzenart from './NeuePflanzenart';


const BluehstreifenrechnerApp = () => {
  const [aussaatFläche, setAussaatFläche] = useState('0');
  const [ausgewähltePflanzenart, setAusgewähltePflanzenart] = useState('');
  const [co2InDerStadt, setCo2InDerStadt] = useState('0');
  const [ergebnis, setErgebnis] = useState(null);
  const [zeigeNeueDialog, setZeigeNeueDialog] = useState(false);
  

  const pflanzenarten = [
    { name: 'Buchweizen', saatgutProQuadratmeter: 7, saatzeitpunkt: 'Ab mitte Mai', bluetezeit: 'Mitte Juni bis Ende Septemper', vegetationszeit: 75 },
    { name: 'Sonnenblume', saatgutProQuadratmeter: 2.5, saatzeitpunkt: 'Ab April (im Beet) | Ab mitte Mai (in Töpfen)', bluetezeit: 'Juni bis Mitte Septemper', vegetationszeit: 105 },
    { name: 'Kornblume', saatgutProQuadratmeter: 1.5, saatzeitpunkt: 'Maerz bis Abril', bluetezeit: 'Ende Juni bis Ende Oktober', vegetationszeit: 120 },
    { name: 'Raps', saatgutProQuadratmeter: 1.25, saatzeitpunkt: 'Mitte August bis Anfang Septemper', bluetezeit: 'Anfang Mai bis Ende Septemper', vegetationszeit: 150 },
    { name: 'Gelbsenf', saatgutProQuadratmeter: 2, saatzeitpunkt: 'Ab April', bluetezeit: 'Anfang Juni bis Mitte Oktober', vegetationszeit: 135 },
    { name: 'Bienenweide - Phacelia', saatgutProQuadratmeter: 1.3, saatzeitpunkt: 'Ab Mitte April im Hauptfruchtanbau und bis Mitte September im Zwischenfruchtanbau', bluetezeit: 'Anfang Mai bis Ende Oktober', vegetationszeit: 180 },
    { name: 'Klatschmohn', saatgutProQuadratmeter: 0.5, saatzeitpunkt: 'Maers bis April', bluetezeit: 'Anfang Mai bis Ende Juli', vegetationszeit: 60 },
    { name: 'Cephalaria transsylvanica', saatgutProQuadratmeter: 3, saatzeitpunkt: 'Mitte November', bluetezeit: 'Juni bis August', vegetationszeit: 60 }
  ];
  
  const [neuepflanzenarten, setNeuePflanzenarten] = useState(pflanzenarten);


  function neuePlanzenartHinzufuegen (pflanze, saatgutqm, zeitpunkt, bluetZeit, vegatationZeit) {
   
    // (pflanze, saatgutqm, zeitpunkt, bluetZeit, vegatationZeit) => 
         {
           setZeigeNeueDialog(false) // als nächstes muss der Dialog geschlosswn werden 
            // neue Pflanzenart den bisherigen hinzufügen
            const neuePflanzen = [
            ...pflanzenarten,  //...-> spread-Operator
            {name: pflanze, saatgutProQuadratmeter: saatgutqm, saatzeitpunkt: zeitpunkt, bluetezeit: bluetZeit, vegetationszeit: vegatationZeit},
            ];
                setNeuePflanzenarten (neuePflanzen);
                
       }
  }

  const berechneBienenweide = () => {
    const ausgewähltePflanze = neuepflanzenarten.find(
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
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Text style={styles.title}>Blühstreifenrechner App</Text> */}
        {/* <Text style = {styles.addPflanze}>Pflanze Hinzufügen</Text> */}

   
        

        <View style={styles.form}>
          <View style={styles.field}>
          <Pressable
              style= {styles.addIcon}
              onPress={()=> setZeigeNeueDialog(true)}> 
                <MaterialIcons name="add-circle" size={40} color="#483d8b"/>
              </Pressable>
              <NeuePflanzenart 
              visible={zeigeNeueDialog}
              onCancel={()=>setZeigeNeueDialog(false)}
              onSave = {neuePlanzenartHinzufuegen}/>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Aussaatfläche (in Quadratmetern):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={aussaatFläche}
              onChangeText={(value) => setAussaatFläche(value)}
              required
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Gewünschte Pflanzenart:</Text>
            <Picker
              style={styles.picker}
              selectedValue={ausgewähltePflanzenart}
              onValueChange={(value) => setAusgewähltePflanzenart(value)}
              required
            >
              <Picker.Item label="Bitte wählen" value="" />
              {neuepflanzenarten.map((pflanze, index) => (
                <Picker.Item key={index} label={pflanze.name} value={pflanze.name} />
              ))}
            </Picker>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CO2-Emissionen in Millionen Tonnen:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={co2InDerStadt}
              onChangeText={(value) => setCo2InDerStadt(value)}
              required
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
            onPress={handleSubmit} 
            style = {styles.berechnen}
            >
             <Text style = {styles.berechnenText}>Berechnen</Text>
            </Pressable>
            {/* <Button title="Berechnen" onPress={handleSubmit} 
           /> */}
          </View>
        </View>

        {ergebnis && (
  <View style={styles.resultContainer}>
    <Text style={styles.resultTitle}>Ergebnis:</Text>
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
)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};




export default BluehstreifenrechnerApp;
