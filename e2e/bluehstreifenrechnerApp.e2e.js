
const { device, element, by } = require('detox');

describe('BluehstreifenrechnerApp', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should calculate bee meadow correctly', async () => {
    // Assuming the app is already launched and the main screen is visible

    // Enter Aussaatfläche
    await element(by.id('aussaatFlächeInput')).typeText('100'); // Replace 'aussaatFlächeInput' with the actual testID of the Aussaatfläche input field

    // Select a Pflanzenart
    await element(by.id('pflanzenartPicker')).tap(); // Replace 'pflanzenartPicker' with the actual testID of the Pflanzenart picker
    await element(by.text('Buchweizen')).tap(); // Replace 'Buchweizen' with the desired Pflanzenart

    // Enter CO2-Emissionen
    await element(by.id('co2Input')).typeText('500'); // Replace 'co2Input' with the actual testID of the CO2-Emissionen input field

    // Tap on 'Berechnen'
    await element(by.text('Berechnen')).tap(); // Replace 'Berechnen' with the text on the button that triggers the Berechnen function

    // Assert the results
    await expect(element(by.id('ergebnisLabel'))).toHaveText('Expected Result'); // Replace 'Expected Result' with the expected result after the calculation

    // Add more assertions for other elements that should be present in the Ergebnis screen
    // Example:
    // await expect(element(by.id('gesamtAnzahlBienenProQm'))).toHaveText('Expected Bee Count');
    // await expect(element(by.id('nahrungFürBienen'))).toHaveText('Expected Bee Food');
  });
});
