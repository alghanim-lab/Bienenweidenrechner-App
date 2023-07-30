const { device, element, by, expect } = require('detox');

describe('BluehstreifenrechnerApp', () => {

    beforeAll(async () => {
        await device.launchApp();
      });
    
      beforeEach(async () => {
        await device.reloadReactNative();
      });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should calculate bee meadow correctly', async () => {
    // Enter Aussaatfläche
    await element(by.id('aussaatFlächeInput')).typeText('100');

    // Select a Pflanzenart
    await element(by.id('pflanzenartPicker')).tap();
    await element(by.text('Buchweizen')).tap();

    // Enter CO2-Emissionen
    await element(by.id('co2Input')).typeText('500');

    // Tap on 'Berechnen'
    await element(by.id('berechnenButton')).tap();

    // Assert the results
    await expect(element(by.id('ergebnisLabel'))).toHaveText('Expected Result');
  });
});
