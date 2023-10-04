export default  BerechneBienenweide = (state) => {
    const ausgewähltePflanze = state.pflanzenarten.find(
      (pflanze) => pflanze.name === state.ausgewähltePflanzenart
    );

    if (ausgewähltePflanze) {
      const pflanzeName = ausgewähltePflanze.name;
      const benötigteMenge =
        parseFloat(state.aussaatFläche) *
        ausgewähltePflanze.saatgutProQuadratmeter;
      const bienenernaehrungProQm = (
        parseFloat(state.aussaatFläche) * 32.62
      ).toFixed(); // Bienen pro Quadratmeter
      const vegetationszeitInMonaten = ausgewähltePflanze.vegetationszeit / 30; // Umwandlung der Vegetationszeit in Monate
      const co2Bindung = (
        (parseFloat(state.aussaatFläche) / 10000) *
        0.48 *
        1000
      ).toFixed(3); // Co2 pro hektar umrechenen * Megagramm in Kg umrechnen
      const gesamterZeitraum = vegetationszeitInMonaten.toFixed(1);
      const gesamtnahrungBienen = (
        bienenernaehrungProQm *
        parseFloat(state.aussaatFläche) *
        ausgewähltePflanze.vegetationszeit
      ).toFixed();
      const saatzeitpunkt = ausgewähltePflanze.saatzeitpunkt;
      const bluetezeit = ausgewähltePflanze.bluetezeit;
      const positiverCo2Beitrag =
        parseFloat(state.co2InDerStadt) - co2Bindung / 1000000000; // umrechnen in Millionen Tonnen

      return {
        pflanzeName,
        benötigteMenge,
        gesamtAnzahlBienenProQm: bienenernaehrungProQm,
        gesamterZeitraum,
        nahrungFürBienen: gesamtnahrungBienen,
        co2Bindung,
        saatzeitpunkt,
        bluetezeit,
        positiverBeitrag: positiverCo2Beitrag,
      };
    }

    return {
      pflanzeName: "",
      benötigteMenge: 0,
      gesamtAnzahlBienenProQm: 0,
      gesamterZeitraum: 0,
      nahrungFürBienen: 0,
      co2Bindung: 0,
      saatzeitpunkt: "",
      bluetezeit: "",
      positiverBeitrag: "",
    };
  };