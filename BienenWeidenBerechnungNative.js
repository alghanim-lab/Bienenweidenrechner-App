import React, { useState } from 'react';
import { View, Text, TextInput, Button ,ScrollView, KeyboardAvoidingView } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const BienenweidenBerechnung = () => {
  const [aussaatFläche, setAussaatFläche] = useState('0');
  const [ausgewähltePflanzenart, setAusgewähltePflanzenart] = useState('');
  const [co2InDerStadt, setCo2InDerStadt] = useState('0');
  const [ergebnis, setErgebnis] = useState(null);

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

<ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Blühstreifenrechner App</Text>
          <View style={{ marginBottom: 20 }}>
            <Text>Aussaatfläche der Bienenweide (in Quadratmetern):</Text>
            <TextInput
              keyboardType="numeric"
              value={aussaatFläche}
              onChangeText={(value) => setAussaatFläche(value)}
              required
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text>Gewünschte Pflanzenart:</Text>
            <Picker
              selectedValue={ausgewähltePflanzenart}
              onValueChange={(value) => setAusgewähltePflanzenart(value)}
              required
            >
              <Picker.Item label="Bitte wählen" value="" />
              {pflanzenarten.map((pflanze, index) => (
                <Picker.Item key={index} label={pflanze.name} value={pflanze.name} />
              ))}
            </Picker>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text>CO2-Emissionen in Millionen Tonnen Ihrer Stadt:</Text>
            <TextInput
              keyboardType="numeric"
              value={co2InDerStadt}
              onChangeText={(value) => setCo2InDerStadt(value)}
              required
            />
          </View>

          <Button title="Berechnen" onPress={handleSubmit} />

          {ergebnis && (
            <View style={{ marginTop: 20 }}>
              <Text>Ergebnis:</Text>
              <Text>Benötigte Saatgutmenge (Gramm): {ergebnis.benötigteMenge}</Text>
              <Text>Aussatzeitpunkt: {ergebnis.saatzeitpunkt}</Text>
              <Text>Fläche bietet Nahrung für Bienen pro Tag: {ergebnis.gesamtAnzahlBienenProQm}</Text>
              <Text>Vegetationszeit: {ergebnis.bluetezeit}</Text>
              <Text>Gesamter Zeitraum (Monate): {ergebnis.gesamterZeitraum}</Text>
              <Text>Nahrung für Bienen über die Vegetationszeit: {ergebnis.nahrungFürBienen}</Text>
              <Text>CO2-Bindung (in KG): {ergebnis.co2Bindung}</Text>
              <Text>Positiver Beitrag (CO2 übrig in Millionen Tonnen): {ergebnis.positiverBeitrag}</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
   
  );
};

export default BienenweidenBerechnung;
