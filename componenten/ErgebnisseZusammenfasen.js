
export default  ErgeebnisseZusammenfassen = (state) => {
    if (state.ergebnis.length > 0) {
      let bienenernaehrungProQm = 0;
      let gesamtnahrungBienen = 0;
      let co2Bindung = 0;
      let positiverCo2Beitrag = 0;
      for (let i = 0; i < state.ergebnis.length; i++) {
        bienenernaehrungProQm =
          parseInt(state.ergebnis[i].gesamtAnzahlBienenProQm) +
          bienenernaehrungProQm;
        gesamtnahrungBienen =
          parseFloat(state.ergebnis[i].nahrungFürBienen) + gesamtnahrungBienen;
        co2Bindung = parseFloat(state.ergebnis[i].co2Bindung, 5) + co2Bindung;
        positiverCo2Beitrag =
          parseFloat(state.co2InDerStadt) - co2Bindung / 1000000000; // umrechnen in Millionen Tonnen
      }
      return {
        bienenernaehrungProQm: bienenernaehrungProQm,
        gesamtnahrungBienen: gesamtnahrungBienen,
        co2Bindung: co2Bindung,
        positiverCo2Beitrag: positiverCo2Beitrag,
      };
    }
  };