//1.) impot- Anweisungen
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import BluehstreifenrechnerApp from './componenten/BluehstreifenrechnerApp';


//2) usere UI-Komponente deklariren
export default function App() {

  // const useStateArray = useState(0)
  // console.log('useStatieArray-->', useStateArray)
  

  return (
    //JSX javascript und xml
    <View style={styles.container}>
      {/* <Text style = {style1}>Hallo</Text> */}
    <BluehstreifenrechnerApp/> 
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
