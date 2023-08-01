import { useState } from "react";
import { Modal,Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform ,Dimensions} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
export default function NeuePflanzenart (props) {
    const visible =props.visible;
    const onCancel=props.onCancel;
    const onSave = props.onSave;
    const testID= props.testID

    const [pflanzenartName,setPflanzenartName] = useState('')
    const [saatMenge, setSaatMenge] = useState('')
    const [saatZeitpunkt,setSaatZeitpunkt] = useState ('')
    const [bluetzeit, setBluetzeit] = useState('')
    const [vegetationszeit, SetVegetationzeit] = useState('')
    

    function savePflanzenart () {
        const neuePflanzenartName = pflanzenartName.trim();
        const neueSaatMenge = saatMenge.trim ();
        const neueSaatZeitpunkt = saatZeitpunkt.trim ();
        const neueBluetzeit = bluetzeit.trim ();
        const neueVegetationszeit = vegetationszeit.trim ();

        if (neuePflanzenartName.length === 0 || neueSaatMenge.length === 0 || neueSaatZeitpunkt.length === 0 || 
            neueBluetzeit === 0 || neueVegetationszeit === 0) {
                alert ('Alle Felder dürfen nicht leer seine !');
                return;
            }
            onSave (neuePflanzenartName, neueSaatMenge, neueSaatZeitpunkt, neueBluetzeit, neueVegetationszeit)
            setPflanzenartName('');
            setSaatMenge('');
            setSaatZeitpunkt('');
            setBluetzeit('');
            SetVegetationzeit('');

    }


    function cancelEditing () {
        onCancel ();

        // um  bei (Hinzufuegen von daten ++ Abbrechen)  
        //dann erneut (Hinzufugen ++ speichern ) die nicht zu sehenden Daten  verhindern zu speichern
        setPflanzenartName('');
        setSaatMenge(0);
        setSaatZeitpunkt ('');
        setBluetzeit ('');
        SetVegetationzeit (0);
    }

    // if (!visible) return null; mit dem Modal brauchen wir diese Zeile nicht mehr
    return ( 
<Modal 
testID={testID}
visible={visible}
onRequestClose={cancelEditing}
animationType='slide'>

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {styles.container}>
        <TextInput testID={`${testID}.pflanzenartname`} placeholder="Planzenartname"
        onChangeText={(value) => setPflanzenartName(value)} //{setPlanzenartName} ist ausreichend da es sich um einen Text handelt 
         style={styles.input}
         multiline= {true}
         required/>
        <TextInput placeholder="Saatgutmenge pro QM"
        onChangeText={(value) => setSaatMenge(value)}
         style={styles.input} multiline= {true} 
         required/>
        <TextInput placeholder="Saatzeitpunkt"
        onChangeText={(value) => setSaatZeitpunkt(value)}
        style={[styles.input, {height: 80}]} multiline= {true}
        required/>
        <TextInput placeholder="Blütezeit" 
        onChangeText={(value) => setBluetzeit(value)} 
        style={[styles.input, {height: 80}]} multiline= {true}
        required/>
        <TextInput placeholder="Vegetationszeit"
        returnKeyType='done' 
        onChangeText={(value) => SetVegetationzeit(value)}
        onSubmitEditing={savePflanzenart}
        style={styles.input}
        required/>


        <Pressable
            style= {styles.back}
            onPress={cancelEditing}> 
            <MaterialIcons name="keyboard-backspace" size={Dimensions.get("window").width * 0.1} color="#228b22" />
        </Pressable>

        <Pressable 
        onPress={savePflanzenart} 
        style = {styles.speichern}>
            <Text style = {styles.speichernText}> Speichern</Text>
        </Pressable>

    </KeyboardAvoidingView>
</Modal>
        );
}

const styles = StyleSheet.create ({
    container: {
        //inhalte zentrieren
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    input:{
        flex : 0.1,
        top: 10,
        borderWidth: 1,
        borderColor: `#483d8b`, //'#darkslateblue'
        borderRadius: 5,
        width: '80%',
        marginBottom :10,
        padding : 10,
        fontSize: 20,

    },
    speichern: {
        marginBottom : 20,
        position: 'absolute', //absolute //relativ
        top :  Dimensions.get('window').width > "700"
        ?  Dimensions.get('window').width * 1.20
        :  Dimensions.get('window').width * 2 ,        //  borderWidth : 1,
         padding : 10,
        //  marginTop: 10,
         borderRadius: 10,
         borderColor: `#483d8b`, //darkslateblue
         backgroundColor: `#228b22`, //darkslateblue
      },
      speichernText: {
        color: '#FFF',
        fontSize:  Dimensions.get('window').width > "700"
        ?  50
        :  16,
        textAlign: 'center',
      },
      back : {
        position: 'absolute', //absolute //relativ
         top: Dimensions.get('window').width > "700"
         ?  Dimensions.get('window').width *0.05
         :  Dimensions.get('window').width * 0.1 , 
         left: 30,
        //  borderWidth : 1,
         padding : 10,
        //  marginTop: 10,
         borderRadius: 10,
        // borderColor: `#483d8b`, //darkslateblue
         //backgroundColor: `#483d8b`, //darkslateblue
      }
})