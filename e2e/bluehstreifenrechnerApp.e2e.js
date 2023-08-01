const { device, element, by, expect,waitFor } = require('detox');

describe('BluehstreifenrechnerApp', () => {

    beforeAll(async () => {
        await device.launchApp();
      });
    
      beforeEach(async () => {
        await device.reloadReactNative();
      });


  it('should calculate bee meadow correctly', async () => {
    // Enter Aussaatfläche
    await element(by.id('aussaatFlächeInput')).typeText('0');

    // Select a Pflanzenart
    await waitFor(element(by.id('pflanzenartPicker')))                                                                                                               
    .toBeVisible()                                                                                                                                        
    .withTimeout(10000); 
    await element(by.id('pflanzenartPicker')).setColumnToValue(0, 'Buchweizen');    

    // Enter CO2-Emissionen
    await element(by.id('co2Input')).typeText('0');

    // Tap on 'Berechnen'
    await element(by.id('berechnenButton')).tap();


  });


  it('shows "ergebnis" after tapping "Berechnen"', async () => {

    expect(element(by.id('berechnenButton'))).toBeVisible(); // the view is visible

    expect(element(by.id('berechnenButton.saatMenge'))).toHaveText('Benötigte Saatgutmenge:'); 
    expect(element(by.id('berechnenButton.saatMengeValue'))).toHaveText('0');

    expect(element(by.id('berechnenButton.aussatzeitpunkt'))).toHaveText('Aussaatzeitpunkt:'); 
    expect(element(by.id('berechnenButton.aussatzeitpunktValue'))).toHaveText('Ab mitte Mai');
    
    expect(element(by.id('berechnenButton.flaeche'))).toHaveText('Fläche bietet Nahrung für Bienen pro Tag:'); 
    expect(element(by.id('berechnenButton.flaecheValue'))).toHaveText('0'); 

    expect(element(by.id('berechnenButton.vegetationszeit'))).toHaveText('Vegetationszeit:'); 
    expect(element(by.id('berechnenButton.aussatzeitpunktValue'))).toHaveText('Mitte Juni bis Ende Septemper'); 

    expect(element(by.id('berechnenButton.gesamterZeitraum'))).toHaveText('Gesamter Zeitraum (Monate):'); 
    expect(element(by.id('berechnenButton.gesamterZeitraumValue'))).toHaveText('2.5'); 

    expect(element(by.id('berechnenButton.nahrungfuerBienen'))).toHaveText('Nahrung für Bienen über die Vegetationszeit:'); 
    expect(element(by.id('berechnenButton.nahrungfuerBienenValue'))).toHaveText('0'); 

    expect(element(by.id('berechnenButton.co2Bindung'))).toHaveText('CO2-Bindung (in KG):'); 
    expect(element(by.id('berechnenButton.co2BindungValue'))).toHaveText('0'); 

    expect(element(by.id('berechnenButton.positiverBeitrag'))).toHaveText('Positiver Beitrag (CO2 übrig in Millionen Tonnen):'); 
    expect(element(by.id('berechnenButton.positiverBeitragValue'))).toHaveText('0'); 

  });

  it('show alert after tapping delete ', async () => {
    element(by.label("Abbrechen")).atIndex(0).tap();
    element(by.label("Bestätigen")).atIndex(1).tap();

  });


  it('show NeuePflanzenArt View after tapping add pflanze ', async () => {
    await element(by.id('neuePlanzenart')).tap();
    expect(element(by.id('neuePlanzenart'))).toBeVisible(); // the view is visible

    expect(element(by.id('neuePlanzenart.pflanzenartname'))).toHaveText('Planzenartname'); 


  });

});



