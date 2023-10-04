//1.) impot- Anweisungen
import React from 'react';
import { View } from 'react-native';
import BluehstreifenrechnerApp from "./componenten/BluehstreifenrechnerApp";
import { StateProvider } from './componenten/StateProvider';
import NeuePflanzenartenHinzufuegen from './componenten/NeuePflanzenartenHinzufuegen';
import NeuePflanzenart from './componenten/NeuePflanzenart';
import ViewModal from './componenten/ViewModal';



//2) usere UI-Komponente deklariren
export default function App() {



  return (

    //JSX javascript und xml
    <View style={styles.container}>
      <StateProvider>
      <BluehstreifenrechnerApp>
        <NeuePflanzenart>
          <NeuePflanzenartenHinzufuegen/>
        </NeuePflanzenart>
        <ViewModal/>
      </BluehstreifenrechnerApp>
      </StateProvider>
    </View>
  );
}

//benötigte Styles definieren --> Aussehen und Layout
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

const style1= {fontSize:50, fontStyle :'italic'};
