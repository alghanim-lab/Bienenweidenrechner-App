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
    await element(by.id('aussaatFlächeInput')).typeText('100');

    // Select a Pflanzenart
    await waitFor(element(by.id('pflanzenartPicker')))                                                                                                               
    .toBeVisible()                                                                                                                                        
    .withTimeout(10000); 
    await element(by.id('pflanzenartPicker')).setColumnToValue(0, 'Buchweizen');    

    // await waitFor (element(by.text('Buchweizen'))).tap();
    // console.log("test")
    // await device.pauseTest();



    
    // await element(by.id('pflanzenartPicker')).setColumnToValue(1, "Buchweizen");
    // await element(by.text('Buchweizen')).tap();

    // Enter CO2-Emissionen
    await element(by.id('co2Input')).typeText('500');

    // Tap on 'Berechnen'
    await element(by.id('berechnenButton')).tap();

    // Assert the results
    // await expect(element(by.id('ergebnisLabel'))).toHaveText('Expected Result');
  });
});



